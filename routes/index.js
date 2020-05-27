var express = require('express');

var router = express.Router();
const request = require('snekfetch');
const database = require('../apis/database');
/* GET home page. */

router.get('/', async function (req, res, next) {
    res.render('index', {
        title: 'Yamete Sempaii',
        commands: await database.getCommands()
    })
});
module.exports = router;