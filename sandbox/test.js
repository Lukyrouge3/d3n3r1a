const Power4 = require('../bot/games/power4/power4').Power4;

const p4 = new Power4();
p4.play(1, 1);
p4.play(2, 1);
p4.play(1, 2);
p4.play(2, 3);
console.log(p4.gridString);