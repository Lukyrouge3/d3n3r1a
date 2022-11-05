import {Command} from "../../command";
import {ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import moment from "moment";

const cmd = new Command('amongus', 'Organizes a among us meeting', async (i:ChatInputCommandInteraction) => {
    let when = i.options.getString('when');
    const everyone = i.options.getBoolean('everyone');

    if (when === "now") when = undefined;
    else if (when.match(/([01]?[0-9]|2[0-3]):[0-5][0-9]/)) when = `${moment().format('YYYY-MM-DD')} ${when}`;
    const time = moment(when);

    const embed = new EmbedBuilder();
    embed.setTitle('Among Us Meeting');
    embed.setFields([{name: 'When', value: time.format('YYYY-MM-DD HH:mm')}, {
        name: 'How to ?',
        value: 'To participate, react to this message with :white_check_mark:'
    }]);
    embed.setColor(0x00FF00);
    // @ts-ignore
    embed.setFooter({text: `Organized by ${i.member.displayName}`, iconURL: i.member.avatarURL()});
    embed.setTimestamp(new Date());

    const role = i.guild.roles.cache.find(r => r.name === 'Among us');

    const msg = await i.reply({content: everyone ? "@everyone" : role ? `<@&${role.id}>` : "", fetchReply: true , embeds: [embed]});
    await msg.react('✅');
});

cmd.data.addStringOption(o => o.setName('when').setDescription('When the gaming should take place.').setRequired(true));
cmd.data.addBooleanOption(o => o.setName('everyone').setDescription('If everyone should be pinged.'));

export default cmd;
