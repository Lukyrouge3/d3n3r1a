class Game {
    constructor(players, game, channel) {
        this.players = players;
        this.game = game;
        this.channel = channel;
        this.started = false;
    }

    start() {
        this.started = true;
        let playersList = "";
        for (let p in this.players) playersList += p.username + " ";
        this.channel.send(this.game.name + " starting with " + playersList)
    }
}