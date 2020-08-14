const Nekos = require('../../apis/nekos');
const quote = require('../../apis/quote');
const Discord = require('discord.js');

exports.run = async (client, msg, args) => {
    let q;
    if (args.length === 0) q = await quote.random();
    else q = await quote.search(args);
    let embed = new Discord.MessageEmbed().setAuthor((await Nekos.cat()) + " \uD83D\uDCD6", process.env.AVATAR).setColor(0xFFFFFF);
    embed.addField(q.author, q.quote);
    await msg.reply(embed);
};

exports.help = "Search a quote";
exports.category = "Quotes";

exports.coolDown = 5000;

exports.isHidden = false;