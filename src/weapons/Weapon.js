import AttachmentStats from "./AttachmentStats";

class Weapon {
    constructor(data) {
        // console.log(data);
        // console.log(JSON.stringify(data));
        this.stats = new Map();
        this.name = data['WeapShowName'];
        this.class = data['Class'];
        let stats = new AttachmentStats(data);
        this.stats.set(stats.key, stats);
        this._updateAttachmentTiers(new Map(), [], [], [], []);
    }

    /**
     *
     * @param {Weapon} other
     */
    mergeFrom(other) {
        other.stats.forEach((value, key) => {
            this.stats.set(key, value);
        });
        // this.updateAttachmentRels();
    }

    logStats() {
        this.stats.forEach((stat, key) => {
            // console.log(key);
            // console.log(key);
            console.log(stat);
        });
    }

    getStatsForAttachments(attachments) {
        return this.stats.get(AttachmentStats.createKey(attachments));
    }

    /**
     * Call this only after all weapon stats have been loaded.
     */
    updateAttachmentTiers() {
        const attachmentRels = new Map();
        const allLowerTierAttachments = new Set();
        const updateLowerTier = (attachment) => {allLowerTierAttachments.add(attachment);};
        const tierOne = Weapon.nextTierAttachments(this.stats, attachmentRels, [], allLowerTierAttachments, 1);
        tierOne.forEach(updateLowerTier);
        const tierTwo = Weapon.nextTierAttachments(this.stats, attachmentRels, tierOne, allLowerTierAttachments, 2);
        tierTwo.forEach(updateLowerTier);
        const tierThree = Weapon.nextTierAttachments(this.stats, attachmentRels, tierTwo, allLowerTierAttachments, 3);
        tierThree.forEach(updateLowerTier);
        const tierFour = Weapon.nextTierAttachments(this.stats, attachmentRels, tierThree, allLowerTierAttachments, 4);
        this._updateAttachmentTiers(attachmentRels, tierOne, tierTwo, tierThree, tierFour);

    }

    /**
     *
     * @param {Map} rels
     * @param {Set} tierOne
     * @param {Set} tierTwo
     * @param {Set} tierThree
     * @param {Set} tierFour
     */
    _updateAttachmentTiers(rels, tierOne, tierTwo, tierThree, tierFour) {
        this.attachmentRels = rels;
        this.attachmentTiers = [tierOne, tierTwo, tierThree, tierFour];
    }

    /**
     *
     * @param {Map} stats
     * @param {Map} rels
     * @param {Set} previousTier
     * @param {Set} allLowerTierAttachments
     * @param {Number} tier
     * @returns {Set}
     */
    static nextTierAttachments(stats, rels, previousTier, allLowerTierAttachments, tier) {
        const thisTierAttachments = new Set();
        stats.forEach((stat, key) => {
            // An attachment list of length previous tier + 1 has the new attachment in it.
            if (stat.attachments.size === tier) {
                // Iterate through attachments to find the new attachment.
                for (let attachment of stat.attachments) {
                    // If the current attachment hasn't been seen in a lower tier it is new. (Could this change?)
                    if (!allLowerTierAttachments.has(attachment)) {
                        thisTierAttachments.add(attachment);
                        if (previousTier.size === 0) {
                            // Special case for tier one where there are no parent attachments.
                            Weapon.updateRels(rels, null, attachment);
                        } else {
                            // Iterate through the previous tier to find parent attachment(s) and update relations.
                            for (let potentialParent of previousTier) {
                                if (stat.attachments.has(potentialParent)) {
                                    Weapon.updateRels(rels, potentialParent, attachment);
                                }
                            }
                        }
                    }
                }
            }
        });
        return thisTierAttachments;
    }

    /**
     *
     * @param {Map} rels
     * @param {String} parent
     * @param {String} child
     */
    static updateRels(rels, parent, child) {
        if (rels.has(parent)) {
            rels.get(parent).add(child);
        } else {
            rels.set(parent, new Set([child]));
        }
    }

    /**
     *
     * @param {Number} tier
     * @returns {Set}
     */
    attachmentsForTier(tier) {
        return this.attachmentTiers[tier - 1]
    }

    /**
     *
     */
    childrenOfAttachment(attachment) {
        return this.attachmentRels.get(attachment);
    }

}

export default Weapon;