const utils = require('./utils');

const DAY_NUMBER = '06';
const TEXT_FILE = `day-${DAY_NUMBER}.txt`;

const sample = `123 328  51 64
 45 64  387 23
  6 98  215 314
*   +   *   + `;

function part1() {
    console.time(`Challenge ${DAY_NUMBER} part 1`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file);

    const filtered = lines
        .filter((line) => line.length)
        .map((line) => line.split(' ').filter((line) => line.length));
    const totals = [];
    for (let j = 0; j < filtered[0].length; j++) {
        totals.push([]);
        for (let i = 0; i < filtered.length; i++) {
            const element = filtered[i][j];
            totals[totals.length - 1].push(element);
        }
    }

    let sum = 0;
    totals.forEach((row) => {
        let result;
        const operation = row[row.length - 1];
        if (operation === '+') {
            result = 0;
        } else {
            result = 1;
        }
        row.forEach((el) => {
            if (el !== operation) {
                if (operation === '+') {
                    result += +el;
                } else {
                    result *= +el;
                }
            }
        });
        sum += result;
    });
    console.log(sum);

    console.timeEnd(`Challenge ${DAY_NUMBER} part 1`);
}

function part2() {
    console.time(`Challenge ${DAY_NUMBER} part 2`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file).filter((line) => line.length);

    let maxLineLength = lines[0].length;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.length > maxLineLength) maxLineLength = line.length;
    }
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.length < maxLineLength)
            lines[i] = (
                line +
                '                                                                                              '
            )
                .split('')
                .slice(0, maxLineLength)
                .join('');
    }

    let sum = 0;

    let operation = undefined;
    let buffer = [];
    let result = undefined;
    let emptyCols = 0;
    let prevWinIndex = 0;
    let winn = 0
    for (let j = 0; j < lines[0].length; j++) {
        for (let i = 0; i < lines.length; i++) {
            const char = lines[i][j];
            if (char === ' ') emptyCols++;
            if (i === lines.length - 1 && (char === '' || char === ' ')) {
                // do nothing
            } else if (char === '+' || char === '*') {
                operation = char;
                operation === '+' ? (result = 0) : (result = 1);
            } else {
                if (buffer[j] === undefined) {
                    buffer.push('');
                    winn++
                }
                buffer[j] = buffer[j] + char;
            }
            if (i === lines.length - 1 && j === lines[0].length - 1) {
                const a = buffer[buffer.length - 1];
                let b = '';
                for (let k = 0; k < a.length; k++) {
                    b += ' ';
                }
                buffer.push(b);
                emptyCols = lines.length;
                winn++
            }
            if (emptyCols === lines.length) {
                //console.log('res', buffer.slice(buffer.length - win - 1, -1));

                if (operation === '+') {
                    result = 0;
                } else {
                    result = 1;
                }
                buffer.slice(prevWinIndex, -1).forEach((n) => {
                    if (operation === '+') {
                        result += +n;
                    } else {
                        result *= +n;
                    }
                });
                const win = buffer.length - 1;
                prevWinIndex += winn;
                winn = 0
                sum += result;
                operation = undefined;
                //buffer = [];
                result = undefined;
                emptyCols = 0;
            }
        }
        emptyCols = 0;
    }
    console.log(sum);

    /*
    const filtered = lines
        .filter((line) => line.length)
        .map((line) => line.split(' ').filter((line) => line.length));
    const totals = [];
    for (let j = 0; j < filtered[0].length; j++) {
        totals.push([]);
        for (let i = 0; i < filtered.length; i++) {
            const element = filtered[i][j];
            totals[totals.length - 1].push(element);
        }
    }

    console.log('totals', totals);
    const mapped = [];
    for (let i = 0; i < totals.length; i++) {
        const row = totals[i];
        let maxRow = row[0].length;
        row.forEach((el, i) => {
            if (i !== row.length - 1 && el.length > maxRow) {
                maxRow = el.length;
            }
        });

        let basis = '';
        for (let i = 0; i < maxRow; i++) {
            basis += ' ';
        }
        row.forEach((el, i) => {
            if (i !== row.length - 1 && el.length < maxRow) {
                if (el.length < maxRow) {
                    row[i] = (basis + el).split('').slice(-maxRow).join('');
                }
            }
        });

        console.log('totals', totals);
        const arr = [];
        for (let i = 0; i < maxRow; i++) {
            arr.push('');
        }
        row.forEach((el, i) => {
            if (i === row.length - 1) {
                arr.push(el);
            } else {
                el.split('')
                    .reverse()
                    .forEach((n, j) => {
                        arr[j] = arr[j] + n;
                    });
            }
        });
        mapped.push(arr);
    }

    console.log(mapped);
    let sum = 0;
    mapped.forEach((row) => {
        let result;
        const operation = row[row.length - 1];
        if (operation === '+') {
            result = 0;
        } else {
            result = 1;
        }
        row.forEach((el) => {
            if (el !== operation) {
                if (operation === '+') {
                    result += +el;
                } else {
                    result *= +el;
                }
            }
        });
        sum += result;
    });
    console.log(sum);
    */
    console.timeEnd(`Challenge ${DAY_NUMBER} part 2`);
}

module.exports = { part1, part2 };
