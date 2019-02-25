import React, { Component } from 'react';
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class Selector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedClass: 0,
            selectedWeapon: ""
        };
        this.handleClassChange = this.handleClassChange.bind(this);
        this.handleWeaponChange = this.handleWeaponChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <Row className={"selector"}>
                <Col>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group as={Row}>
                            <Form.Label column sm={"3"}>Filter By Class</Form.Label>
                            <Col sm={"9"}>
                                <Form.Control as={"select"} onChange={this.handleClassChange}>
                                    <option value={0}/>
                                    <option value={2}>Assault</option>
                                    <option value={1}>Medic</option>
                                    <option value={3}>Support</option>
                                    <option value={4}>Recon</option>
                                    <option value={8}>Pistols</option>
                                </Form.Control>
                            </Col>

                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Weapon</Form.Label>
                            <Col sm={"9"}>
                                <Form.Control as={"select"} onChange={this.handleWeaponChange}>
                                    {this.getOptions()}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Button type={"submit"} variant={"dark"} size={"sm"}>Add To Comparison</Button>
                    </Form>
                </Col>
            </Row>
        )
    }

    getOptions() {
        const weapons = [<option key={"none"}/>];
        for (let name of this.props.store.weaponNames(this.state.selectedClass)) {
            weapons.push(<option key={name}>{name}</option>);
        }
        return (
            <React.Fragment>
                {weapons}
            </React.Fragment>
        )
    }

    handleClassChange(event) {
        // console.log(event.target.value);
        this.setState({selectedClass: parseInt(event.target.value)});
    }

    handleWeaponChange(event) {
        console.log(event.target.value);
        this.setState({
            selectedWeapon: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.selectorCallback(this.state.selectedWeapon);
    }
}

export default Selector;