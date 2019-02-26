import React, { Component } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AttachmentStats from "../../weapons/AttachmentStats";

class RecoilStats extends Component {
    render() {
        return (<Row className={"recoilStats"}>
            <Col>
                <Row>
                    <Col sm={2}/>
                    <Col sm={5}>ADS</Col>
                    <Col sm={5}>Hip</Col>
                </Row>
                <Row>
                    <Col sm={2}>Standing</Col>
                    <Col sm={5}>{this.statsForStance(AttachmentStats.STANCE_STAND, true)}</Col>
                    <Col sm={5}>{this.statsForStance(AttachmentStats.STANCE_STAND, false)}</Col>
                </Row>
                <Row>
                    <Col sm={2}>Crouched</Col>
                    <Col sm={5}>{this.statsForStance(AttachmentStats.STANCE_CROUCH, true)}</Col>
                    <Col sm={5}>{this.statsForStance(AttachmentStats.STANCE_CROUCH, false)}</Col>
                </Row>
                <Row>
                    <Col sm={2}>Prone</Col>
                    <Col sm={5}>{this.statsForStance(AttachmentStats.STANCE_PRONE, true)}</Col>
                    <Col sm={5}>{this.statsForStance(AttachmentStats.STANCE_PRONE, false)}</Col>
                </Row>
            </Col>
        </Row>);
    }

    statsForStance(stance, ads) {
        let recoils = [0,0,0];
        if (this.props.attachmentStats !== null) {
            recoils = this.props.attachmentStats.recoilStats(stance, ads);
        }
        return (
            <p>{"←" + recoils[0] + " ↑" + recoils[1] + " " + recoils[2] + '→'}</p>
        );
    }
}

export default RecoilStats;
