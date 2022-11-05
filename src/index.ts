import {isNSFWChannel} from "./helpers";
import {deploy} from "./commands_deployer";
import {REST} from '@discordjs/rest';
import {ActivityType, Client, Collection, GuildMember, IntentsBitField} from "discord.js";
import {addCommand} from "./apis/firebase";

require('dotenv').config(); // DOTENV setup
require('./web.ts');

console.time("Time to start");

class CustomClient extends Client {
    public commands: Collection<string, any>;

    constructor(options) {
        super(options);
    }
}

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);
const client = new CustomClient({
    intents: [IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.GuildIntegrations,
    ], allowedMentions: {parse: ['roles', "everyone"]}
});

(async () => {
    console.log('Started deploying commands.');

    await deploy(rest, client);
    console.log(`Successfully loaded ${client.commands.size} commands.`);

})();


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    if (process.env.DEV_ENVIRONNEMENT == "True") {
        console.log("DEVELOPMENT ENVIRONNEMENT !");
        client.user.setActivity("in development", {type: ActivityType.Playing});
        client.user.setStatus("dnd");
    } else client.user.setActivity("Made with ❤ by @Lukyrouge", {type: ActivityType.Listening});
    console.timeEnd("Time to start");
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;
    // if (process.env.DEV_ENVIRONNEMENT == "False") {
    // Datetime, member, guild, command

    // }

    try {
        // if (!interaction.options.getBoolean("private", false) && command.isNSFW && !await isNSFWChannel(interaction)) return;
        await command.execute(interaction);
        if (interaction.member instanceof GuildMember)
            addCommand(interaction.commandName, interaction.guild.id, interaction.member.id, null);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
});

client.login(process.env.TOKEN);