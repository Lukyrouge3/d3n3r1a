import {Command} from "../../command";
import {ChatInputCommandInteraction, CommandInteraction, EmbedBuilder, Message} from "discord.js";

const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣"];

const cmd = new Command('vote', 'Starts a vote', async (i: ChatInputCommandInteraction) => {
    const question = i.options.getString("question");
    const option1 = i.options.getString("option1");
    const option2 = i.options.getString("option2");
    const option3 = i.options.getString("option3");
    const option4 = i.options.getString("option4");
    const timeout = i.options.getNumber("timeout");
    const image = i.options.getBoolean("image");


    const options = [option1, option2, option3, option4].filter(o => o != null);
    const time = getTimeInXSeconds(timeout != null ? timeout : 300);

    const votes = new Array(options.length).fill(0);


    const imagesEmbeds = [];
    if (image) {
        options.forEach((o, i) => {
            imagesEmbeds.push(new EmbedBuilder().setURL("https://deneria.net/").setImage(o).setTitle(question).setFooter({text: "You can click the image to see it in full size"}));
            options[i] = `Image ${i + 1}`;
        });

    }
    const embed = update(question, votes, options, time);

    // @ts-ignore
    const msg: Message = await i.reply({embeds: [...imagesEmbeds, embed], fetchReply: true});
    options.forEach((o, i) => msg.react(emojis[i]));

    const collector = msg.createReactionCollector({
        filter: (r, u) => emojis.includes(r.emoji.name) && !u.bot,
        time: 1000 * timeout,
        dispose: true
    });
    collector.on('collect', (r, u) => {
        votes[emojis.indexOf(r.emoji.name)]++;
        const embed = update(question, votes, options, time);
        msg.edit({embeds: [...imagesEmbeds, embed]});
    });
    collector.on("remove", (r, u) => {
        votes[emojis.indexOf(r.emoji.name)]--;
        const embed = update(question, votes, options, time);
        msg.edit({embeds: [...imagesEmbeds, embed]});
    });
    collector.on("end", () => {
        const embed = update(question, votes, options, time);
        embed.footer.text = "Vote ended !";
        msg.edit({embeds: [...imagesEmbeds, embed]});
    });
});

function update(question, votes, options, time) {
    const total = votes.reduce((a, b) => a + b, 0);
    return {
        title: question,
        // description: options.map((o, i) => `${i + 1} - ${o}`).join("\n")
        //     + "\n\n**Results** :" + options.map((o, i) => `\n${i + 1} - ${progressBar(total != 0 ? votes[i] / total * 100 : 0)}`).join("\n")
        //     + `\n\n${total} votes collected - Vote ends at ${time}`,
        fields: [
            {
                name: "Options",
                value: options.map((o, i) => `${i + 1} - ${o}`).join("\n")
            },
            {
                name: "Results",
                value: options.map((o, i) => `${i + 1} - ${progressBar(total != 0 ? votes[i] / total * 100 : 0)}`).join("\n") + `\n\n${total} votes collected - Vote ends at ${time}`
            }
        ],
        footer: {
            text: "Vote by reacting to this message !"
        }
    };
}

function getTimeInXSeconds(x: number) {
    const d = new Date();
    d.setSeconds(d.getSeconds() + x);
    // Format like 12:00:00
    return d.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false});
}

function progressBar(percent: number) {
    const progress = Math.floor(percent / 100 * 15);
    const emptyProgress = 15 - progress;
    return `${"▓".repeat(progress)}${"░".repeat(emptyProgress)} - ${percent}%`;
}

cmd.data.addStringOption(i => i.setName('question').setDescription('The question').setRequired(true));
cmd.data.addStringOption(i => i.setName('option1').setDescription('The first option').setRequired(true));
cmd.data.addStringOption(i => i.setName('option2').setDescription('The second option').setRequired(true));
cmd.data.addStringOption(i => i.setName('option3').setDescription('The third option').setRequired(false));
cmd.data.addStringOption(i => i.setName('option4').setDescription('The fourth option').setRequired(false));
cmd.data.addNumberOption(i => i.setName('timeout').setDescription('The amount (in seconds) of time to vote (default: 300)').setRequired(false));
cmd.data.addBooleanOption(i => i.setName("image").setDescription("Whether to consider the options as images or not").setRequired(false));
cmd.data.setDefaultPermission(false);
cmd.permissions.push('MANAGE_MESSAGES');
export default cmd;