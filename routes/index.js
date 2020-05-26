var express = require('express');

var router = express.Router();
const request = require('snekfetch');
/* GET home page. */

router.get('/', async function (req, res, next) {
  res.render('index', {
    title: 'Express',
    nekos: (await request.get('https://nekos.life/api/v2/cat')).body.cat
  });
});
module.exports = router;