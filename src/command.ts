import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandInteraction} from "discord.js";

export class Command {
    public data: SlashCommandBuilder;
    public isNSFW: boolean;
    public execute: (interaction: CommandInteraction) => void;
    public permissions: string[];

    constructor(name: string, description: string, execute, isNSFW = false, permissions = [], isDefault = true) {
        this.data = new SlashCommandBuilder().setName(name).setDescription(description).setDefaultPermission(isDefault);
        this.execute = execute;
        this.isNSFW = isNSFW;
        this.permissions = permissions;
    }
}