const Nekos = require('../../apis/nekos');
const unmute = require('../../events/message').unmute;

function hasPermission(member) {
    return member.hasPermission('MANAGE_MESSAGES')
}

exports.run = async (client, msg, args) => {
    if (hasPermission(msg.member)) {
        if (msg.mentions.members.size > 0) {
            unmute(msg.mentions.members.first().id);
            msg.reply('User unmuted!');
        } else msg.reply(await Nekos.owoify('You have to tell me who !'));
    } else msg.reply(await Nekos.owoify('You can\'t do that !'));
};

exports.help = "Unmute a user";
exports.category = "Admin";
exports.arguments = "<mention>";

exports.isHidden = true;
exports.hasPermission = hasPermission;
//MANAGE_MESSAGES, true, true