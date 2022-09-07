import {Command} from "../../command";
import {ChatInputCommandInteraction, CommandInteraction, Permissions, TextChannel} from "discord.js";

const cmd = new Command('clear', 'Clears the desired number of messages', async (i: ChatInputCommandInteraction) => {
    const count = i.options.getNumber("count");
    // @ts-ignore
    if (i.channel instanceof TextChannel) {
        try {
            await i.channel.bulkDelete(count);
            i.reply({content: "Messages cleared !", ephemeral: true});
        } catch (e) {
            const r = await i.reply({
                content: "Can't bulk delete (messages older than 14days), clearing them 1 by 1.",
                ephemeral: true,
                fetchReply: true
            });
            const messages = await i.channel.messages.fetch({limit: count})
            messages.forEach(m => m.delete());
        }
    } else i.reply("Can't delete !");
});
cmd.data.addNumberOption(i => i.setName('count').setDescription('The number of messages to clear').setRequired(true).setMaxValue(100).setMinValue(1));
cmd.data.setDefaultPermission(false);
cmd.permissions.push('MANAGE_MESSAGES');
export default cmd;