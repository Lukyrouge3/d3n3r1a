import {Command} from "../../command";
import {CommandInteraction, Permissions, TextChannel} from "discord.js";

const cmd = new Command('clear', 'Clears the desired number of messages', async (i: CommandInteraction) => {
    const count = i.options.getNumber("count");
    // @ts-ignore
    if (i.channel instanceof TextChannel) {
        await i.channel.bulkDelete(count);
        i.reply({content: "Messages cleared !", ephemeral: true});
    } else i.reply("Can't delete !");
});
cmd.data.addNumberOption(i => i.setName('count').setDescription('The number of messages to clear').setRequired(true).setMaxValue(100).setMinValue(1));
cmd.data.setDefaultPermission(false);
cmd.permissions.push('MANAGE_MESSAGES');
export default cmd;