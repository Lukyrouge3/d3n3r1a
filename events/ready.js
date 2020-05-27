const COMMAND_PREFIX = process.env.PREFIX;

let start = 0;

exports.run = async client => {
    let user = client.user;
    user.setActivity(COMMAND_PREFIX, {
        type: "WATCHING"
    }).then(() => {
        start = Date.now();
        console.log('Activity set !')
    }).catch(console.error);
};

module.exports.start = () => {
    return start;
};