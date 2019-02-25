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
        if (weapon === undefined) {
            return null;
        }
        const attachments = [];
        this.attachmentCells(attachments, weapon, 1);
        this.attachmentCells(attachments, weapon, 2);
        this.attachmentCells(attachments, weapon, 3);
        this.attachmentCells(attachments, weapon, 4);
        return (<Row>
            {attachments}
        </Row>);
    }

    /**
     * @param {Array} cells
     * @param {Weapon} weapon
     * @param {Number} tier
     * @returns {Array}
     */
    attachmentCells(cells, weapon, tier) {
        for (let attachment of weapon.attachmentsForTier(tier)) {
            let disabled = true;
            // Only enable attachments of the next tier available tier.
            if (this.props.attachments.length === tier - 1) {
                if (this.props.attachments.length === 0) {
                    // No attachments yet selected, enable all tier 1 attachments.
                    disabled = false;
                } else {
                    // Enable attachment only if a lower tier attachment is a parent of the current attachment.
                    for (let lowerTierAttachment of this.props.attachments) {
                        if (weapon.childrenOfAttachment(lowerTierAttachment).has(attachment)) {
                            disabled = false;
                        }
                    }
                }
            }
            cells.push(<Col sm={6} key={attachment}>
                <Form.Check
                    type={"checkbox"}
                    label={attachment}
                    onChange={this.props.attachmentCallback}
                    className={"attachment-pick"}
                    disabled={disabled}
                /></Col>);
        }
    }


}

export default AttachmentPicker;