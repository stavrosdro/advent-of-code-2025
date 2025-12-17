const utils = require('./utils');

const DAY_NUMBER = '10';
const TEXT_FILE = `day-${DAY_NUMBER}.txt`;

const sample = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

function part1() {
    console.log('remember node --max-old-space-size=30000 .');
    console.time(`Challenge ${DAY_NUMBER} part 1`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file).filter((line) => line.length);

    const targets = [];
    const currentStates = [];
    const counters = [];
    const buttons = [];

    lines.forEach((line) => {
        const target = line
            .split(']')[0]
            .split('[')[1]
            .split('')
            .map((char) => char === '#');
        targets.push(target);
        currentStates.push([new Array(target.length).fill(false)]);
        //counters.push(new Array(target.length).fill(0));
        counters.push(0);
        const buttonList = [];
        const buttonText = line.split(']')[1].split('{')[0].trim();
        let buffer = '';
        for (let i = 0; i < buttonText.length; i++) {
            const char = buttonText[i];
            if (char === '(') {
                buffer = '';
            } else if (char === ')') {
                buttonList.push(buffer);
            } else {
                buffer += char;
            }
        }
        buttons.push(buttonList.map((text) => text.split(',').map(Number)));
    });

    let remainingStates = targets.length;
    while (remainingStates) {
        console.log(remainingStates);
        for (let i = 0; i < currentStates.length; i++) {
            const puzzleStates = currentStates[i];
            let shouldProcess = true;
            for (let j = 0; j < puzzleStates.length; j++) {
                const state = puzzleStates[j];
                if (state.join('') === targets[i].join('')) {
                    shouldProcess = false;
                    remainingStates--;
                    currentStates[i] = [];
                    break;
                }
            }
            if (!shouldProcess) continue;
            const newStates = [];
            puzzleStates.forEach((state) => {
                buttons[i].forEach((button) => {
                    const s = [...state];
                    button.forEach((position) => {
                        s[position] = !s[position];
                    });
                    newStates.push(s);
                });
                currentStates[i] = newStates;
            });
            currentStates[i].length && (counters[i] += 1);
        }
    }
    console.log(counters.reduce((acc, curr) => (acc += curr), 0));

    console.timeEnd(`Challenge ${DAY_NUMBER} part 1`);
}

function isStateInvalid(state, target) {
    let index = 0;
    while (index < state.length) {
        if (state[index] > target[index]) return true;
        index++;
    }
    return false;
}

function part2() {
    console.time(`Challenge ${DAY_NUMBER} part 2`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file).filter((line) => line.length);

    /*
    const targets = [];
    let currentStates = [];
    const counters = [];
    const buttons = [];
    const ccc = [];

    lines.forEach((line) => {
        const target = line.split('}')[0].split('{')[1].split(',').map(Number);
        console.log(target);
        //.map((char) => char === '#');
        targets.push(target);
        currentStates.push([new Array(target.length).fill(false)]);
        counters.push([new Array(target.length).fill(0)]);
        ccc.push(0);
        const buttonList = [];
        const buttonText = line.split(']')[1].split('{')[0].trim();
        let buffer = '';
        for (let i = 0; i < buttonText.length; i++) {
            const char = buttonText[i];
            if (char === '(') {
                buffer = '';
            } else if (char === ')') {
                buttonList.push(buffer);
            } else {
                buffer += char;
            }
        }
        buttons.push(buttonList.map((text) => text.split(',').map(Number)));
    });
    currentStates = counters;

    let remainingStates = targets.length;
    while (remainingStates) {
        console.log(remainingStates);
        for (let i = 0; i < currentStates.length; i++) {
            const puzzleStates = currentStates[i];
            let shouldProcess = true;
            for (let j = 0; j < puzzleStates.length; j++) {
                const state = puzzleStates[j];
                if (state.join('-') === targets[i].join('-')) {
                    shouldProcess = false;
                    remainingStates--;
                    currentStates[i] = [];
                    break;
                } else if (isStateInvalid(state, targets[i])) {
                    puzzleStates[j] = [];
                }
            }
            if (!shouldProcess) continue;
            const newStates = [];
            puzzleStates.forEach((state) => {
                if (!state.length) return;
                buttons[i].forEach((button) => {
                    const s = [...state];
                    button.forEach((position) => {
                        s[position]++;
                    });
                    let isValid = true;
                    for (let k = 0; k < s.length; k++) {
                        if (s[k] > targets[i][k]) {
                            isValid = false;
                            break;
                        }
                    }
                    isValid && newStates.push(s);
                });
                currentStates[i] = newStates;
            });
            currentStates[i].length && (ccc[i] += 1);
        }
    }
    console.log(ccc.reduce((acc, curr) => (acc += curr), 0));
    */
    console.log("python goes brr")

    console.timeEnd(`Challenge ${DAY_NUMBER} part 2`);
}

module.exports = { part1, part2 };
