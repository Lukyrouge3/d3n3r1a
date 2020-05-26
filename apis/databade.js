const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "../db.sqlite"
    }
});

const bookshelf = require('bookshelf')(knex);

const Command = bookshelf.model('Command', {
    tableName: 'commands'
});

module.exports.addCommand = (name, msg) => {
    let user_id = msg.author.id
        , timestamp = Date.now()
        , channel_id = msg.channel.id;
};

//REPLACE INTO commands (name, count) VALUES ("test", +1)