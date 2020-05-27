const Uptime = require('./app').Uptime;

module.exports.run = (io) => {
    io.on('connection', socket => {
        socket.on('askUptime', () => {
            socket.emit('uptime', Uptime.uptime());
        })
    });
};