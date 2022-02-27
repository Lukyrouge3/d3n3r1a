import request from "snekfetch";
import {Command} from "../command";
import {CommandInteraction, GuildMember, MessageEmbed} from "discord.js";
import {capitalize} from "../helpers";

const NSFW = ['femdom', 'classic', 'erofeet', 'erok', 'les', 'hololewd', 'lewdk', 'keta', 'feetg', 'nsfw_neko_gif', 'eroyuri', 'kuni', 'tits', 'pussy_jpg', 'cum_jpg', 'pussy', 'lewdkemo', 'lewd', 'cum', 'spank', 'smallboobs', 'nsfw_avatar', 'boobs', 'solog', 'bj', 'yuri', 'anal', 'blowjob', 'holoero', 'gasm', 'hentai', 'ero', 'solo', 'pwankg', 'eron', 'erokemo'];
const SFW = ['tickle', 'hug', 'ngif', 'meow', 'poke', 'kiss', 'slap', 'cuddle', 'fox_girl', 'gecg', 'pat', 'smug', 'kemonomimi', 'holo', 'woof', 'baka', 'feed', 'neko', 'waifu', 'avatar'];

export async function cat() {
    return (await request.get('https://nekos.life/api/v2/cat')).body.cat;
}

export async function owoify(text) {
    return (await request.get('https://nekos.life/api/v2/owoify?text=' + text)).body.owo;
}

export async function fact() {
    return (await request.get('https://nekos.life/api/v2/fact')).body.fact;
}

export async function name() {
    return (await request.get('https://nekos.life/api/v2/name')).body.name;
}

function generateCommand(str: string, nsfw = false): Command {
    let c = new Command(str.toLowerCase(), `Sends a ${str}!`, execute, NSFW.find(n => n === str) != undefined);
    if (nsfw) c.data.addBooleanOption(o => o.setName("private").setDescription("Is the command private or not").setRequired(false));
    else c.data.addMentionableOption(i => i.setName('target').setDescription("The person to send this to").setRequired(false));
    return c;
}

async function execute(interaction: CommandInteraction) {
    request.get('https://nekos.life/api/v2/img/' + interaction.commandName).then(async r => {
        let target = interaction.options.getMentionable('target', false);

        let embed = new MessageEmbed().setDescription(`**Here is for u ${target instanceof GuildMember ? target.toString() : 'Master'} !**`).setImage(r.body.url).setColor(0xFFFFFF);
        await interaction.reply({embeds: [embed], ephemeral: interaction.options.getBoolean("private", false)});
    });
}

export function generateAllNekosCommands() {
    const commands = [];
    if (process.env.NSFW == "True") NSFW.forEach(n => commands.push(generateCommand(n, true)));
    SFW.forEach(n => commands.push(generateCommand(n)));
    return commands;
}