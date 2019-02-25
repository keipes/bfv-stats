import Weapon from "./Weapon";

class WeaponStore {
    constructor(data) {
        this.weapons = new Map();
        for (let weaponData of data) {
            // console.log(weaponData);
            let weapon = new Weapon(weaponData);
            let curWeapon = this.weapons.get(weapon.name);
            if (curWeapon === undefined) {
                this.weapons.set(weapon.name, weapon);
            } else {
                curWeapon.mergeFrom(weapon);
            }
            // console.log(weapon.name);
            // let weapon = this.weapons.get()
            // break;

        }
        // TODO: this could be done lazily
        this.weapons.forEach((weapon, name) => {
            weapon.updateAttachmentTiers();
        });

        // this.listAllWeapons();
    }

    listAllWeapons() {
        const weapons = [];
        this.weapons.forEach((weapon, name) => {
            // weapons.push(name);
            // console.log(name);
            // weapon.logStats();
            // weapon.logAttachments();
            if (weapon.class === 3) {
                weapons.push(name);
            }
        });
        return weapons;
    }

    weaponNames(classFilter) {
        let weaponNames = [];
        this.weapons.forEach((weapon, name) => {
            if (classFilter === 0 || weapon.class === classFilter) {
                weaponNames.push(name);
            }
            // if (weapon.class)
        });
        weaponNames.sort();
        return weaponNames;
        // return this.weapons.keys();
    }

    isWeapon(weapon) {
        return this.weapons.has(weapon);
    }

    getWeapon(weapon) {
        return this.weapons.get(weapon);
    }
}

export default WeaponStore;