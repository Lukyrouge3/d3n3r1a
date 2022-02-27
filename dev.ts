// import Plot, {PlotData} from "./src/apis/plot";
//
// const d = [];
// // for (let i = 0; i <= 1000; i++) {
// //     d.push({x: i, y: i ** 2});
// //     d.push({x: -i, y: i ** 2});
// // }
//
// const step = 20 / 1000;
// for (let i = 0; i <= 1000; i++) {
//     const y = (-10 + step * i) ** 2
//     const x = (-10 + step * i);
//     d.push({x, y});
// }
// const data: PlotData = {
//     title: 'Dev plot',
//     height: 1000,
//     width: 1000,
//     dataSets: [{
//         label: 'Plot 1',
//         color: '#fff',
//         data: d
//     }]
// }
//
// const plot = Plot.generatePlot(data);
// plot.toPNG("dev.png");

import {getCommands} from "./src/apis/database";

const commands = getCommands();
console.log(commands);