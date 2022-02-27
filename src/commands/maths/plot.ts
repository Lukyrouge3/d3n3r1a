import {CommandInteraction} from "discord.js";
import {Command} from "../../command";
import nerdamer from "nerdamer/all.min"
import Plot, {PlotData} from "../../apis/plot";

const cmd = new Command('plot', 'Plots an expression (WIP)', (i: CommandInteraction) => {
    let input = i.options.getString("expression");
    const a = i.options.getNumber("a", false) || -10;
    const b = i.options.getNumber("b", false) || 10;

    if (input.indexOf("y") == -1) {
        if (input.indexOf("=") == -1) {
            input = "y = " + input;
        } else {
            i.reply(`Malformed function: ${input}`);
            return;
        }
    }

    const solutions = nerdamer.solve(input, 'y').toString().replace('[', '').replace(']', '').split(',');
    const data = [];
    const pointCount = 100;
    for (let solution of solutions) {
        solution = nerdamer(solution);
        const step = (b - a) / pointCount;
        for (let i = 0; i <= pointCount; i++) {
            const y = parseFloat(solution.evaluate({x: a + step * i}).text());
            const x = (a + step * i);
            data.push({x, y});
        }
    }

    const plotData: PlotData = {
        title: input,
        height: 1000,
        width: 1000,
        dataSets: [{
            label: '',
            color: '#fff',
            data
        }]
    }
    console.log(data);
    const plot = Plot.generatePlot(plotData);

    i.reply({
        content: `Done !`,
        files: [{
            attachment: plot.toBuffer(), name: "chart.png"
        }]
    });
});

cmd.data.addStringOption(i => i.setName('expression').setDescription("The expression to plot").setRequired(true))
cmd.data.addNumberOption(i => i.setName('a').setDescription("The limit a (default: -1)").setRequired(false))
cmd.data.addNumberOption(i => i.setName('b').setDescription("The limit b (default: 1)").setRequired(false))

export default cmd;