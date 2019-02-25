class AttachmentStats {
    constructor(data) {
        const attachments = data['Attachments_short'].split('+').filter(a => a !== '');
        this.key = AttachmentStats.createKey(attachments);
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

    static createKey(attachments) {
        const words = [];
        for (let word of attachments) {
            words.push(word);
        }
        words.sort();
        return words.join('');
    }
}

export default AttachmentStats;