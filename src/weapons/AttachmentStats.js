class AttachmentStats {
    constructor(data) {
        const attachments = data['Attachments'].slice();
        // sort attachments first so the joined string can be compared consistently
        attachments.sort();
        this.key = attachments.join('');
        // console.log(this.key);
        // console.log(data);
        this.attachments = new Set(attachments);
        this.velocity = data['InitialSpeed'];
        this.rof = data['RoF'];
        this.ammo = data['Ammo'];
        this.maxDmg = data['SDmg'];
        this.minDmg = data['EDmg'];
    }

    containsAttachments(attachments) {
        for (let attachment of attachments) {
            if (!this.attachments.has(attachment)) {
                // console.log(attachment);
                return false;
            }
        }
        return true;
    }
}

export default AttachmentStats;