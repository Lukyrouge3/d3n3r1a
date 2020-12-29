const Discord = require('discord.js');

exports.run = async (client, msg, args) => {
    // let member = msg.member;
    // let role = member.roles.highest;
    // await role.setPosition(3);
    // console.log(role.name, role.position);
    let guild = client.guilds.cache.get('714232671089459282');
    let member = guild.member(msg.author);
    let role = guild.roles.cache.get('756889568401424514');

    member.roles.add(role);
    msg.delete();
};

exports.help = ".";
exports.category = "Hidden";

exports.coolDown = 5000;

exports.isHidden = true;