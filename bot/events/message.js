const COMMAND_PREFIX = process.env.PREFIX;

const Nekos = require('../apis/nekos');
const CoolDown = new (require('../apis/cooldown'))();
const database = require('../apis/database');

let mutedMembers = [];
let disabledMembers = [];

exports.run = async (client, msg) => {
    // if (msg.author.bot) return;
    const mentionanwsers = ["Stop mentioning me ! Im quite busy right now !", "Im not your girlfriend stop talking to me !", "Im not a toy im currently being cute so stop pinging me !"];

    if (msg.content.startsWith(COMMAND_PREFIX) && !disabled(msg.member.id)) {
        let msgArr = msg.content.split(" ");
        let cmd = msgArr[0].slice(COMMAND_PREFIX.length);
        let args = msgArr.slice(1);
        let cmdFile = client.commands.get(cmd);
        if (!cmd) return;

        if (cmdFile === undefined) {
            msg.reply(await Nekos.owoify("I don't know this command !"));
            return;
        }

        if (cmdFile.isNSFW !== undefined && cmdFile.isNSFW(cmd) && !msg.channel.nsfw) {
            msg.reply('This command must be used in a NSFW channel to protect 11years old people !');
            return;
        }
        if (!CoolDown.isOnCoolDown(msg.author, cmd) || msg.member.hasPermission("ADMINISTRATOR")) {
            cmdFile.run(client, msg, args);
            database.addCommand(cmd, msg);
            await CoolDown.addCoolDown(msg.author, cmd, cmd.coolDown);
        } else msg.reply('You\'re on cooldown');
    }
    if (muted(msg.member.id)) {
        await msg.delete();
    }
};

exports.mute = (member) => {
    if (!muted(member.id)) mutedMembers.push(member.id);
};

exports.disable = (member) => {
    if (!disabled(member)) disabledMembers.push(member.id);
};

function muted(id) {
    for (let i = 0; i < mutedMembers.length; i++) if (mutedMembers[i] === id) return true;
    return false;
}

exports.unmute = (id) => {
    for (let i = 0; i < mutedMembers.length; i++) if (mutedMembers[i] === id) mutedMembers.splice(i, 1);
};

exports.undisable = (id) => {
    for (let i = 0; i < disabledMembers.length; i++) if (disabledMembers[i] === id) disabledMembers.splice(i, 1);
};

function disabled(id) {
    for (let i = 0; i < disabledMembers.length; i++) if (disabledMembers[i] === id) return true;
    return false;
}