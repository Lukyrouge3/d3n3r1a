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
                msg.reply(Kitsu.renderAnime(await Kitsu.random()));
                break;
            case 'search':
                if (args.length >= 2) {
                    let s = "";
                    for (let i = 1; i<args.length; i++) s += args[i] + "+";
                    let anime = await Kitsu.search(s);
                    if (anime.data != [] && anime.data) {
                        msg.reply(Kitsu.renderAnime(anime));
                    } else msg.reply("Can't find any anime with this filter !");
                } else msg.reply("You didn't tell me what i have to search !");
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