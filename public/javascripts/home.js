$(document).ready(() => {
    let socket = io();

    function setuptime(time) {
        $('#hours').empty().append(time.h + "h");
        $('#minutes').empty().append(time.m + "m");
        $('#seconds').empty().append(time.s + "s");
    }

    socket.on('uptime', (time) => {
        setuptime(time);
    });
    socket.emit('askUptime');
    setInterval(() => socket.emit('askUptime'), 1000);

    let commands = JSON.parse($('#commandslist').val());
    let label = [], data = [];
    commands.forEach(cmd => {
        let b = false;
        label.forEach(l => {
            if (cmd.name === l) {
                b = true;
            }
        });
        if (!b) label.push(cmd.name);
    });
    for (let i = 0; i < label.length; i++) {
        commands.forEach(cmd => {
            if (cmd.name === label[i]) if (data[i]) data[i] += 1; else data[i] = 1;
        });
    }
    var commandsChart = new Chart(document.getElementById('commands').getContext('2d'), {
        type: 'pie',
        data: {
            labels: label,
            datasets: [{
                label: 'Dataset ',
                data: data,
                fill: false,
                borderWidth: 0
            }],
            options: {
                responsive: false,
                title: {
                    display: true,
                    text: 'Commands used total'
                }
            }
        }
    });
    // console.log(commands);
    let newComs = [];
    for (let i = 0; i < commands.length; i++) {
        if (newComs[commands[i].name]) newComs[commands[i].name] += 1;
        else newComs[commands[i].name] = 1;
    }
    let table = [];
    for (let c in newComs) {
        table.push({name: c, count: newComs[c]});
    }
    console.log(table);
    $('#sortable').sortable(table);
    // for (let c in newComs) {
    //     $('.commands').append('<tr><td>' + c + '</td><td>' + newComs[c] + '</td></tr>')
    // }
});