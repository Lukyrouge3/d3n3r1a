const Power4 = require('../bot/games/power4/power4').game;

const p4 = new Power4();
p4.play(1, 1);
p4.play(2, 1);
p4.play(1, 2);
p4.play(2, 3);
console.log(p4.gridString);


let string = "akosjndsako";
function palindrome(string) {
    for (let i = 0; i < Math.floor(string.length); i++) if (string[i] !== string[string.length - i - 1]) return false;
    return true;
}