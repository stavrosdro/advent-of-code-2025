const utils = require('./utils');


const DAY_NUMBER = '03';
const TEXT_FILE = `day-${DAY_NUMBER}.txt`;

const sample = `987654321111111
811111111111119
234234234234278
818181911112111`

function getPerfectPair(numbers=[]) {
    if (!numbers.length) return 0
    const indexes = []
    let perfectPair = 0
    let max = numbers[0]
    let maxIndex = 0
    for (let i = 0; i < numbers.length; i++) {
        const element = numbers[i];
        if (element > max) {
            max = element
            maxIndex = i
        }
    }
    indexes.push(maxIndex)
    perfectPair = max
    for (let i = 0; i < 11; i++) {
        let next = perfectPair
        let nextIndex = 0
        for (let j = 0; j < numbers.length; j++) {
            if (!indexes.includes(j)) {
                const candidatePair = +[...indexes, j].sort((n1,n2) => n1-n2).map(n => numbers[n]).join('')
                if (candidatePair > next) {
                    next = candidatePair
                    nextIndex = j
                }
            }
        }
        indexes.push(nextIndex)
        indexes.sort((n1,n2) => n1-n2)
        perfectPair = next
    }
    return perfectPair;
}

function part1() {
    console.time(`Challenge ${DAY_NUMBER} part 1`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file);

    let sum = 0;
    lines.forEach(line => {
        const numbers = line.split('').map(m=>+m)
        let max = numbers[0]
        let maxIndex = 0
        let perfectPair = 0

        for (let i = 0; i < numbers.length; i++) {
            const element = numbers[i];
            if (element > max) {
                max = element
                maxIndex = i
            }
        }

        for (let j = 0; j < numbers.length; j++) {
            const element = numbers[j];
            if (j<maxIndex) {
                const candidate = + `${element}${max}`
                if (candidate > perfectPair){
                    perfectPair = candidate
                }
            } else if (j>maxIndex) {
                const candidate = + `${max}${element}`
                if (candidate > perfectPair){
                    perfectPair = candidate
                }
            }
        }

        sum += +perfectPair
    })

    console.log(sum)

    console.timeEnd(`Challenge ${DAY_NUMBER} part 1`);
}

function part2() {
    console.time(`Challenge ${DAY_NUMBER} part 2`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file);


    let sum = 0;
    lines.forEach((line, i) => {
        const pair = getPerfectPair(line.split('').map(n=>+n))
        sum += pair
    })
    console.log(sum)

    console.timeEnd(`Challenge ${DAY_NUMBER} part 2`);
}

module.exports = { part1, part2 };
