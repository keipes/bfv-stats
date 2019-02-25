import React, { Component } from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

class AttachmentPicker extends Component {
    render() {
        // this.props.attachmentCallback;
        // this.props.weaponData
        // console.log(this.props.weaponData);
        return (
            <Row>
                <Col>
                    <Form>
                        {this.pickAttachments(this.props.weaponData)}
                    </Form>
                </Col>
        </Row>);
    }

    /**
     * @param {Weapon} weapon
     * @returns {*}
     */
    pickAttachments(weapon) {
        // console.log(weapon);
        if (weapon === undefined) {
            return null;
        }

        // weapon.updateAttachmentTiers();
        const attachments = [];
        let key = 0;
        console.log(weapon);
        for (let attachment of weapon.attachmentsForTier(1)) {
            console.log(attachment);
            attachments.push(<Col sm={6} key={attachment + key}><Form.Check type={"checkbox"} label={attachment} onChange={this.props.attachmentCallback}/></Col>);
        }
        // for (let attachment of this.props.weaponData.nextTierAttachments(this.props.attachments)) {
        //     attachments.push(<Col sm={12} key={attachment + key}><Form.Check type={"checkbox"} label={attachment} onChange={this.props.attachmentCallback}/></Col>);
        //     key++;
        // }
        return (<Row>
            {attachments}
        </Row>);
    }


}

export default AttachmentPicker;