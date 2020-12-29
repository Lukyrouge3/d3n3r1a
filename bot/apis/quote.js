const request = require('snekfetch');

const uid = process.env.QUOTE_UID;
const token = process.env.QUOTE_TOKEN;

async function random() {
    let r = (await request.get('https://www.stands4.com/services/v2/quotes.php?uid=' + uid + '&tokenid=' + token + "&searchtype=RANDOM&format=json")).body.result;
    return r;
}

async function search(args) {
    let query = "";
    for (let i=0; i<args.length; i++) query += args[i];
    let r = (await request.get('https://www.stands4.com/services/v2/quotes.php?uid=' + uid + '&tokenid=' + token + "&searchtype=SEARCH&format=json&query=" + query)).body.result;
    return r === undefined ? random() : r[Math.floor(Math.random() * r.length)];
}

module.exports = {random, search};