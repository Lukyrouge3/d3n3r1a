const request = require('snekfetch');

const Discord = require('discord.js');

const COMMAND_PREFIX = process.env.PREFIX;
const nsfw = ['femdom', 'classic', 'erofeet', 'erok', 'les', 'hololewd', 'lewdk', 'keta', 'feetg', 'nsfw_neko_gif', 'eroyuri', 'kuni', 'tits', 'pussy_jpg', 'cum_jpg', 'pussy', 'lewdkemo', 'lewd', 'cum', 'spank', 'smallboobs', 'Random_hentai_gif', 'nsfw_avatar', 'boobs', 'solog', 'bj', 'yuri', 'anal', 'blowjob', 'holoero', 'gasm', 'hentai', 'ero', 'solo', 'pwankg', 'eron', 'erokemo'];
const sfw = ['tickle', 'hug', 'ngif', 'meow', 'poke', 'kiss', 'slap', 'cuddle', 'fox_girl', 'hug', 'gecg', 'pat', 'smug', 'kemonomimi', 'holo', 'woof', 'baka', 'feed', 'neko', 'ero', 'waifu'];

module.exports.addcommands = bot => {
    nsfw.forEach(n => bot.addCommand(require('./nekos'), n, 'NSFW'));
    sfw.forEach(n => bot.addCommand(require('./nekos'), n, 'SFW'));
};

async function cat() {
    let r = (await request.get('https://nekos.life/api/v2/cat')).body.cat;
    return r;
}

async function owoify(text) {
    let r = (await request.get('https://nekos.life/api/v2/owoify?text=' + text)).body.owo;
    return r;
}

async function fact() {
    let r = (await request.get('https://nekos.life/api/v2/fact')).body.fact;
    return r;
}

async function name() {
    let r = (await request.get('https://nekos.life/api/v2/name')).body.name;
    return r;
}

exports.cat = cat;
exports.owoify = owoify;
exports.fact = fact;
exports.name = name;
exports.nsfw = nsfw;

exports.run = async (client, msg, args, command) => {
    let msgArr = msg.content.split(" ");
    let cmd = command || msgArr[0].slice(COMMAND_PREFIX.length);
    let c = 1;
        if (!isNaN(args[0])) c = Math.min(args[0], 10);
    for (let i = 0; i < c; i++) {
        request.get('https://nekos.life/api/v2/img/' + cmd).then(async r => {
            let embed = new Discord.MessageEmbed().setTitle(await owoify('Here is for you !')).setImage(r.body.url).setAuthor(await cat(), process.env.AVATAR).setColor(0xFFFFFF).setFooter((await owoify('Requested by ')) + " " + msg.author.username + " " + (await cat()));
            await msg.reply(embed);
        });
    }
    if (c > 10) msg.reply(await owoify('Maximum count is 10, so I sent you 10 !'));
};

// exports.arguments = "<count>";

exports.isNSFW = cmd => {
    let b = false;
    nsfw.forEach(n => {
        if (n === cmd) {
            b = true;
            return true;
        }
    });
    return b;
};