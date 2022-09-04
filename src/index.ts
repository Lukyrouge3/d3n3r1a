import {isNSFWChannel} from "./helpers";
import {deploy} from "./commands_deployer";
import {REST} from '@discordjs/rest';
import {Client, Collection, GuildMember, Intents} from "discord.js";
import {ApplicationCommandPermissionTypes} from "discord.js/typings/enums";
import {addCommand} from "./apis/database";

require('dotenv').config(); // DOTENV setup
require('./web.ts');

console.time("Time to start");

if (process.env.DEV_ENVIRONNEMENT == "True") console.log("DEVELOPMENT ENVIRONNEMENT !");

class CustomClient extends Client {
    public commands: Collection<string, any>;

    constructor(options) {
        super(options);
    }
}

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);
const client = new CustomClient({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]});

(async () => {
    console.log('Started deploying commands.');

    await deploy(rest, client);

    console.log(`Successfully loaded ${client.commands.size} commands.`);

})();


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // client.commands.filter(cmd => cmd.permissions.length > 0).forEach(cmd => {
    //     client.guilds.cache.each(async g => {
    //         (await (g.commands.fetch())).filter(c => c.name === cmd.data.name).each(c => {
    //             cmd.permissions.forEach(p => {
    //                 let roles = g.roles.cache.filter(r => r.permissions.has(p));
    //                 roles.each(r => c.permissions.add({
    //                     permissions: [{
    //                         type: ApplicationCommandPermissionTypes.ROLE,
    //                         permission: true,
    //                         id: r.id
    //                     }]
    //                 }))
    //             });
    //         })
    //     });
    // });
    //DEPRECATED !

    console.timeEnd("Time to start");
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;
    if (process.env.DEV_ENVIRONNEMENT == "False") {
        // Datetime, member, guild, command
        if (interaction.member instanceof GuildMember)
            addCommand(interaction.member.id, interaction.guild.id, interaction.commandName);
    }

    try {
        if (!interaction.options.getBoolean("private", false) && command.isNSFW && !await isNSFWChannel(interaction)) return;
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
});

client.login(process.env.TOKEN);