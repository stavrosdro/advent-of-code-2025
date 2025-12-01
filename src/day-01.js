const utils = require('./utils');


const DAY_NUMBER = '01';
const TEXT_FILE = `day-${DAY_NUMBER}.txt`;

const sample = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

function part1() {
    console.time(`Challenge ${DAY_NUMBER} part 1`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file);
    //const lines = utils.splitLines(sample);

    let position = 50;
    let counter = 0;

    lines.forEach(line => {
        const direction = line.slice(0, 1)
        const steps = +line.slice(1)
        //console.log(direction, steps)

        if (direction === 'R'){
            const positionRaw = position + steps
            if (positionRaw > 99) {
                position = positionRaw % 100
            } else {
                position = positionRaw
            }
        } else {
            let positionRaw = position - steps
            while (positionRaw < 0) {
                positionRaw += 100
            }
            position = positionRaw
        }

        //console.log(position)
        if (position === 0) counter ++;
    })

    console.log(counter)

    console.timeEnd(`Challenge ${DAY_NUMBER} part 1`);
}

function part2() {
    console.time(`Challenge ${DAY_NUMBER} part 2`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file);
    //const lines = utils.splitLines(sample);

    let position = 50;
    let counter = 0;

    lines.forEach(line => {
        const direction = line.slice(0, 1)
        const steps = +line.slice(1)
        let zeroReached = 0;

        //console.log(direction, steps)

        if (direction === 'R'){
            let positionRaw = position + steps
            zeroReached = Math.floor(positionRaw/100)
            position = positionRaw%100
        } else {
            let positionRaw = position - steps
            position = positionRaw%100
            if (position<0) position = position+100
            zeroReached = Math.abs(Math.floor(positionRaw/100))
        }

        if (position === 0) {
            counter = counter + 0 + zeroReached
        } else {
            counter = counter + zeroReached
        }
    })

    console.log(counter)
    console.timeEnd(`Challenge ${DAY_NUMBER} part 2`);
}

module.exports = { part1, part2 };
