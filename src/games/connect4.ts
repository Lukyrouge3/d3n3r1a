import {GuildMember, MessageActionRow, MessageButton, ThreadChannel, ThreadManager} from "discord.js";
import Long from "long";
import Bitboard from "./bitboard";

export default class Connect4 {
    public started = false;
    public players: GuildMember[];
    private board: Bitboard;
    private thread: ThreadChannel;

    constructor(players: GuildMember[], thread) {
        this.players = players;
        this.thread = thread;
    }

    move(index) {
        if (this.board.canMove(index)) this.board.move(index)
        return this.board.canMove(index);
    }

    start() {
        this.started = true;
        this.board = new Bitboard();
        this.draw();
    }

    draw() {
        let s = this.board.data[0].toString(2);
        s = "0".repeat(48 - s.length) + s;
        s = s.split("").reverse().join("");
        let str1 = [];
        for (let i = 5; i < s.length * 2; i += 7) {
            if (i > 47) {
                i -= 50;
                str1.push("\n");
            }
            if (i < 0) break;
            str1.push(s[i] == "1" ? "🔴" : "⬜");
        }
        s = this.board.data[1].toString(2);
        s = "0".repeat(48 - s.length) + s;
        s = s.split("").reverse().join("");
        let str2 = [];
        for (let i = 5; i < s.length * 2; i += 7) {
            if (i > 47) {
                i -= 50;
                str2.push("\n");
            }
            if (i < 0) break;
            str2.push(s[i] == "1" ? "🟡" : "⬜");

        }
        let str3 = "";
        for (let i = 0; i < str1.length; i++) {
            if (str1[i] == "🔴") str3 += "🔴";
            else if (str2[i] == "🟡") str3 += "🟡";
            else if (str2[i] == "\n") str3 += "\n";
            else str3 += "⬜";
        }

        const row = new MessageActionRow().addComponents(new MessageButton().setCustomId('1').setEmoji('one').setStyle('PRIMARY'));

        this.thread.send({content: str3, components: [row]});
    }
}

