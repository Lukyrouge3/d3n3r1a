const token = process.env.TOKEN;

const fs = require("fs");

const Discord = require('discord.js');
const Nekos = require('./apis/nekos');
const Kitsu = require('./apis/kitsu');

const channelToBroadcastTwitch = [{ guildId: '490955681197981715', channelId: '612355291010564104' },
{ guildId: '714232671089459282', channelId: '714232671840108568' }
];

module.exports.Bot = class Bot {
    constructor() {
        this.client = new Discord.Client();
        this.client.commands = new Discord.Collection();
        this.client.nsfw = [];
        this.client.events = new Discord.Collection();
        this.client.categories = {};

        this._loadCommands();

        Nekos.addcommands(this);

        this._loadEvents();

        this.client.login(token).then().catch(reason => console.log(reason));

        //Load needed apis
        Kitsu.setlast();
    }

    _loadCommands() {
        this._loadDir('./commands/')
    }

    _loadDir(path) {
        fs.readdir('./bot/' + path, { withFileTypes: true }, (err, files) => {
            if (err) return console.log(err);
            files.forEach(file => {
                if (file.isDirectory()) {
                    this._loadDir(path + file.name + '/');
                    return;
                }
                if (!file.name.endsWith('.js')) return;
                // console.log('Loading command:', path + `${file.name}`);
                let props = require(path + `${file.name}`);
                let commandName = file.name.split('.')[0];
                this.addCommand(props, commandName);
            });
        });
    }

    addCommand(props, cmdName, cat) {
        let category = cat || props.category;
        if (this.client.categories[category] === undefined) this.client.categories[category] = [];
        this.client.categories[category].push(cmdName);
        this.client.commands.set(cmdName, props);
    }

    _loadEvents() {
        fs.readdir('./bot/events/', (err, files) => {
            if (err) console.log(err);
            files.forEach(file => {
                let eventFunc = require(`./events/` + file);
                // console.log('Loading event:', `${file}`);
                let eventName = file.split(".")[0];
                this.client.on(eventName, (...args) => eventFunc.run(this.client, ...args));
            });
        });
    }

    async streamOnline() {
        // (await Bot.bot.client.guilds.fetch('490955681197981715')).channels.cache.get('793199464121630771').send("Skyloudlol is online here: https://www.twitch.tv/skyloudlol");
        // // (await Bot.bot.client.guilds.fetch('714232671089459282')).channels.cache.get('714232671840108568').send("Skyloudtv is online here: https://www.twitch.tv/skyloudlol");
        for (let e of channelToBroadcastTwitch) {
            this.client.guilds.cache.get(e.guildId).channels.cache.get(e.channelId).send('https://www.twitch.tv/skyloudlol is online ! ' + await Nekos.cat());
        }
        this.client.user.setActivity('https://www.twitch.tv/skyloudlol', { type: 'WATCHING' });
    }

    streamOffline() {
        this.client.user.setActivity(process.env.PREFIX, { type: 'WATCHING' });
    }

};