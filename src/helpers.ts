import {
    CacheType,
    CommandInteraction,
    TextChannel
} from "discord.js";

export async function isNSFWChannel(interaction: CommandInteraction<CacheType>): Promise<boolean> {
    if (interaction.channel instanceof TextChannel && !interaction.channel.nsfw) {
        await interaction.reply("This channel is not suited for NSFW ! (You can try to use the same command with private enabled.");
        return false;
    }
    return true;
}

export function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}