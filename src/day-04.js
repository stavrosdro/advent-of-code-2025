const utils = require('./utils');

const DAY_NUMBER = '04';
const TEXT_FILE = `day-${DAY_NUMBER}.txt`;

const sample = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

function countArea(grid, rowIndex, colIndex) {
    let counter = 0;
    if (rowIndex > 0 && grid[rowIndex - 1][colIndex] === '@') counter++;
    if (rowIndex < grid.length - 1 && grid[rowIndex + 1][colIndex] === '@')
        counter++;
    if (colIndex > 0 && grid[rowIndex][colIndex - 1] === '@') counter++;
    if (
        rowIndex > 0 &&
        colIndex > 0 &&
        grid[rowIndex - 1][colIndex - 1] === '@'
    )
        counter++;
    if (
        rowIndex < grid.length - 1 &&
        colIndex > 0 &&
        grid[rowIndex + 1][colIndex - 1] === '@'
    )
        counter++;
    if (colIndex < grid[0].length - 1 && grid[rowIndex][colIndex + 1] === '@')
        counter++;
    if (
        colIndex < grid[0].length - 1 &&
        rowIndex > 0 &&
        grid[rowIndex - 1][colIndex + 1] === '@'
    )
        counter++;
    if (
        colIndex < grid[0].length - 1 &&
        rowIndex < grid.length - 1 &&
        grid[rowIndex + 1][colIndex + 1] === '@'
    )
        counter++;
    return counter;
}

function part1() {
    console.time(`Challenge ${DAY_NUMBER} part 1`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file).filter((line) => line.length);

    const grid = lines.map((line) => line.split(''));
    let counter = 0;
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        for (let j = 0; j < row.length; j++) {
            const element = row[j];
            if (element !== '@') continue;
            if (countArea(grid, i, j) < 4) {
                counter++;
            }
        }
    }

    console.log(counter);

    console.timeEnd(`Challenge ${DAY_NUMBER} part 1`);
}

function part2() {
    console.time(`Challenge ${DAY_NUMBER} part 2`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file).filter((line) => line.length);

    const grid = lines.map((line) => line.split(''));
    let counter = 0;
    let anyRemoval = true;
    while (anyRemoval) {
        anyRemoval = false;
        for (let i = 0; i < grid.length; i++) {
            const row = grid[i];
            for (let j = 0; j < row.length; j++) {
                const element = row[j];
                if (element !== '@') continue;
                if (countArea(grid, i, j) < 4) {
                    counter++;
                    anyRemoval = true;
                    grid[i][j] = '.';
                }
            }
        }
    }

    console.log(counter);

    console.timeEnd(`Challenge ${DAY_NUMBER} part 2`);
}

module.exports = { part1, part2 };
