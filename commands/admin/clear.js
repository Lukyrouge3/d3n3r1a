const Nekos = require('../../apis/nekos');

function hasPermission(member) {
    return member.hasPermission('MANAGE_MESSAGES')
}

exports.run = async (client, msg, args) => {
    if (hasPermission(msg.member)) {
        if (args.length > 0) {
            let count = Math.min(args[0], 100);
            msg.channel.bulkDelete(count).then(() => Nekos.owoify('I deleted ' + count + ' messages !').then(n => msg.reply(n)));
        } else msg.reply(await Nekos.owoify('You have to tell me how much !'));
    } else msg.reply(await Nekos.owoify('You can\'t do that !'));
};

exports.help = "Clear the messages";
exports.category = "Admin";
exports.arguments = "<count>";

exports.isHidden = true;
exports.hasPermission = hasPermission;
//MANAGE_MESSAGES, true, true