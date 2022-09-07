import {Command} from "../../command";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} from "discord.js";

const finnID = "642632716084445185";
// const finnID = "951067216751763466";

const cmd = new Command('uberfinn', 'Creates an order for Finn to deliver', async i => {
    const finn = await i.guild.members.fetch(finnID);

    const price = i.options.getNumber('price');
    const order = i.options.getString('order');
    const address = i.options.getString('address');
    const location = i.options.getString('location');
    const tip = i.options.getNumber('tip');

    const embed = new EmbedBuilder();
    embed.setTitle('Uber Finn Order');
    embed.setFields([
        {name: 'Price', value: `${price} CHF`},
        {name: 'Order', value: order},
        {name: 'Tip', value: `${tip ? tip : 0} CHF`},
        {name: 'Pickup Location', value: location},
        {name: 'Delivery Address', value: "Censored"}
    ]);
    embed.setColor(0x00FF00);
    embed.setFooter({text: `Ordered by ${i.member.displayName}`, iconURL: finn.avatarURL()});
    embed.setTimestamp(new Date());
    i.reply({embeds: [embed]});
    const id = randomId();
    const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId(id).setLabel("Accept").setStyle(ButtonStyle.Success));

    const embed2 = new EmbedBuilder();
    embed2.setTitle('Uber Finn Order');
    embed2.setColor(0x00FF00);
    embed2.setFooter({text: `Ordered by ${i.member.displayName}`, iconURL: finn.avatarURL()});
    embed2.setTimestamp(new Date())
    embed2.setFields([
        {name: 'Price', value: `${price} CHF`},
        {name: 'Order', value: order},
        {name: 'Tip', value: `${tip ? tip : 0} CHF`},
        {name: 'Pickup Location', value: location},
        {name: 'Delivery Address', value: address}
    ]);
    const msg = await finn.send({content: `You have a new order from ${i.member.displayName}`, embeds: [embed2], components: [row]});

    const filter = (i2) => i2.customId === id;
    const collector = finn.user.dmChannel.createMessageComponentCollector({filter, time: 3600000});
    collector.on('collect', async i2 => {
        i.editReply({content: 'Order accepted', embeds: [embed], components: []});
        i.user.send("Order accepted");
        msg.edit({content: 'Order accepted', embeds: [embed2], components: []});
    });
});

function randomId() {
    return Math.random().toString(36).substr(2, 9);
}

cmd.data.addNumberOption(o => o.setName('price').setDescription('The price of the order').setRequired(true));
cmd.data.addStringOption(o => o.setName('order').setDescription('The item(s) to order').setRequired(true));
cmd.data.addStringOption(o => o.setName('location').setDescription('The address to go pickup to').setRequired(true));
cmd.data.addStringOption(o => o.setName('address').setDescription('The address to deliver to').setRequired(true));
cmd.data.addNumberOption(o => o.setName('tip').setDescription('The tip for Finn').setRequired(true));

export default cmd;
