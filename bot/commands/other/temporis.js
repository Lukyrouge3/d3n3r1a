const Nekos = require('../../apis/nekos');
const moment = require('moment');
const release = moment('2020-06-08 21:00');
exports.run = async (client, msg, args) => {
    let diff = release.diff(moment(), 'hours');
    let diff_day = release.diff(moment(), 'days');
    let str = "";
    if (diff < 0)
        str = "Le serveur à commencé depuis " + diff + "h (" + diff_day + " jours)";
    else
        str = "Le serveur commence dans " + diff + "h (" + diff_day + " jours)";
    msg.reply(str);
};

exports.help = "Temporis V UwU";
exports.category = "Other";

exports.isHidden = false;