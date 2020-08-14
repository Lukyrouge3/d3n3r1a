const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: "us-cdbr-east-05.cleardb.net",
        user: "b8af259df30cf4",
        password: "2683195d",
        database: "heroku_f9093320906c85a",
        charset: 'utf8'
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
    Command.forge({name: name, user_id: user_id, timestamp: timestamp, channel_id: channel_id}).save();
};

module.exports.getCommands = () => {
    return Command.fetchAll();
};

//REPLACE INTO commands (name, count) VALUES ("test", +1)