const Nekos = require('../../apis/nekos');

exports.run = async (client, msg, args) => {
    msg.reply("You can see the bot's stats here : https://fierce-ocean-92127.herokuapp.com/");
};

exports.help = "Gives access to the bot's stats";
exports.category = "Other";