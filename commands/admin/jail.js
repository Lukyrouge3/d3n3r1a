const Nekos = require('../../apis/nekos');
const jail = require('../../events/voiceStateUpdate').jail;

function hasPermission(member) {
    return member.hasPermission('KICK_MEMBERS')
}

exports.run = async (client, msg, args) => {
    if (hasPermission(msg.member)) {
        if (msg.mentions.members.size === 1) {
            jail(msg.mentions.members.first().id);
            msg.mentions.members.first().voice.kick();
            msg.reply('The user has been jailed !');
            msg.mentions.members.first().createDM().then((dm) => {
                dm.send("You have been jailed");
            })
        } else msg.reply(await Nekos.owoify('You have to tell me who !'));
    } else msg.reply(await Nekos.owoify('You can\'t do that !'));
};

exports.help = "Prevent a member to join a voice channel";
exports.category = "Admin";
exports.arguments = "<mention>";

exports.isHidden = true;
exports.hasPermission = hasPermission;
exports.coolDown = 2000;
//MANAGE_MESSAGES, true, true