import {Command} from "../../command";
import nerdamer from "nerdamer/all.min"
import {CommandInteraction} from "discord.js";
import request from "snekfetch";
import sharp from "sharp";
import {processMathsImage} from "../../apis/maths";

const cmd = new Command('solve', 'Solves a given equation', async (i: CommandInteraction) => {
    const input = i.options.getString("equation");
    const a = i.options.getString("var", false) || "x";
    const solution = nerdamer.convertToLaTeX(nerdamer.solve(input, a).text()).replace('(', '\\{').replace(')', '\\}');
    let equation = nerdamer.convertToLaTeX(nerdamer(input).text()).toString();
    if (equation.indexOf('=') == -1) equation += " = 0";
    const text = `${equation} \\Leftrightarrow ${a} \\in ${solution}`;
    const img = await processMathsImage(text, 2);

    i.reply({
        content: `Found ! (Solving for *${a}*)`,
        files: [{
            attachment: img, name: "chart.png"
        }]
    });
});

cmd.data.addStringOption(i => i.setName('equation').setDescription("The equation to solve").setRequired(true));
cmd.data.addStringOption(i => i.setName('var').setDescription("The variable to solve for").setRequired(false))

export default cmd;