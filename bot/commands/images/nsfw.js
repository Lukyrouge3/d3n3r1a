const Nekos = require('../../apis/nekos');

const nsfw = Nekos.nsfw.slice(0);

exports.run = async (client, msg, args) => {
    let cmd = nsfw[Math.floor(Math.random() * nsfw.length)];
    // Run the command
    Nekos.run(client, msg, args, cmd);
};

exports.help = "Trigger a random nsfw command.";
exports.category = "NSFW";
exports.isNSFW = () => {
    return true
};
exports.isHidden = false;