const Nekos = require('../../apis/nekos');

const chan1 = "714482413840891935",
      chan2 = "714482465854718043";

exports.run = async (client, msg, args) => {
  // let channel = msg.member.voice;
  // console.log(channel);
  //
  // if (channel === undefined) {
  //   msg.reply(await Nekos.owoify("Please join a voice channel first !"));
  //   return;
  // }
  //
  // channel = channel.channel;
  // let members = channel.members.clone(),
  //     i = 0;
  // members.each(m => {
  //   let ch = chan1;
  //
  //   if (i >= Math.floor(members.size / 2)) {
  //     ch = chan2;
  //   }
  //
  //   client.channels.fetch(ch).then(c => {
  //     m.voice.setChannel(c);
  //   });
  //   console.log(ch);
  //   i++;
  // });
  msg.reply("WIP " + (await Nekos.cat()));
};

exports.help = "Create random teams to play custom game. In order to do that, all players must be in the same channel than the sender.";
exports.category = "Other";