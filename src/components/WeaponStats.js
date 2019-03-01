import React, { Component } from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AttachmentPicker from "./AttachmentPicker";
import RecoilStats from "./statistics/RecoilStats";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class WeaponStats extends Component {

    static STORAGE_KEY_WEAPONS = 'WeaponStats.Attachments';



    constructor(props) {
        super(props);
        this.state = {
            attachments: this.props.attachments
        };
        this.attachmentCallback = this.attachmentCallback.bind(this);
    }

    // /**
    //  *
    //  * @param {Array} attachments
    //  */
    // storeAttachments(attachments) {
    //     localStorage.setItem(this.attachmentsKey(), JSON.stringify(this.state.attachments))
    // }
    //
    // attachmentsKey() {
    //     return "WeaponStats.AttachmentKey." + this.props.identifier
    // }
    //
    // loadAttachments() {
    //     const storedAttachments = localStorage.getItem(this.attachmentsKey());
    //     if (storedAttachments == null) {
    //         return [];
    //     }
    //     console.log(storedAttachments);
    //     return JSON.parse(storedAttachments);
    // }

    render() {
        const weaponData = this.props.store.getWeapon(this.props.weapon);
        const attachmentStats = weaponData === undefined ? null : weaponData.getStatsForAttachments(this.props.attachments);
        return (<Col sm={12} className={"weapon-stats"}>
            <Row >
                <Col sm={6}>
                    <Row>
                        <Col sm={6}>
                            <Row><Col><h3>{this.props.weapon}</h3></Col></Row>
                            <AttachmentPicker attachmentCallback={this.attachmentCallback}
                                              weaponData={weaponData}
                                              attachments={this.props.attachments}/>
                        </Col>
                        <Col sm={6}>
                            {this.displayStats(weaponData)}
                        </Col>
                    </Row>
                </Col>
                <Col sm={6}>
                    <RecoilStats attachmentStats={attachmentStats}/>
                </Col>

            </Row>
            <Row>
                <Col sm={12}>
                    <ButtonGroup>
                        <Button variant={"outline-success"} size={"sm"}
                                onClick={this.props.clearAttachments}>Reset</Button>
                        <Button variant={"outline-info"} size={"sm"}
                                onClick={this.props.duplicateCallback}>Duplicate</Button>
                        <Button variant={"outline-danger"} size={"sm"}
                                onClick={this.props.removeCallback}>Remove</Button>
                    </ButtonGroup>
                </Col>
            </Row>

        </Col>);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const weapon = this.props.store.getWeapon(this.props.weapon);
        weapon.getStatsForAttachments(this.props.attachments).logDelta(weapon.getStatsForAttachments(prevProps.attachments));
    }

    displayStats(weaponData) {
        const statistics = [];
        if (weaponData !== undefined) {
            // console.log(weaponData.levelOneAttachments());
            // console.log(weaponData.nextTierAttachments([]));
            const stats = weaponData.getStatsForAttachments(this.props.attachments);
            statistics.push(this.statRow("Velocity", stats.velocity));
            statistics.push(this.statRow("RoF", stats.rof));
            statistics.push(this.statRow("Max Dmg", stats.maxDmg));
            statistics.push(this.statRow("Min Dmg", stats.minDmg));
            statistics.push(this.statRow("Drag", stats.drag));
            statistics.push(this.statRow("Deploy Time", stats.deployTime));
            statistics.push(this.statRow("ADS Time", stats.adsTime));
        }
        return (<React.Fragment>
            {statistics}
        </React.Fragment>);
    }

    statRow(label, value) {
        return (<Row key={label + value}>
            <Col sm={9} className={"weaponStatLabel"}>{label}</Col>
            <Col sm={3} className={"weaponStatValue"}>{value}</Col>
        </Row>)
    }

    attachmentCallback(event) {
        const attachment = event.target.nextSibling.textContent;
        const checked = event.target.checked;
        if (checked) {
            this.props.addAttachment(attachment);
        } else {
            this.props.removeAttachment(attachment);
        }
    }

}

export default WeaponStats;