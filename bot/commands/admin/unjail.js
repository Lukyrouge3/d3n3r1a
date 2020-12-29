const Nekos = require('../../apis/nekos');
const unjail = require('../../events/voiceStateUpdate').unjail;

function hasPermission(member) {
    return member.hasPermission('KICK_MEMBERS')
}

exports.run = async (client, msg, args) => {
    if (hasPermission(msg.member)) {
        if (msg.mentions.members.size === 1) {
            unjail(msg.mentions.members.first().id);
            msg.reply('The user has been un-jailed !');
            msg.mentions.members.first().createDM().then((dm) => {
                dm.send("You have been un-jailed");
            })
        } else msg.reply(await Nekos.owoify('You have to tell me who !'));
    } else msg.reply(await Nekos.owoify('You can\'t do that !'));
};

exports.help = "Unjail a member";
exports.category = "Admin";
exports.arguments = "<mention>";

exports.isHidden = true;
exports.hasPermission = hasPermission;
exports.coolDown = 2000;
//MANAGE_MESSAGES, true, true