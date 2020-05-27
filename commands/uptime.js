const Nekos = require('../apis/nekos');

const Uptime = require('../apis/uptime');

exports.run = async (client, msg, args) => {
    let up = new Uptime();
    let u = up.uptime();
    let hours = u.h === 0 ? "" : (u.h + "hours "), minutes = u.m === 0 ? "" : (u.m + "minutes "),
        seconds = u.s === 0 ? "" : (u.s + "seconds ");

    msg.reply('Im online for ' + hours + minutes + seconds + u.milis + "milis");

    // + d.getDate() + '/' + d.getMonth() + 1 + "/" + d.getFullYear() + ' '
    // + d.getHours() + ':' + d.getMinutes() + " aka: "
};

exports.help = "Get the uptime";
exports.category = "Dev";

exports.isHidden = true;