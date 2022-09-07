import {Command} from "../../command";
import {EmbedBuilder} from "discord.js";

const gifs = ["https://c.tenor.com/kK8D7hQXX5wAAAAC/coins-tails.gif", "https://c.tenor.com/nEu74vu_sT4AAAAC/heads-coinflip.gif"]

export default new Command('coinflip', 'Flips a coin', i => {
    const head = Math.random() > 0.5;
    const embed = new EmbedBuilder().setImage(gifs[head ? 1 : 0]).setTitle("Coinflip")
        .setDescription(`The coin landed on ${head ? "heads" : "tails"}`);
    i.reply({embeds: [embed]});
});