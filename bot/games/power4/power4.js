const rows = 6;
const cols = 7;
const yellow = ":yellow_square:";
const red = ":red_square:";
const empty = "⬜";
const reacts = ["1⃣", "\u0032\u20E3", "\u0033\u20E3", "\u0034\u20E3", "\u0035\u20E3", "\u0036\u20E3", "\u0037\u20E3"];

class Power4 {
    constructor(players) {
        this.initGrid();
        this.currentMessage = null;
        this.name = "Connect 4";
        this.lastMove = [];
        this.lastPlayer;
        this.players = players;
    }

    async start(channel) {
        this.channel = channel;
        this.currentMessage = await this.channel.send(this.gridString(this.players[0]));
        for (let i = 0; i < reacts.length; i++) this.currentMessage.react(reacts[i]);
        // this.currentMessage.react
    }

    initGrid() {
        this.grid = [];
        for (let x = 0; x < cols; x++) this.grid[x] = [];
    }

    gridString(player) {
        let string = "";
        for (let y = rows - 1; y >= 0; y--) {
            for (let x = 0; x < cols; x++) {
                switch (this.grid[x][y]) {
                    case 0:
                        string += yellow;
                        break;
                    case 1:
                        string += red;
                        break;
                    default:
                        string += empty;
                }
            }
            string += "\n";
        }
        string += ":one::two::three::four::five::six::seven:";
        if (this.lastPlayer !== undefined && !this.isEnded()) string += "\nIt's " + player.username + "'s turn";
        return string;
    }

    async sendBoard(ply) {
        this.currentMessage = await this.channel.send(this.gridString(ply));
        if (!this.isEnded()) for (let i = 0; i < reacts.length; i++) this.currentMessage.react(reacts[i]);
    }

    async play(player, row) {
        if (this.grid[row].length + 1 <= 6) {
            this.grid[row][this.grid[row].length] = player;
            this.sendBoard(this.players[(player + 1) % 2]);
            this.lastMove = [row, this.grid[row].length - 1];
            this.lastPlayer = player;
            return true;
        }
        return false;
    }

    async event(player, emoji) {
        // console.log(player, emoji.name, reacts.indexOf(emoji.name));
        return await this.play(player, reacts.indexOf(emoji.name));
    }

    isEnded() {
        let row = this.lastMove[0];
        let col = this.lastMove[1];
        let hor1 = 0, hor2 = 0, ver1 = 0, diag1 = 0, diag2 = 0, diag3 = 0, diag4 = 0;
        //ROW
        while (this.grid[row + hor1][col] === this.lastPlayer) {
            hor1++;
            if (row + hor1 >= this.grid.length) break;
        }
        while (this.grid[row - hor2][col] === this.lastPlayer) {
            hor2++;
            if (row - hor2 < 0) break;
        }
        //COLS
        if (this.grid[row].length >= 4)
            while (this.grid[row][col - ver1] === this.lastPlayer) {
                ver1++;
            }
        //DIAGS
        while (this.grid[row + diag1][col + diag1] === this.lastPlayer) {
            diag1++;
            if (row + diag1 >= this.grid.length) break;
        }
        while (this.grid[row - diag2][col - diag2] === this.lastPlayer) {
            diag2++;
            if (row - diag2 < 0 || col - diag2 < 0) break;
        }
        while (this.grid[row + diag3][col - diag3] === this.lastPlayer) {
            diag3++;
            if (row + diag3 >= this.grid.length || col - diag3 < 0) break;
        }
        while (this.grid[row - diag4][col + diag4] === this.lastPlayer) {
            diag4++;
            if (row - diag4 < 0) break;
        }
        let hor = hor1 + hor2 - 1;
        let ver = ver1;
        let diag = Math.max(diag1 + diag2 - 1, diag3 + diag4 - 1);
        return Math.max(hor, ver, diag) >= 4;
    }
}

module.exports.game = Power4;
module.exports.name = "Power4";