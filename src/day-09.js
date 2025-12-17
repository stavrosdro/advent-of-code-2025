const utils = require('./utils');

const DAY_NUMBER = '09';
const TEXT_FILE = `day-${DAY_NUMBER}.txt`;

const sample = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

function part1() {
    console.time(`Challenge ${DAY_NUMBER} part 1`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file).filter((line) => line.length);
    const points = lines.map((line) => line.split(',').map(Number));

    let max = 0;
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (j === i) continue;
            const colDiff = Math.abs(points[i][0] - points[j][0]) + 1;
            const rowDiff = Math.abs(points[i][1] - points[j][1]) + 1;
            const m = colDiff * rowDiff;
            if (m > max) max = m;
        }
    }
    console.log(max);

    console.timeEnd(`Challenge ${DAY_NUMBER} part 1`);
}

function part2() {
    console.time(`Challenge ${DAY_NUMBER} part 2`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file).filter((line) => line.length);

    console.timeEnd(`Challenge ${DAY_NUMBER} part 2`);
}

module.exports = { part1, part2 };
