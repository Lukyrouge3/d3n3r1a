import {Command} from "../../command";
import config from "../../config";
import {getBalance} from "../../apis/firebase";
import {EmbedBuilder} from "discord.js";

const cmd = new Command('bet', `Bet an amount with the mentioned user.`, async i => {
    const show = i.options.getBoolean('show');
    const target = i.options.getMentionable('member');

    const embed = new EmbedBuilder();
    embed.setTitle("Balance");
    embed.setColor(0x00ff00);
    if (!target) {
        const balance = await getBalance(i.member.id);
        embed.setDescription(`Your current balance is ${balance} ${config.MONEY_SYMBOL}.`);
    } else {
        const balance = await getBalance(target.id);
        embed.setDescription(`${target.displayName}'s current balance is ${balance} ${config.MONEY_SYMBOL}.`);
    }
    i.reply({embeds: [embed], ephemeral: !show});
});

cmd.data.addMentionableOption(option => option.setName('member').setDescription('The member to bet with').setRequired(true));
cmd.data.addNumberOption(option => option.setName('amount').setDescription('The amount to bet').setRequired(true));
cmd.data.addStringOption(option => option.setName('game').setDescription('The game to bet on').setRequired(true).addChoices({
    name: "Coinflip",
    value: "coinflip"
}));
export default cmd;