const token = process.env.TOKEN;

const fs = require("fs");

const Discord = require('discord.js');

const Nekos = require('./apis/nekos');

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
  }

  _loadCommands() {
    fs.readdir('./commands/', (err, files) => {
      if (err) return console.log(err);
      files.forEach(file => {
        if (!file.endsWith('.js')) return;

        let props = require(`./commands/${file}`);

        let commandName = file.split('.')[0];
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
    fs.readdir('./events/', (err, files) => {
      if (err) console.log(err);
      files.forEach(file => {
        let eventFunc = require(`./events/${file}`);

        let eventName = file.split(".")[0];
        this.client.on(eventName, (...args) => eventFunc.run(this.client, ...args));
      });
    });
  }

};