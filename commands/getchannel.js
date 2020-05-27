const Nekos = require('../apis/nekos');

exports.run = async (client, msg, args) => {
  msg.reply("Check you console, master !!");
  console.log(msg.member.voice.channelID);
};

exports.help = "Get the current voice channel id";
exports.category = "Dev";

exports.isHidden = true;