const utils = require('./utils');


const DAY_NUMBER = '02';
const TEXT_FILE = `day-${DAY_NUMBER}.txt`;

const sample = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`

function part1() {
    console.time(`Challenge ${DAY_NUMBER} part 1`);

    const file = utils.readFileAsString(TEXT_FILE);
    const m = file.split(',')
    const lines = m

    let sum = 0;
    lines.forEach(line => {
        [left, right] = line.split('-').map(n => +n);
        for (let index = left; index <= right; index++) {
            const str = ''+index
            if (str.length % 2 === 0) {
                const middle = str.length/2
                const l = str.slice(0, middle)
                const r = str.slice(middle)
                if (l===r) {
                    sum += index
                }
            }
        }
    })

    console.log(sum);

    console.timeEnd(`Challenge ${DAY_NUMBER} part 1`);
}

function part2() {
    console.time(`Challenge ${DAY_NUMBER} part 2`);

    const file = utils.readFileAsString(TEXT_FILE);
    const m = file.split(',')
    const lines = m

    let sum = 0;
    lines.forEach(line => {
        [left, right] = line.split('-').map(n => +n);
        for (let index = left; index <= right; index++) {
            const str = ''+index
            const arr = str.split('')
            let basis = '';
            const middle = Math.floor(arr.length/2);
            for (let j = 0; j < middle; j++) {
                basis += arr.shift()
                const str = arr.join('')
                const n = str.replaceAll(basis, '');
                if (n === '') {
                    sum += index;
                    break;
                }
            }


        }
    })

    console.log(sum);

    console.timeEnd(`Challenge ${DAY_NUMBER} part 2`);
}

module.exports = { part1, part2 };
