let Power4 = require('../../games/power4/power4').game;
let Game = require('../../games/game');
let Player = require('../../games/player');

exports.run = async (client, msg, args) => {
    let players = [];
    players.push(new Player(msg.author.id, msg.author.username, [], 0));
    players.push(new Player(msg.mentions.members.first().user.id, msg.mentions.members.first().user.username, [], 0));
    let game = new Game(client, players, new Power4(players), msg.channel);
    game.start();
};

exports.help = ".";
exports.category = "Games";