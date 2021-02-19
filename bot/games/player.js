class Player {

    constructor(id, username, scores, lastGame) {
        this.id = id;
        this.username = username;
        this.scores = scores;
        this.lastGame = lastGame;
        this.currentGame = null;
    }

    addWin(game) {
        this.scores[game].wins++;
    }

    addLose(game) {
        this.scores[game].loses++;
    }

    winRate(game) {
        return this.scores[game].wins / (this.scores[game].wins + this.scores[game].loses);
    }
}

module.exports = Player;