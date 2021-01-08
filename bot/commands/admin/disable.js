const Nekos = require('../../apis/nekos');
const disable = require('../../events/message').disable;

function hasPermission(member) {
    return member.hasPermission('MANAGE_MESSAGES')
}

exports.run = async (client, msg, args) => {
    if (hasPermission(msg.member)) {
        if (msg.mentions.members.size > 0) {
            disable(msg.mentions.members.first());
            msg.reply('User disabled!');
        } else msg.reply(await Nekos.owoify('You have to tell me who !'));
    } else msg.reply(await Nekos.owoify('You can\'t do that !'));
};

exports.help = "Disable a user";
exports.category = "Admin";
exports.arguments = "<mention>";

exports.isHidden = true;
exports.hasPermission = hasPermission;
//MANAGE_MESSAGES, true, true