import {Command} from "../../command";
import config from "../../config";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} from "discord.js";

function randomId() {
    return Math.random().toString(36).substr(2, 9);
}

const cmd = new Command('bet', `Bet an amount with the mentioned user.`, async i => {
    const target = i.options.getUser('member');
    const user = i.user;
    const amount = i.options.getNumber('amount');
    const game = i.options.getString('game');

    const betId = randomId();

    const embed = new EmbedBuilder();
    embed.setTitle(`Bet between ${user.username} and ${target.username}`);
    embed.setColor(0xfcba03);
    embed.setDescription(`<@${user.id}> bets ${amount} ${config.MONEY_SYMBOL} on ${game} against <@${target.id}>.`);
    embed.setFooter({text: `You can accept or decline the bet with the buttons below.`});

    const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("accept-" + betId).setLabel("Accept").setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId("decline-" + betId).setLabel("Decline").setStyle(ButtonStyle.Danger));

    const msg = await i.reply({embeds: [embed], components: [row]});

    const filter = (i2) => (i2.customId === "accept-" + betId || i2.customId === "decline-" + betId) && i2.user.id === target.id;
    const collector = msg.createMessageComponentCollector({filter, time: 3600000});
    collector.on('collect', async i2 => {
        if (i2.customId === "accept-" + betId) {
            embed.setColor(0x00FF00);
            embed.setFooter({text: `Bet accepted by ${i2.user.username}`});
            i.editReply({embeds: [embed], components: []});
            //TODO handle the actual bet .-sdnajkdsdop$
        } else {
            embed.setColor(0xff0000);
            embed.setFooter({text: `Bet declined.`});
            i.editReply({embeds: [embed], components: []});
        }
    });
});

cmd.data.addUserOption(option => option.setName('member').setDescription('The member to bet with').setRequired(true));
cmd.data.addNumberOption(option => option.setName('amount').setDescription('The amount to bet').setRequired(true));
cmd.data.addStringOption(option => option.setName('game').setDescription('The game to bet on').setRequired(true).addChoices({
    name: "Coinflip",
    value: "coinflip"
}));
export default cmd;