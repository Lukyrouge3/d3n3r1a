import * as fs from "fs";
import {Collection} from "discord.js";
import {Routes} from "discord-api-types/v10";
import {generateAllNekosCommands} from "./apis/nekos";

function loadDir(dir) {
    let commands = [];
    let files = fs.readdirSync('./src/' + dir, {withFileTypes: true});
    // if (err) return console.log(err);
    files.forEach(file => {
        if (file.isDirectory()) {
            loadDir(dir + file.name + '/').forEach(c => commands.push(c));
        } else {
            let c = require(`.${dir}${file.name}`);
            commands.push(c.default);
        }
    });
    return commands;
}

export async function deploy(rest, client) {
    let commands = loadDir('/commands/');
    generateAllNekosCommands().forEach(c => commands.push(c));
    client.commands = new Collection();
    commands.forEach(c => client.commands.set(c.data.name, c));
    try {
        if (process.env.DEV_ENVIRONNEMENT == "True")
            await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, '490955681197981715'), {body: commands.map(c => c.data.toJSON())});
        else await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {body: commands.map(c => c.data.toJSON())});
    } catch (error) {
        console.error(error);
    }
}