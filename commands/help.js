const Discord = require('discord.js');

const Nekos = require('../apis/nekos');
const hidden = ['Dev'];

exports.run = async (client, msg, args) => {
    let commands = client.commands;
    let categories = client.categories;
    let embed = new Discord.MessageEmbed().setAuthor((await Nekos.cat()) + " \uD83D\uDCD6", process.env.AVATAR).setColor(0xFFFFFF);

    for (const [cat, cmds] of Object.entries(categories)) {
        let str = [""],
            i = 0;
        cmds.forEach(command => {
            let cmd = commands.get(command);
            if (!cmd.isHidden && (cmd.isNSFW === undefined || cmd.isNSFW(command) && msg.channel.nsfw || !cmd.isNSFW(command))) {
                if (str[i].length > 1000) {
                    i++;
                    str[i] = "";
                }

                str[i] += "\n **-" + command + "**";
                if (cmd.help !== undefined) str[i] += ": " + cmd.help;
                if (cmd.arguments !== undefined) str[i] += "\n**Arguments**: `" + cmd.arguments + "`";
            }
        }); // embed.addField(cat, str, false);

        str.forEach(s => {
            if (s !== "") embed.addField(cat, s, true);
        });
    }

    msg.reply(embed);
};

exports.isNSFW = () => {
    return false;
};

exports.help = "Help command";
exports.category = "Autre";