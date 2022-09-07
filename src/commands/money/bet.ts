import {Command} from "../../command";
import config from "../../config";
import {getBalance} from "../../apis/firebase";
import {EmbedBuilder} from "discord.js";

const cmd = new Command('bet', `Bet an amount with the mentioned user.`, async i => {
    // TODO
});

cmd.data.addUserOption(option => option.setName('member').setDescription('The member to bet with').setRequired(true));
cmd.data.addNumberOption(option => option.setName('amount').setDescription('The amount to bet').setRequired(true));
cmd.data.addStringOption(option => option.setName('game').setDescription('The game to bet on').setRequired(true).addChoices({
    name: "Coinflip",
    value: "coinflip"
}));
export default cmd;