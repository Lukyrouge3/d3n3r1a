import {Command} from "../../command";
import config from "../../config";
import {adminPay, getBalance, getLastPayday, getMemberCommands, paycheck} from "../../apis/firebase";
import {EmbedBuilder} from "discord.js";

export default new Command('payday', `Get your current daily paycheck`, async i => {
    const lastPayday = await getLastPayday(i.member.id);
    if (lastPayday.length == 0 || lastPayday[0].data().time.seconds < Math.floor(Date.now() / 1000) - 86400) {
        await paycheck(i.member.id);
        const embed = new EmbedBuilder();
        embed.setTitle("Payday");
        embed.setColor(0x00ff00);
        embed.setDescription(`You received ${config.DEFAULT_PAYCHECK} ${config.MONEY_SYMBOL}.`);
        embed.setFooter({text: `Your current balance is ${await getBalance(i.member.id)} ${config.MONEY_SYMBOL}.`});
        i.reply({embeds: [embed], ephemeral: true});
    } else {
        const embed = new EmbedBuilder();
        embed.setTitle("Payday");
        embed.setColor(0xff0000);
        embed.setDescription(
            `You already received your daily paycheck.`
            + `\n You can receive it again in ${timeUntilNextPayday(lastPayday.length != 0 ? lastPayday[0].data().time.seconds : Date.now() / 1000)}.`
        );
        i.reply({embeds: [embed], ephemeral: true});
    }
});

function timeUntilNextPayday(lastPayday: number) {
    const now = (lastPayday + 86400) * 1000;
    // Format in 00h 00m 00s
    const hours = Math.floor((now - Date.now()) / 1000 / 60 / 60);
    const minutes = Math.floor((now - Date.now()) / 1000 / 60) % 60;
    const seconds = Math.floor((now - Date.now()) / 1000) % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
}