const Bot = require('../../app').Bot;

class Game {
    constructor(client, players, game, channel) {
        this.players = players;
        this.game = game;
        this.channel = channel;
        this.started = false;
        this.currentMessage = null;
        this.client = client;
        this.members = [];
        for (let i = 0; i < players.length; i++) {
            this.members.push(players[i].id);
        }
        this.currentPlayer = this.players[0];
    }

    start() {
        this.started = true;
        let playersList = "";
        for (let i = 0; i < this.players.length; i++) playersList += this.players[i].username + " ";
        this.channel.send(this.game.name + " starting with " + playersList);
        this.game.start(this.channel);
        this.client.on('messageReactionAdd', async (msgReaction, user) => {
            // console.log(this.game.currentMessage.id, msgReaction.message.id, this.currentPlayer,this.members.indexOf(msgReaction.message.author.id), msgReaction.message.member.id, this.members);
            if (this.game.currentMessage.id === msgReaction.message.id && this.currentPlayer.id === user.id) {
                if (await this.game.event(this.players.indexOf(this.currentPlayer), msgReaction.emoji)) {
                    if (this.game.isEnded()) {
                        this.end();
                    } else this.currentPlayer = this.players[(this.players.indexOf(this.currentPlayer) + 1) % this.players.length];
                    // console.log(this.currentPlayer);
                } else this.channel.send('You can\'t play this move');
            }
        });
    }

    end() {
        this.channel.send(this.currentPlayer.username + " won the game !!!");
    }
}

module.exports = Game;