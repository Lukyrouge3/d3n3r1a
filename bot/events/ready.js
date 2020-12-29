const COMMAND_PREFIX = process.env.PREFIX;
const Nekos = require('../apis/nekos');

exports.run = async client => {
    let user = client.user;
    user.setActivity(COMMAND_PREFIX, {
        type: "WATCHING"
    }).then(() => {
        Nekos.owoify("Im ready for the fun !").then((owo) => {
            Nekos.cat().then(cat => {
                console.log(owo + cat);
            })
        });
    }).catch(console.error);
};
