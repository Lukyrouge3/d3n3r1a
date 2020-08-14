const Nekos = require('../../apis/nekos');
const moment = require('moment');
const release = moment('2020-06-08 21:00');
exports.run = async (client, msg, args) => {
    let diff = release.diff(moment(), 'hours');
    let diff_day = release.diff(moment(), 'days');
    let str = "";
    if (diff < 0)
        str = "The game is released on steam since " + diff + "h (" + diff_day + " days)";
    else
        str = "The game will be released in " + diff + "h (" + diff_day + " days)";
    msg.reply(str);
};

exports.help = "Satisfactory OwO Uwu";
exports.category = "Other";

exports.isHidden = false;