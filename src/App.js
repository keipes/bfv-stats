import React, {Component} from 'react';
import './App.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Selector from "./components/Selector";
import WeaponStore from "./weapons/WeaponStore";
import WeaponStats from "./components/WeaponStats";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            store: new WeaponStore([]),
            weapons: ["Kar98k", "Gewehr M95/30"]
        };
        this.selectorCallback = this.selectorCallback.bind(this);
    }

    selectorCallback(weapon) {
        if (this.state.store.isWeapon(weapon)) {
            this.setState((state, props) => {
                const weapons = state.weapons.slice();
                weapons.push(weapon);
                return {weapons: weapons}
            });
        } else {
            console.log("invalid weapon name: " + weapon);
        }

    }

    render() {
        // console.log(this.state.weapons);
        return (
            <div className="App">
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

    componentDidMount() {
        fetch('/bfv_6.json')
            .then(response => response.json())
            .then((data) => {
                // console.log(data);
                let store = new WeaponStore(data);
                this.setState((state, props) => {
                    return {
                        store: store,
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
            weapons.push(<WeaponStats weapon={this.state.weapons[i]} key={i} store={this.state.store}/>);
        }
        return (
            <React.Fragment>
                {weapons}
            </React.Fragment>
        )
    }


}

export default App;
