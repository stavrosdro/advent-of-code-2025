const utils = require('./utils');

const DAY_NUMBER = '12';
const TEXT_FILE = `day-${DAY_NUMBER}.txt`;

const sample = `0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`;

function part1() {
    console.time(`Challenge ${DAY_NUMBER} part 1`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file);

    const presents = [];
    const rules = [];

    let parsingGift = false;
    lines.forEach((line) => {
        if (line[1] === ':') {
            parsingGift = true;
            presents.push(0);
        } else if (line === '') {
            parsingGift = false;
        } else if (parsingGift) {
            presents[presents.length - 1] += line
                .split('')
                .filter((letter) => letter === '#').length;
        } else {
            rules.push(line);
        }
    });

    let sum = 0;
    rules.forEach((rule) => {
        if (rule === '') return;
        const [p1, p2] = rule.split(':');
        const area = p1
            .split('x')
            .map(Number)
            .reduce((acc, curr) => acc * curr, 1);

        const stuff = p2
            .trim()
            .split(' ')
            .filter((letter) => letter !== ' ')
            .map(Number);

        let totalGiftArea = 0;
        for (let i = 0; i < stuff.length; i++) {
            totalGiftArea += presents[i] * stuff[i];
        }
        if (totalGiftArea <= area && totalGiftArea / area <= 0.8) sum++;
    });
    console.log(sum);

    console.timeEnd(`Challenge ${DAY_NUMBER} part 1`);
}

function part2() {
    console.time(`Challenge ${DAY_NUMBER} part 2`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file).filter((line) => line.length);

    console.timeEnd(`Challenge ${DAY_NUMBER} part 2`);
}

module.exports = { part1, part2 };
