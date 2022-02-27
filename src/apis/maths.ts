import sharp from "sharp";
import request from "snekfetch";

export async function processMathsImage(text: string, size = 1): Promise<Buffer> {
    const uri = "https://math.now.sh?color=white&alternateColor=black&from=" + encodeURIComponent(text);
    const data = (await request.get(uri)).raw;

    const metadata = await sharp(data).metadata();

    return await sharp(data).resize({
        width: metadata.width * 2,
        height: metadata.height * 2
    }).png().toBuffer()
}