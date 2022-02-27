import {Command} from "../../command";
import {CommandInteraction, GuildMember, TextChannel} from "discord.js";
import Connect4 from "../../games/connect4";

const cmd = new Command('connect4', 'Creates a new game of connect4', async (i: CommandInteraction) => {
    if (i.channel instanceof TextChannel) {
        let player = i.options.getMentionable('player');
        const thread = await i.channel.threads.create({
            // @ts-ignore
            name: `Connect4 - ${i.member.displayName} vs ${player.displayName}`,
            autoArchiveDuration: 60,
            reason: 'Connect4 Game'
        });
        await thread.join();
        // @ts-ignore
        const connect4 = new Connect4([i.member, player], thread);
        connect4.start();
    }
});
cmd.data.addMentionableOption(i => i.setName('player').setDescription('The player u want to face').setRequired(true));
cmd.data.setDefaultPermission(false);
export default cmd;