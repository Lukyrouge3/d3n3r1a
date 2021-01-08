const rows = 6;
const cols = 7;
const yellow = "🟡";
const red = "🔴";
const empty = "⬛";

class Power4 {
    constructor() {
        this.initGrid();
    }

    initGrid() {
        this.grid = [];
        for (let x = 0; x < cols; x++) this.grid[x] = [];
    }

    get gridString() {
        let string = "";
        for (let y = rows-1; y >= 0; y--) {
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
        return string;
    }

    play(player, row) {
        this.grid[row][this.grid[row].length] = player;
    }
}

module.exports.game = Power4;
module.exports.name = "Power4";