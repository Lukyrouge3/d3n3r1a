// const request = require('snekfetch');
// //
// // let c = 1;
// // for (let i = 0; i < c; i++) {
// //     let random = Math.floor(Math.random() * 15189);
// //     // console.log(random);
// //     let animename = "Bunny girl senpai";
// //     // request.get('https://kitsu.io/api/edge/anime?page[limit]=1&page[offset]=' + random).then(r => {
// //     //     let data = JSON.parse(r.body.toString('utf8')).data[0];
// //     //     console.log(data.attributes.titles.en_jp);
// //     // });
//
// // }
// // request.post('https://kitsu.io/api/oauth/token').set({"Content-Type": "application/json"}).send({grant_type: 'password', username: 'lukyrouge4@gmail.com', password: 'Su784eUM8'}).then(r => {
// //     console.log(r.body);
// // });
// request.get('https://kitsu.io/api/edge/anime?page[limit]=1&filter[nsfw]=1')
//     .set({"Authorization": "Bearer ae5a31373cb0f50a282934537189e0a968e53c0907660cf04dcedd7f87bae196"})
//     .then(r => {
//         let data = JSON.parse(r.body.toString('utf8')).data;
//         console.log(data);
//     });
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();
const fs = require('fs');
request.open('GET', 'https://kitsu.io/api/edge/anime?filter[ageRating]=R18');

request.setRequestHeader('Authorization', 'Bearer ae5a31373cb0f50a282934537189e0a968e53c0907660cf04dcedd7f87bae196');

request.onreadystatechange = function () {
    if (this.readyState === 4) {
        // console.log('Status:', this.status);
        // console.log('Headers:', this.getAllResponseHeaders());
        // console.log('Body:', JSON.parse(this.responseText));
        fs.appendFile('test.json', this.responseText, function(err) {});
    }
};

request.send();