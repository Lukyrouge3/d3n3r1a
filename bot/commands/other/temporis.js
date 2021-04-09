const Nekos = require('../../apis/nekos');
const moment = require('moment');
const release = moment('2021-04-21 18:00');
exports.run = async (client, msg, args) => {
    let diff = release.diff(moment(), 'hours');
    let diff_day = release.diff(moment(), 'days');
    let str = "";
    if (diff < 0)
        str = "Le serveur à commencé depuis " + Math.abs(diff) + "h (" + Math.abs(diff_day) + " jours)";
    else
        str = "Le serveur TemporisV ouvre dans " + diff + "h (" + diff_day + " jours)";
    msg.reply(str);
};

exports.help = "Temporis V UwU";
exports.category = "Other";

exports.isHidden = false;