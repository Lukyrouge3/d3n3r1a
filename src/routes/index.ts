import fs from "fs";

var express = require('express');

var router = express.Router();
const request = require('snekfetch');
/* GET home page. */

router.get('/', async function (req, res, next) {
    res.render('index', {
        title: 'Yamete Sempaiii',
    })
});

router.get('/messages/:channelId', async function (req, res, next) {
    const channelId = req.params.channelId;
    const messages = JSON.parse(fs.readFileSync(`./messages/${channelId}.json`).toString());
    res.render('messages', {
        title: 'Yamete Sempaiii',
        messages: messages.reverse()
    });
});
module.exports = router;