import {Command} from "../../command";
import {CommandInteraction} from "discord.js";
import {processMathsImage} from "../../apis/maths";
import nerdamer from "nerdamer/all.min";


const cmd = new Command('integrate', 'Integrates the given expression.', async (i: CommandInteraction) => {
    const input = i.options.getString("expression");
    const val = i.options.getString("var", false) || "x";
    const a = i.options.getString("a", false);
    const b = i.options.getString("b", false);
    let solution = nerdamer.integrate(input, val), equation;
    if (a && b) {
        solution = `${solution.sub(val, b).text()} - ${solution.sub(val, a).text()}`;
        solution = nerdamer(solution).evaluate().text();
    } else solution = nerdamer.convertToLaTeX(solution).text();
    equation = nerdamer.convertToLaTeX(nerdamer(input).text()).toString();

    const text = a && b ? `\\int_{${a}}^{${b}} ${equation} \\,d${val} = ${solution}` : `\\int ${equation} \\,d${val} = ${solution}`;

    const img = await processMathsImage(text, 2);

    i.reply({content: `Computed UwU !`, files: [{attachment: img, name: "chart.png"}]})
});

cmd.data.addStringOption(i => i.setName('expression').setDescription("The expression to integrate").setRequired(true))
cmd.data.addStringOption(i => i.setName('var').setDescription("The variable to use").setRequired(false))
cmd.data.addStringOption(i => i.setName('a').setDescription("The limit a").setRequired(false))
cmd.data.addStringOption(i => i.setName('b').setDescription("The limit b").setRequired(false))

export default cmd;