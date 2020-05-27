const COMMAND_PREFIX = process.env.PREFIX;

exports.run = async client => {
    let user = client.user;
    user.setActivity(COMMAND_PREFIX, {
        type: "WATCHING"
    }).then(() => {
        console.log('Activity set !')
    }).catch(console.error);
};
