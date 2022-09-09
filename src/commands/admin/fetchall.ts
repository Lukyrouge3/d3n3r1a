import {Command} from "../../command";
import {ChatInputCommandInteraction, CommandInteraction, Permissions, TextChannel} from "discord.js";
import fs from "fs";

const cmd = new Command('fetchall', 'Count and store all messages from a channel', async (i: ChatInputCommandInteraction) => {
    let time = Date.now();
    let messages = [];
    i.reply({content: "Fetching messages...", ephemeral: true});

    // Create message pointer
    let message = await i.channel.messages
        .fetch({limit: 1})
        .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));

    while (message) {
        await i.channel.messages
            .fetch({limit: 100, before: message.id})
            .then(messagePage => {
                messagePage.forEach(msg => {
                    messages.push({
                        id: msg.id,
                        createdTimestamp: msg.createdTimestamp,
                        content: msg.content,
                        authorId: msg.author.id,
                        embeds: msg.embeds,
                        attachments: msg.attachments,
                        editedTimestamp: msg.editedTimestamp,
                        mentions: msg.mentions,
                        cleanContent: msg.cleanContent,
                        authorName: msg.member ? msg.member.displayName : msg.author.username,
                        authorAvatar: msg.author.avatarURL(),
                        roleColor: msg.member ? (msg.member.displayHexColor == "#000000" ? "#ffffff" : msg.member.displayHexColor) : "#ffffff",
                        timestamp: msg.editedTimestamp != null ? msg.editedTimestamp : msg.createdTimestamp,
                        date: formatDate(msg.editedTimestamp != null ? msg.editedTimestamp : msg.createdTimestamp)
                    });
                });

                // Update our message pointer to be last message in page of messages
                message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
            });
        i.editReply(`Fetched ${messages.length} messages...`);
    }

    i.editReply(`There is ${messages.length} messages in this channel.\nTime taken: ${Date.now() - time}ms`);
    // if directory doesn't exist, create it
    if (!fs.existsSync(`./messages`)) {
        fs.mkdirSync(`./messages`);
    }
    fs.writeFileSync(`./messages/${i.channel.id}.json`, JSON.stringify(messages));
});

function formatDate(timestamp: number) {
    // mm/dd/yyyy with leading zeros
    const date = new Date(timestamp);
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${(date.getDate()).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

cmd.data.setDefaultPermission(false);
cmd.permissions.push('MANAGE_MESSAGES');
export default cmd;