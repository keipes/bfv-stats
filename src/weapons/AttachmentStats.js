class AttachmentStats {

    static ignoredDeltas = new Set([
        'Attachments',
        'Attachments_short',
        'Damages',
        'Dmg_distances'
    ]);

    static STANCE_STAND = 'Stand';
    static STANCE_CROUCH = 'Crouch';
    static STANCE_PRONE = 'Prone';


    constructor(data) {
        const attachments = data['Attachments_short'].split('+').filter(a => a !== '');
        this.key = AttachmentStats.createKey(attachments);
        this.attachments = new Set(attachments);
        this.velocity = data['InitialSpeed'];
        this.rof = data['RoF'];
        this.ammo = data['Ammo'];
        this.maxDmg = data['SDmg'];
        this.minDmg = data['EDmg'];
        this.drag = data['Drag'];
        this.deployTime = data['DeployTime'];
        this.adsTime = data['AimingFovTransitionTime'];
        this.distances = data['Dmg_distances'];
        this.damages = data['Damages'];
        this.data = data;
    }

    /**
     *
     * @param {String} stance
     * @param {Boolean} ads
     * @returns {Array}
     */
    recoilStats(stance, ads) {
        const prefix = (ads ? 'ADS' : 'HIP') + stance + 'Recoil';
        return [
            this.data[prefix + 'Left'],
            this.data[prefix + 'Up'],
            this.data[prefix + 'Right']
        ];
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

    /**
     *
     * @param {AttachmentStats} newStats
     */
    logDelta(newStats) {
        if (!newStats) {
            return;
        }
        const keys = new Set();
        for (let key in this.data) {
            if (this.data.hasOwnProperty(key)) {
                keys.add(key);
            }
        }
        for (let key in newStats.data) {
            if (newStats.data.hasOwnProperty(key)) {
                keys.add(key);
            }
        }
        let delta = '';
        for (let key of keys) {
            if (AttachmentStats.ignoredDeltas.has(key)) {
                continue;
            }
            if (!this.data.hasOwnProperty(key)) {
                delta += "new key: " + key + "\n";
            } else if (!newStats.data.hasOwnProperty(key)) {
                delta += "lost key: " + key + "\n";
            } else if (this.data[key] !== newStats.data[key]) {
                delta += key + ": " + this.data[key] + " -> " + newStats.data[key] + "\n";
            }
        }
        if (delta !== '') {
            console.log(delta);
        }
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