const ready = require('../events/ready');

module.exports = class Uptime {
    constructor() {
        this.start = ready.start();
    }

    uptime() {
        this.diff = Date.now() - this.start;
        let h = Math.floor(this.diff / 1000 / 60 / 60);
        this.diff -= h * 1000 * 60 * 60;
        let m = Math.floor(this.diff / 1000 / 60);
        this.diff -= m * 1000 * 60;
        let s = Math.floor(this.diff / 1000);
        this.diff -= s * 1000;
        let milis = Math.floor(this.diff);
        return {h: h, m: m, s: s, milis: milis};
    }
};