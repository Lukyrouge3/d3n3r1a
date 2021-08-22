const express = require('express');
const Bot = require("../app.js");
// const Discord = require("discord.js");
// const Nekos = require("../bot/apis/nekos.js");
const router = express.Router();
/* GET users listing. */

router.all('/callback', async function (req, res, next) {
    if (req.body.challenge)
        res.send(req.body.challenge);
    if (req.body.subscription.type === "stream.online") {
        Bot.bot.streamOnline();
    } else if (req.body.subscription.type === "stream.offline") {
        Bot.bot.streamOffline();
    }
});
module.exports = router;