const utils = require('./utils');

const DAY_NUMBER = '07';
const TEXT_FILE = `day-${DAY_NUMBER}.txt`;

const sample = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

function getSource(lines) {
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[0].length; j++) {
            if (lines[i][j] === 'S') return [i, j];
        }
    }
}
function part1() {
    console.time(`Challenge ${DAY_NUMBER} part 1`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file).filter((line) => line.length);

    const source = getSource(lines);
    let beams = { [source]: 1 };

    let splits = 0;
    lines.slice(1).forEach((line, i) => {
        const newBeams = {};
        Object.keys(beams).forEach((beam) => {
            let [i, j] = beam.split(',').map(Number);
            if (i < lines.length - 1) {
                i++;
                if (lines[i][j] === '^') {
                    splits++;
                    if (j > 0) newBeams[[i, j - 1]] = 1;
                    if (j < lines[0].length - 1) newBeams[[i, j + 1]] = 1;
                } else {
                    newBeams[[i, j]] = 1;
                }
            }
        });
        beams = newBeams;
    });
    console.log(splits);

    console.timeEnd(`Challenge ${DAY_NUMBER} part 1`);
}

function part2() {
    console.time(`Challenge ${DAY_NUMBER} part 2`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file).filter((line) => line.length);

    const source = getSource(lines);
    let beams = { [source[1]]: 1 };

    lines.slice(1).forEach((line, i) => {
        const newBeams = {};
        Object.keys(beams).forEach((beam) => {
            let j = +beam;
            if (i < lines.length - 1) {
                if (line[j] === '^') {
                    if (j > 0) {
                        if (newBeams[j - 1] == undefined)
                            newBeams[j - 1] = beams[j];
                        else newBeams[j - 1] = newBeams[j - 1] + beams[j];
                    }
                    if (j < lines[0].length - 1) {
                        if (newBeams[j + 1] == undefined)
                            newBeams[j + 1] = beams[j];
                        else newBeams[j + 1] = newBeams[j + 1] + beams[j];
                    }
                } else {
                    newBeams[j] = (beams[j] ?? 0) + (newBeams[j] ?? 0);
                }
            }
        });
        beams = newBeams;
    });

    console.log(
        Object.keys(beams).reduce((acc, curr) => (acc += beams[curr]), 0)
    );

    console.timeEnd(`Challenge ${DAY_NUMBER} part 2`);
}

module.exports = { part1, part2 };
