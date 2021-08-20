const express = require('express');
const Bot = require("../app.js");
// const Discord = require("discord.js");
// const Nekos = require("../bot/apis/nekos.js");
const router = express.Router();
/* GET users listing. */

router.all('/callback', async function (req, res, next) {
    if (req.body.type === "stream.online") {
        (await Bot.bot.client.guilds.fetch('490955681197981715')).channels.cache.get('612355291010564104').send("Skyloudtv is online here: https://www.twitch.tv/skyloudlol");
        (await Bot.bot.client.guilds.fetch('714232671089459282')).channels.cache.get('714232671840108568').send("Skyloudtv is online here: https://www.twitch.tv/skyloudlol");
        res.send(req.body.challenge);
    }
});
module.exports = router;