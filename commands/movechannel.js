const Nekos = require('../apis/Nekos');

const chan1 = "714482413840891935",
      chan2 = "714482465854718043";

exports.run = async (client, msg, args) => {
  msg.reply(await Nekos.owoify("Check you console, master !"));
  client.channels.fetch(chan1).then(c => {
    msg.member.voice.setChannel(c);
  });
};

exports.help = "Get the current voice channel id";
exports.category = "Dev";