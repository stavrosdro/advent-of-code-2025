const utils = require('./utils');

const DAY_NUMBER = '09';
const TEXT_FILE = `day-${DAY_NUMBER}.txt`;

const sample = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

function maxPointsOnSameRowOrCol(points) {
    const store = {};
    let maxPointsInSameRow = 0;
    let maxPointsInSameCol = 0;
    points.forEach((point) => {
        const row = point[0];
        const col = point[1];

        if (store['r' + row] == undefined) store['r' + row] = 0;
        if (store['c' + col] == undefined) store['c' + col] = 0;
        store['r' + row]++;
        store['c' + col]++;

        maxPointsInSameRow = Math.max(maxPointsInSameRow, store['r' + row]);
        maxPointsInSameCol = Math.max(maxPointsInSameCol, store['c' + col]);
    });
    console.log(maxPointsInSameRow, maxPointsInSameCol);
}

function checkContinuity(points) {
    let prevRow = points[points.length - 1][0];
    let prevCol = points[points.length - 1][1];

    points.forEach((point) => {
        const [row, col] = point;
        if (prevCol === col || prevRow === row) {
            prevCol = col;
            prevRow = row;
        } else {
            throw new Error('lel');
        }
    });
    console.log('pena');
}

function part1() {
    console.time(`Challenge ${DAY_NUMBER} part 1`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file).filter((line) => line.length);
    const points = lines.map((line) => line.split(',').map(Number));

    let max = 0;
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (j === i) continue;
            const colDiff = Math.abs(points[i][0] - points[j][0]) + 1;
            const rowDiff = Math.abs(points[i][1] - points[j][1]) + 1;
            const m = colDiff * rowDiff;
            if (m > max) max = m;
        }
    }
    console.log(max);

    console.timeEnd(`Challenge ${DAY_NUMBER} part 1`);
}

function getInBetweenPoints(current, next) {
    const [r1, c1] = current;
    const [r2, c2] = next;

    const newPoints = [];
    if (r1 === r2) {
        const min = Math.min(...[c1, c2]);
        const max = Math.max(...[c1, c2]);
        for (let i = min + 1; i < max; i++) {
            newPoints.push([r1, i]);
        }
    } else {
        const min = Math.min(...[r1, r2]);
        const max = Math.max(...[r1, r2]);
        for (let i = min + 1; i < max; i++) {
            newPoints.push([i, c1]);
        }
    }
    return newPoints;
}

function getOutsidePoints(points, bordered) {
    const perimeter = [];
    const expanded = [...points, points[0]];
    const store = {};
    bordered.forEach((point) => {
        //const key = `${point[0]},${point[1]}`;
        store[point] = true;
    });

    let prevDirection;
    for (let i = 0; i < expanded.length - 1; i++) {
        const [r1, c1] = expanded[i];
        const [r2, c2] = expanded[i + 1];
        let direction;
        if (r1 > r2) direction = 'up';
        if (r1 < r2) direction = 'down';
        if (c1 > c2) direction = 'left';
        if (c1 < c2) direction = 'right';

        switch (direction) {
            case 'up':
                if (prevDirection === 'right') {
                    const p = [r1 + 1, c1 + 1];
                    store[p] === undefined && perimeter.push(p);
                } else if (prevDirection === 'left') {
                    //
                }
                for (let j = r2; j <= r1; j++) {
                    store[[j, c1 + 1]] === undefined &&
                        perimeter.push([j, c1 + 1]);
                }
                //store[[r1 + 1, c1 + 1]] === undefined && perimeter.push([r1 + 1, c1 + 1]);
                break;
            case 'left':
                if (prevDirection === 'up') {
                    const p = [r1 - 1, c1 + 1];
                    store[p] === undefined && perimeter.push(p);
                }
                for (let j = c2; j <= c1; j++) {
                    store[[r1 - 1, j]] === undefined &&
                        perimeter.push([r1 - 1, j]);
                }
                //perimeter.push([r1 - 1, c2 + 1]);
                break;
            case 'down':
                if (prevDirection === 'left') {
                    const p = [r1 - 1, c1 - 1];
                    store[p] === undefined && perimeter.push(p);
                    const p2 = [r2 + 1, c1 - 1];
                    //store[p2] === undefined && perimeter.push(p2);
                }
                for (let j = r1; j <= r2; j++) {
                    store[[j, c1 - 1]] === undefined &&
                        perimeter.push([j, c1 - 1]);
                }
                store[[r1 - 1, c1 - 1]] === undefined &&
                    perimeter.push([r1 - 1, c1 - 1]);
                break;
            case 'right':
                if (prevDirection === 'down') {
                    const p = [r1 + 1, c1 - 1];
                    store[p] === undefined && perimeter.push(p);
                    const p2 = [r1 + 1, c2 + 1];
                    //store[p2] === undefined && perimeter.push(p2);
                }
                for (let j = c1; j <= c2; j++) {
                    store[[r1 + 1, j]] === undefined &&
                        perimeter.push([r1 + 1, j]);
                }
                break;
        }
        prevDirection = direction;
    }

    return perimeter;
}

function part2() {
    console.time(`Challenge ${DAY_NUMBER} part 2`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file).filter((line) => line.length);
    const points = lines.map((line) => line.split(',').map(Number));

    const areas = [];
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (j === i) continue;
            const colDiff = Math.abs(points[i][0] - points[j][0]) + 1;
            const rowDiff = Math.abs(points[i][1] - points[j][1]) + 1;
            const m = colDiff * rowDiff;
            areas.push({ p1: points[i], p2: points[j], area: m });
        }
    }
    areas.sort((n1, n2) => n2.area - n1.area);

    const borderPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
        const current = points[i];
        const next = points[i + 1];
        borderPoints.push(current, ...getInBetweenPoints(current, next));
    }
    borderPoints.push(
        points[points.length - 1],
        ...getInBetweenPoints(points[points.length - 1], points[0])
    );

    const thePerimeter = getOutsidePoints(points, borderPoints);

    for (let i = 0; i < areas.length; i++) {
        const { p1, p2, area } = areas[i];
        let found = false;
        for (let j = 0; j < thePerimeter.length; j++) {
            const element = thePerimeter[j];

            const minRow = Math.min(p1[0], p2[0]);
            const minCol = Math.min(p1[1], p2[1]);
            const maxRow = Math.max(p1[0], p2[0]);
            const maxCol = Math.max(p1[1], p2[1]);

            if (
                element[0] >= minRow &&
                element[0] <= maxRow &&
                element[1] >= minCol &&
                element[1] <= maxCol
            ) {
                found = true;
                break;
            }
        }
        if (!found) {
            console.log(area);
            break;
        }
    }

    console.timeEnd(`Challenge ${DAY_NUMBER} part 2`);
}

module.exports = { part1, part2 };
