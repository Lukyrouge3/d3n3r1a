import {Canvas, CanvasRenderingContext2D, createCanvas} from 'canvas'
import {Chart, ChartData, ChartOptions, DatasetController, LineController} from "chart.js";
import * as fs from "fs";

class LineWithAxis extends LineController {
    draw() {
        // @ts-ignore
        super.draw(arguments);
        const ctx = this.chart.ctx;
        ctx.fillStyle = "#8b8b8b"
        ctx.strokeStyle = "#8b8b8b"
        ctx.beginPath();
        ctx.moveTo(213, 400);
        ctx.lineTo(213, 28);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(213, 32);
        ctx.lineTo(209, 39);
        ctx.lineTo(217, 39);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(0, 220);
        ctx.lineTo(400, 220);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(400, 220);
        ctx.lineTo(394, 224);
        ctx.lineTo(394, 216);
        ctx.fill();
        ctx.closePath();
    }

    static id = 'linewithaxis';
    static defaults = LineController.defaults;
}

Chart.register(LineWithAxis);

// export function generatePlot(data: ChartData, scales): Buffer {
//     const canvas = createCanvas(400, 400);
//     const ctx = canvas.getContext('2d');
//
//
//     const chart = new Chart(ctx, {
//         // @ts-ignore
//         type: 'linewithaxis',
//         data,
//         options: {
//             elements: {
//                 line: {
//                     borderColor: "#FFFFFF"
//                 },
//                 point: {
//                     radius: 0
//                 }
//             },
//             scales,
//         }
//     });
//
//     return canvas.toBuffer();
// }

export type DataSet = {
    label: string,
    color: string,
    data: { x: number, y: number }[]
}

export type PlotData = {
    title: string,
    dataSets: DataSet[],
    height?: number,
    width?: number
}

export default class Plot {

    private canvas: Canvas;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly height;
    private readonly width;
    public header;
    private data: PlotData;
    private scaleX;
    private scaleY;
    private maxX;
    private maxY;
    private lineWidth = 1;

    constructor(data: PlotData) {
        this.data = data;
        this.width = data.width || 1000;
        this.height = data.height || 1000;
        this.header = 50 * this.height / 400;

        this.canvas = createCanvas(this.width, this.height);
        this.ctx = this.canvas.getContext('2d');

        this.computeScales();
        this.generateAxis();
    }

    static generatePlot(data: PlotData) {
        const plot = new Plot(data);
        plot.drawTicks();
        plot.drawData();
        plot.drawTitle();
        return plot;
    }

    generateAxis() {
        const ctx = this.ctx;
        const lineWidth = 2 * this.width / 400;
        this.lineWidth = lineWidth;
        ctx.fillStyle = "#8b8b8b"
        ctx.strokeStyle = "#8b8b8b"

        this.line(0, 0, 0, this.height);
        this.line(0, this.height, this.width, this.height);
        this.line(this.width, this.height, this.width, 0);
        this.line(this.width, 0, 0, 0);

        ctx.lineWidth = lineWidth;

        this.line(this.width / 2, this.height, this.width / 2, this.header + 4);
        this.triangle(this.width / 2,
            this.header,
            this.width / 2 - lineWidth * 2,
            this.header + lineWidth * 3,
            this.width / 2 + lineWidth * 2,
            this.header + lineWidth * 3
        );
        this.line(0, this.height / 2, this.width - 4, this.height / 2);
        this.triangle(this.width,
            this.height / 2,
            this.width - lineWidth * 3,
            this.height / 2 + lineWidth * 2,
            this.width - lineWidth * 3,
            this.height / 2 - lineWidth * 2
        );
    }

    line(x1, y1, x2, y2) {
        const ctx = this.ctx;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    }

    triangle(x1, y1, x2, y2, x3, y3) {
        const ctx = this.ctx;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.fill();
        ctx.closePath();
    }

    drawData() {
        const dataSets: DataSet[] = this.data.dataSets;
        const ctx = this.ctx;

        for (let ds of dataSets) {
            ctx.strokeStyle = ds.color;
            ctx.beginPath();
            ds.data.sort((a, b) => a.x < b.x ? -1 : 1);
            const start = this.computePos(ds.data[0].x, ds.data[0].y)
            ctx.moveTo(start.x, start.y);
            for (let i = 1; i < ds.data.length; i++) {
                let d = this.computePos(ds.data[i].x, ds.data[i].y);
                ctx.lineTo(d.x, d.y);
            }
            ctx.stroke();
            ctx.closePath();
        }
    }

    computeScales() {
        let maxX = 0;
        let maxY = 0;
        this.data.dataSets.forEach(ds => {
            maxX = Math.max(maxX, ...ds.data.map(d => d.x));
            maxY = Math.max(maxY, ...ds.data.map(d => d.y));
        });
        this.scaleX = (this.width * .9) / maxX / 2;
        this.scaleY = (this.height - this.header * 2) / maxY / 2;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    computePos(x, y): { x: number, y: number } {
        x = this.width / 2 + x * this.scaleX;
        y = this.height / 2 - y * this.scaleY;

        return {x, y}
    }

    drawTicks() {
        this.ctx.lineWidth = this.lineWidth / 2;
        this.ctx.font = `${this.width / 50}px Arial`;
        this.ctx.textAlign = "center";

        this.VTick(this.maxX / 3);
        this.VTick(this.maxX / 3 * 2);
        this.VTick(this.maxX);
        this.VTick(-this.maxX / 3);
        this.VTick(-this.maxX / 3 * 2);
        this.VTick(-this.maxX);

        this.ctx.textAlign = "left";
        this.HTick(this.maxY / 3);
        this.HTick(this.maxY / 3 * 2);
        this.HTick(-this.maxY / 3);
        this.HTick(-this.maxY / 3 * 2);
        this.HTick(-this.maxY);

    }

    private VTick(value) {
        let pos = this.computePos(value, 0);
        this.line(pos.x, pos.y - this.lineWidth - 4, pos.x, pos.y + this.lineWidth + 4);
        this.ctx.fillText(value.toFixed(2), pos.x, pos.y + this.lineWidth + 20);
    }

    private HTick(value) {
        let pos = this.computePos(0, value);
        this.line(pos.x - this.lineWidth - 4, pos.y, pos.x + this.lineWidth + 4, pos.y);
        this.ctx.fillText(value.toFixed(2), pos.x + this.lineWidth + 10, pos.y + this.width / 100);
    }

    drawTitle() {
        this.ctx.font = `${this.width / 25}px Arial`;
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#fff"
        this.ctx.fillText(this.data.title, this.width/2, this.header/2 - this.width / 50 + 5);
    }

    toPNG(file) {
        fs.writeFileSync(file, this.canvas.toBuffer());
    }

    toBuffer() {
        return this.canvas.toBuffer();
    }
}