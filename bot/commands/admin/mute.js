const Nekos = require('../../apis/nekos');
const mute = require('../../events/message').mute;

function hasPermission(member) {
    return member.hasPermission('MANAGE_MESSAGES')
}

exports.run = async (client, msg, args) => {
    if (hasPermission(msg.member)) {
        if (msg.mentions.members.size > 0) {
            mute(msg.mentions.members.first());
            msg.reply('User muted!');
        } else msg.reply(await Nekos.owoify('You have to tell me who !'));
    } else msg.reply(await Nekos.owoify('You can\'t do that !'));
};

exports.help = "Mute a user";
exports.category = "Admin";
exports.arguments = "<mention>";

exports.isHidden = true;
exports.hasPermission = hasPermission;
//MANAGE_MESSAGES, true, true