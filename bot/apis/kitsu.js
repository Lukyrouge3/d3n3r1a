// request.get('https://kitsu.io/api/edge/anime?page[limit]=10&filter[text]=' + animename).then(r => {
//     let data = JSON.parse(r.body.toString('utf8')).data;
//     data.forEach(d => {
//         console.log(d.attributes.titles.en);
//     });
// });
const request = require('snekfetch');
const Discord = require('discord.js');
let last;

module.exports.random = async () => {
    let random = Math.floor(Math.random() * last);
    let r = JSON.parse((await request.get('https://kitsu.io/api/edge/anime?page[limit]=1&page[offset]=' + random)).body);
    console.log('https://kitsu.io/api/edge/anime?page[limit]=1&page[offset]=' + random);
    return r;
};

module.exports.search = async name => {
    let r = JSON.parse((await request.get('https://kitsu.io/api/edge/anime?page[limit]=1&filter[text]=' + name)).body);
    return r;
};

module.exports.renderAnime = anime => {
    console.log(anime.data[0].attributes);
    anime = anime.data[0];
    let embed = new Discord.MessageEmbed();
    embed.setAuthor(anime.attributes.titles.ja_jp, anime.attributes.posterImage.tiny, "https://kitsu.io/anime/" + anime.id)
        .setTitle(anime.attributes.titles.en_jp)
        .setImage(anime.attributes.coverImage ? anime.attributes.coverImage.small : anime.attributes.posterImage.medium)
        .addField("Synopsis", trim(anime.attributes.synopsis))
        .setThumbnail(anime.attributes.posterImage.medium);
    if (anime.attributes.description !== anime.attributes.synopsis) embed.setDescription(anime.attributes.description);
    embed.addField("Episode count", anime.attributes.episodeCount, true);
    embed.addField("Episode lenght", anime.attributes.episodeLength, true);
    embed.addField("Nsfw ?", anime.attributes.nsfw ? "**Yes**" : "No", true);
    return embed;
};

module.exports.setlast = async () => {
    let r = JSON.parse((await request.get('https://kitsu.io/api/edge/anime?page[limit]=1&page[offset]=100000')).body);
    let l = r.links.last.split('=');
    last = l[l.length - 1];
};

function trim(str) {
    if (str.length >= 1024) {
        str = str.substring(0, 1000) + "...";
    }
    return str;
}