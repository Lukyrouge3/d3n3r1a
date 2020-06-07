// const request = require('snekfetch');
//
// let c = 1;
// for (let i = 0; i < c; i++) {
//     let random = Math.floor(Math.random() * 15189);
//     // console.log(random);
//     let animename = "Bunny girl senpai";
//     // request.get('https://kitsu.io/api/edge/anime?page[limit]=1&page[offset]=' + random).then(r => {
//     //     let data = JSON.parse(r.body.toString('utf8')).data[0];
//     //     console.log(data.attributes.titles.en_jp);
//     // });
//     request.get('https://kitsu.io/api/edge/anime?page[limit]=10&filter[text]=' + animename).then(r => {
//         let data = JSON.parse(r.body.toString('utf8')).data;
//         data.forEach(d => {
//             console.log(d.attributes.titles.en);
//         });
//     });
// }

const moment = require('moment');
const release = moment('2020-06-08 23:59');

console.log(release.diff(moment(), 'hours'));
