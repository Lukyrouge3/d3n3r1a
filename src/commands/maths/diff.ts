import {Command} from "../../command";
import {CommandInteraction} from "discord.js";
import {processMathsImage} from "../../apis/maths";
import nerdamer from "nerdamer/all.min"


const cmd = new Command('diff', 'Differentiate the given expression.', async (i: CommandInteraction) => {
    const input = i.options.getString("expression");
    const a = i.options.getString("var", false) || "x";
    const solution = nerdamer.convertToLaTeX(nerdamer.diff(input, a).text());
    const equation = nerdamer.convertToLaTeX(nerdamer(input).text()).toString();

    const text = `\\frac{d(${equation})}{d${a}} = ${solution}`;

    const img = await processMathsImage(text, 2);

    i.reply({content: `Computed UwU ! (Solving for *${a}*)`, files: [{attachment: img, name: "chart.png"}]})
});

cmd.data.addStringOption(i => i.setName('expression').setDescription("The expression to differentiate").setRequired(true))
cmd.data.addStringOption(i => i.setName('var').setDescription("The variable to use").setRequired(false))

export default cmd;