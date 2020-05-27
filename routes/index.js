var express = require('express');

var router = express.Router();
const request = require('snekfetch');
/* GET home page. */

router.get('/', async function (req, res, next) {
    res.render('index', {
        title: 'Yamete Sempaii'
    })
});
module.exports = router;