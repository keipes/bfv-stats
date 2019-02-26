import React, { Component } from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AttachmentPicker from "./AttachmentPicker";
import RecoilStats from "./statistics/RecoilStats";

class WeaponStats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            attachments: []
        };
        this.attachmentCallback = this.attachmentCallback.bind(this);
    }

    render() {
        const weaponData = this.props.store.getWeapon(this.props.weapon);
        const attachmentStats = weaponData === undefined ? null : weaponData.getStatsForAttachments(this.state.attachments);
        return (<Col sm={12}>
            <Row className={"weapon-stats"}>
                <Col sm={6}>
                    <Row>
                        <Col sm={6}>
                            <Row><Col><h3>{this.props.weapon}</h3></Col></Row>
                            <AttachmentPicker attachmentCallback={this.attachmentCallback} weaponData={weaponData} attachments={this.state.attachments}/>
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
        </Col>);
    }

    displayStats(weaponData) {
        const statistics = [];
        if (weaponData !== undefined) {
            // console.log(weaponData.levelOneAttachments());
            // console.log(weaponData.nextTierAttachments([]));
            const stats = weaponData.getStatsForAttachments(this.state.attachments);
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
        this.setState((state, props) => {
            let attachments = state.attachments.slice();
            if (checked) {
                attachments.push(attachment);
            } else {
                attachments = attachments.filter(a => a !== attachment);
            }

            const weapon = this.props.store.getWeapon(this.props.weapon);
            weapon.getStatsForAttachments(state.attachments).logDelta(weapon.getStatsForAttachments(attachments));
            // AttachmentStats.logDelta(, );
            return {attachments: attachments};
        });
        // this.setState({attachments: []});
    }

}

export default WeaponStats;