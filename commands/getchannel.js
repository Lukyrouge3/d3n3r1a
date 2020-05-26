const Nekos = require('../apis/Nekos');

exports.run = async (client, msg, args) => {
  msg.reply(await Nekos.owoify("Check you console, master !!"));
  console.log(msg.member.voice.channelID);
};

exports.help = "Get the current voice channel id";
exports.category = "Dev";