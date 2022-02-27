var express = require('express');

var router = express.Router();
const request = require('snekfetch');
const database = require('../bot/apis/database');
/* GET home page. */

router.get('/', async function (req, res, next) {
    let commands = await database.getCommands();
    res.render('index', {
        title: 'Yamete Sempaiii',
        commands: commands,
        total: await commands.count()
    })
});
module.exports = router;