import React, {Component} from 'react';
import './App.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Selector from "./components/Selector";
import WeaponStore from "./weapons/WeaponStore";
import WeaponStats from "./components/WeaponStats";
import AppBar from "./components/AppBar";

class App extends Component {

    static STORAGE_KEY_WEAPONS = 'App.SelectedWeapons';

    constructor(props) {
        super(props);
        this.state = {
            store: new WeaponStore([]),
            weapons: []
        };
        this.selectorCallback = this.selectorCallback.bind(this);
    }

    selectorCallback(weapon) {
        if (this.state.store.isWeapon(weapon)) {
            this.setState((state, props) => {
                const weapons = state.weapons.slice();
                weapons.push({
                    name: weapon,
                    identifier: new Date().getTime() + '|' + Math.random(),
                    attachments: []
                });
                return {weapons: weapons}
            });
        } else {
            console.log("invalid weapon name: " + weapon);
        }
    }

    render() {
        return (
            <div className="App h-100">
                <AppBar/>
                <Container className={"the-container"} fluid={false}>
                    <Row>
                        <Col>
                            <Selector store={this.state.store} selectorCallback={this.selectorCallback}/>
                        </Col>
                    </Row>
                    <Row>
                        {this.displayWeapons()}
                    </Row>
                </Container>
            </div>
        );
    }

    static _loadInitialWeapons() {
        const oldWeapons = localStorage.getItem(App.STORAGE_KEY_WEAPONS);
        if (oldWeapons === null) {
            return [];
        } else {
            try {
                return JSON.parse(oldWeapons);
            } catch (err) {
                console.error("Failed to load stored weapons:", err);
                localStorage.setItem(App.STORAGE_KEY_WEAPONS, JSON.stringify([]));
                return [];
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        localStorage.setItem(App.STORAGE_KEY_WEAPONS, JSON.stringify(this.state.weapons));
    }

    componentDidMount() {
        fetch('/bfv_6.json')
            .then(response => response.json())
            .then((data) => {
                // console.log(data);
                let store = new WeaponStore(data);
                this.setState((state, props) => {
                    return {
                        store: store,
                        weapons: App._loadInitialWeapons()
                        // weapons: store.listAllWeapons()
                    };
                });

            }).catch((error) => {
                console.error(error);
        });
    }

    displayWeapons() {
        const weapons = [];

        for (let i = 0; i < this.state.weapons.length; i++) {
            const name = this.state.weapons[i].name;
            const identifier = this.state.weapons[i].identifier;
            let attachments = this.state.weapons[i].attachments;
            if (attachments === undefined) {
                attachments = [];
            }
            weapons.push(<WeaponStats weapon={name}
                                      key={this.state.weapons[i].identifier}
                                      store={this.state.store}
                                      identifier={identifier}
                                      attachments={attachments}
                                      removeCallback = {() => {
                                          this.setState((state, props) => {
                                              const weapons = state.weapons.slice();
                                             weapons.splice(i, 1);
                                             return {weapons: weapons};
                                          });
                                      }}
                                      duplicateCallback = {() => {
                                          this.setState((state, props) => {
                                              const weapons = state.weapons.slice();
                                              weapons.splice(i + 1, 0, {
                                                  name: name,
                                                  identifier: new Date().getTime() + '|' + Math.random(),
                                                  attachments: state.weapons[i].attachments.slice()
                                              });
                                              return {weapons: weapons};
                                          });
                                      }}
                                      removeAttachment = {(attachment) => {
                                          this.setState((state, props) => {
                                              const weapons = state.weapons.slice();
                                              weapons[i] = Object.assign({}, weapons[i]);
                                              weapons[i].attachments = weapons[i].attachments.filter(a => a !== attachment);
                                              return {weapons: weapons};
                                          });
                                      }}
                                      addAttachment = {(attachment) => {
                                        this.setState((state, props) => {
                                            const weapons = state.weapons.slice();
                                            weapons[i] = Object.assign({}, weapons[i]);
                                            weapons[i].attachments = weapons[i].attachments.slice();
                                            weapons[i].attachments.push(attachment);
                                            return {weapons: weapons};
                                        });
                                      }}
                                      clearAttachments = {() => {
                                          this.setState((state, props) => {
                                              const weapons = state.weapons.slice();
                                              weapons[i] = Object.assign({}, weapons[i]);
                                              weapons[i].attachments = [];
                                              return {weapons: weapons};
                                          });

                                      }}
            />);
        }
        return (
            <React.Fragment>
                {weapons}
            </React.Fragment>
        )
    }
}

export default App;
