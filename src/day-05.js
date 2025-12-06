const utils = require('./utils');

const DAY_NUMBER = '05';
const TEXT_FILE = `day-${DAY_NUMBER}.txt`;

const sample = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

function part1() {
    console.time(`Challenge ${DAY_NUMBER} part 1`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file);

    const buckets = [];
    let counter = 0;

    let isBlankLine = false;
    lines.forEach((line) => {
        if (line === '') {
            isBlankLine = true;
            return;
        }

        if (!isBlankLine) {
            buckets.push(line.split('-').map((n) => +n));
        } else {
            for (let i = 0; i < buckets.length; i++) {
                const bucket = buckets[i];
                if (bucket[0] <= +line && bucket[1] >= +line) {
                    counter++;
                    return;
                }
            }
        }
    });

    console.log(counter);

    console.timeEnd(`Challenge ${DAY_NUMBER} part 1`);
}

function mergeRanges(buckets) {
    buckets.sort((b1, b2) => b1[0] - b2[0]);
    for (let i = 0; i < buckets.length; i++) {
        const range = buckets[i];
        if (i < buckets.length - 1) {
            const next = buckets[i + 1];
            if (range[1] >= next[0]) {
                range[1] = Math.max(range[1], next[1]);
                buckets.splice(i + 1, 1);
                i--;
            }
        }
    }
}

function part2() {
    console.time(`Challenge ${DAY_NUMBER} part 2`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file);

    let buckets = [];
    let counter = 0;

    let isBlankLine = false;
    lines.forEach((line) => {
        if (line === '') {
            isBlankLine = true;
            return;
        }

        if (!isBlankLine) {
            const [l, r] = line.split('-').map((n) => +n);
            buckets.push([l, r]);
            return;
        }
    });
    mergeRanges(buckets);
    buckets.forEach((v) => {
        counter += 1 + v[1] - v[0];
    });
    console.log(counter);

    console.timeEnd(`Challenge ${DAY_NUMBER} part 2`);
}

module.exports = { part1, part2 };
