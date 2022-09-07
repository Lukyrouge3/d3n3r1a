import {Command} from "../../command";
import config from "../../config";
import {addBalance, getBalance, pay, roundNumber, setBalance} from "../../apis/firebase";
import {EmbedBuilder} from "discord.js";

const cmd = new Command('pay', `Pay the amount to the mentioned member`, async i => {
    const target = i.options.getMentionable('member');
    const amount = roundNumber(i.options.getNumber('amount'));

    const balance = await getBalance(i.member.id);

    const embed = new EmbedBuilder();
    embed.setTitle("Payement failed !");
    embed.setColor(0xff0000);

    if (target.id == i.member.id) {
        embed.setDescription(`You can't pay yourself.`);
        i.reply({embeds: [embed]});
        return;
    }

    if (amount > balance) {
        embed.setDescription(`You don't have enough ${config.MONEY_NAME} to pay that amount.`);
        i.reply({embeds: [embed]});
        return;
    }

    if (amount < 0) {
        embed.setDescription(`You can't pay a negative amount.`);
        i.reply({embeds: [embed]});
        return;
    }

    embed.setColor(0x00ff00);
    embed.setTitle("Payement successful !");
    embed.setDescription(`You paid ${amount} ${config.MONEY_SYMBOL} to ${target.displayName}.`);
    embed.setFooter({text: `Your new balance is ${roundNumber(balance - amount)} ${config.MONEY_SYMBOL}.`});

    await pay(i.member.id, target.id, amount);

    await i.reply({embeds: [embed], ephemeral: true});

    const targetEmbed = new EmbedBuilder();
    targetEmbed.setTitle("You received a payement !");
    targetEmbed.setColor(0x00ff00);
    targetEmbed.setDescription(`You received ${amount} ${config.MONEY_SYMBOL} from ${i.member.displayName}.`);
    targetEmbed.setFooter({text: `Your new balance is ${roundNumber(await getBalance(target.id))} ${config.MONEY_SYMBOL}.`});

    await target.send({embeds: [targetEmbed]});
});

cmd.data.addMentionableOption(option => option.setName('member').setDescription('The member to pay to').setRequired(true));
cmd.data.addNumberOption(option => option.setName('amount').setDescription('The amount to pay').setRequired(true));

export default cmd;