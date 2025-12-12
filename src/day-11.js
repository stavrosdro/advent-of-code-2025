const utils = require('./utils');

const DAY_NUMBER = '11';
const TEXT_FILE = `day-${DAY_NUMBER}.txt`;

const sample = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;

const sample2 = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;

function part1() {
    console.time(`Challenge ${DAY_NUMBER} part 1`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file).filter((line) => line.length);

    const leMap = {};
    lines.forEach((line) => {
        const [src, parts] = line.split(': ');
        const destinations = parts.split(' ');
        leMap[src] = destinations;
    });

    const path = { you: false };
    const paths = [{ curr: 'you', full: 'you' }];

    while (paths.length) {
        const p = paths.pop();
        if (p.curr === 'out') continue;
        leMap[p.curr].forEach((destination) => {
            const candidate = p.full + '-' + destination;
            if (path[candidate] == undefined) {
                path[candidate] = destination === 'out';
                paths.push({ curr: destination, full: candidate });
            }
        });
    }

    let sum = 0;
    Object.values(path).forEach((value) => {
        if (value) sum++;
    });
    console.log(sum);

    console.timeEnd(`Challenge ${DAY_NUMBER} part 1`);
}

const cache = {};
function traversal(from, to, leMap, counter = 0) {
    if (cache[`${from}-${to}`] != undefined) {
        return cache[`${from}-${to}`];
    }

    if (from === to) return 1;
    if (leMap[from] == undefined) return 0;
    leMap[from].forEach((destination) => {
        counter += traversal(destination, to, leMap);
    });

    cache[`${from}-${to}`] = counter;
    return counter;
}

function part2() {
    console.time(`Challenge ${DAY_NUMBER} part 2`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file).filter((line) => line.length);

    const leMap = {};
    lines.forEach((line) => {
        const [src, parts] = line.split(': ');
        const destinations = parts.split(' ');
        leMap[src] = destinations;
    });

    const pairs1 = [
        ['svr', 'dac'],
        ['dac', 'fft'],
        ['fft', 'out'],
    ];
    let magicNumber1 = 1;
    pairs1.forEach(([from, to]) => {
        const a = traversal(from, to, leMap);
        magicNumber1 *= a;
    });

    const pairs2 = [
        ['svr', 'fft'],
        ['fft', 'dac'],
        ['dac', 'out'],
    ];
    let magicNumber2 = 1;
    pairs2.forEach(([from, to]) => {
        const a = traversal(from, to, leMap);
        magicNumber2 *= a;
    });

    console.log(magicNumber1 + magicNumber2);

    console.timeEnd(`Challenge ${DAY_NUMBER} part 2`);
}

module.exports = { part1, part2 };
