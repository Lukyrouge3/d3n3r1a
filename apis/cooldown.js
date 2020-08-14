const Discord = require('discord.js');

module.exports = class CoolDown {
    constructor() {
        this.cooldown = new Discord.Collection();
        // user.id, [commands]
    }

    async addCoolDown(user, command, time = 10000) {
        if (process.env.COOLDOWN) {
            return new Promise(resolve => {
                let cd = this.cooldown.get(user.id) || [];
                cd.push(command);
                this.cooldown.set(user.id, cd);
                setTimeout(() => {
                    this.removeCoolDown(user, command);
                    resolve(true);
                }, time);
            });
        }
    }

    async removeCoolDown(user, command) {
        let cd = this.cooldown.get(user.id) || [];
        for (let i = 0; i < cd.length; i++) if (cd[i] === command) cd.splice(i, 1);
        this.cooldown.set(user.id, cd);
    }

    isOnCoolDown(user, command) {
        let cd = this.cooldown.get(user.id) || [];
        for (let i = 0; i < cd.length; i++) if (cd[i] === command) return true;
        return false;
    }
};