import {Command} from "../../command";
import config from "../../config";
import {getBalance} from "../../apis/firebase";
import {EmbedBuilder} from "discord.js";

const cmd = new Command('balance', `Get your current ${config.MONEY_NAME} amount.`, async i => {
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

cmd.data.addBooleanOption(option => option.setName('show').setDescription('Show the informations to others').setRequired(false));
cmd.data.addMentionableOption(option => option.setName('member').setDescription('The member to check the balance of').setRequired(false));
export default cmd;