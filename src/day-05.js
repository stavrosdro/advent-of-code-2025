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

function mergeRanges(ranges) {
    if (!ranges.length) return [];
    ranges.sort((a, b) => a[0] - b[0]);
    const merged = [ranges[0]];
    for (let i = 1; i < ranges.length; i++) {
        const [start, end] = ranges[i];
        const last = merged[merged.length - 1];
        if (start <= last[1]) {
            last[1] = Math.max(last[1], end);
        } else {
            merged.push([start, end]);
        }
    }
    return merged;
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
    buckets = mergeRanges(buckets);
    buckets.forEach((v) => {
        counter += 1 + v[1] - v[0];
    });
    console.log(counter);

    console.timeEnd(`Challenge ${DAY_NUMBER} part 2`);
}

module.exports = { part1, part2 };
