const Nekos = require('../../apis/nekos');
const Discord = require('discord.js');
const Kitsu = require('../../apis/kitsu');

exports.run = async (client, msg, args) => {
    if (args.length === 0) {
        //Help
        await msg.reply(await help());
    } else {
        switch (args[0]) {
            case 'random':
                //Kitsu.random();
                break;
            case 'search':

                break;
            default:
                //Help
                await msg.reply(await help());
        }
    }
};

async function help() {
    let embed = new Discord.MessageEmbed().setAuthor((await Nekos.cat()) + " \uD83D\uDCD6", process.env.AVATAR).setColor(0xFFFFFF);
    str = "";
    str += "\n **random**: Return a random anime";
    str += "\n **search**: Search for your anime's name";

    embed.addField("Anime command", str, false);
    return embed;
}

exports.help = "The anime command";
exports.category = "Otaku";

exports.isHidden = false;