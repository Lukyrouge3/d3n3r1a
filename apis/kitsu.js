// request.get('https://kitsu.io/api/edge/anime?page[limit]=10&filter[text]=' + animename).then(r => {
//     let data = JSON.parse(r.body.toString('utf8')).data;
//     data.forEach(d => {
//         console.log(d.attributes.titles.en);
//     });
// });
const Discord = require('discord.js');

module.exports.random = async () => {
    let r = await request.get('https://kitsu.io/api/edge/anime?page[limit]=1&page[offset]=' + random);
    return r.body;
};

module.exports.search = async name => {
    let r = await request.get('https://kitsu.io/api/edge/anime?page[limit]=1&filter[text]=' + name);
    return r.body;
};

module.exports.renderAnime = async anime => {
    let embed = new Discord.MessageEmbed();
    
};