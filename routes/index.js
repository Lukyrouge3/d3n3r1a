var express = require('express');

var router = express.Router();
const request = require('snekfetch');
/* GET home page. */

router.get('/', async function (req, res, next) {
    request.get('https://nekos.life/api/v2/cat').then(n => {
        res.render('index', {
            title: 'Express',
            nekos: n.body.cat
        }, abort => {
          res.render(abort);
        });
    });
});
module.exports = router;