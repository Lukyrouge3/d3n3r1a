const COMMAND_PREFIX = process.env.PREFIX;

const Nekos = require('../apis/nekos');
const CoolDown = new (require('../apis/cooldown'))();
const database = require('../apis/database');

exports.run = async (client, msg) => {
    // if (msg.author.bot) return;
    const mentionanwsers = ["Stop mentioning me ! Im quite busy right now !", "Im not your girlfriend stop talking to me !", "Im not a toy im currently being cute so stop pinging me !"];

    if (msg.content.startsWith(COMMAND_PREFIX)) {
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
    } else if (msg.mentions.has(client.user)) {
        // console.log("I got mentionned !");
        // if (msg.author.id === process.env.OWNER_ID) msg.reply(await Nekos.owoify("What do you want master ?"));
        // else msg.reply(await Nekos.owoify(mentionanwsers[Math.floor(Math.random() * mentionanwsers.length)]));
    }
};