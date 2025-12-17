const utils = require('./utils');

const DAY_NUMBER = '08';
const TEXT_FILE = `day-${DAY_NUMBER}.txt`;

const sample = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

function getDistance(p1, p2) {
    const [x1, y1, z1] = p1;
    const [x2, y2, z2] = p2;

    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
}

function part1() {
    console.time(`Challenge ${DAY_NUMBER} part 1`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file).filter((line) => line.length);

    const points = lines.map((line) => [line.split(',').map(Number)]);

    const matches = {};
    let prevMin = 0;
    for (let reps = 0; reps < 1000; reps++) {
        let min = 999999999999;
        let pair = undefined;
        for (let i = 0; i < points.length; i++) {
            for (let j = 0; j < points.length; j++) {
                //if (i === j) continue;
                for (let k = 0; k < points[i].length; k++) {
                    for (let l = 0; l < points[j].length; l++) {
                        if (i === j && k === l) continue;
                        const dist = getDistance(points[i][k], points[j][l]);
                        if (
                            dist > prevMin &&
                            dist < min &&
                            !matches[`${points[i][k]}-${points[j][l]}`]
                        ) {
                            min = dist;
                            pair = [i, j, points[i][k], points[j][l]];
                        }
                    }
                }
            }
        }
        if (pair && pair[0] < pair[1]) {
            const [i, j, n1, n2] = pair;
            const arr1 = points[i];
            const arr2 = points[j];
            points.splice(i, 1);
            points.splice(j - 1, 1);
            points.push([...arr1, ...arr2]);
            prevMin = min;
            matches[`${pair[2]}-${pair[3]}`] = true;
            matches[`${pair[3]}-${pair[2]}`] = true;
        } else {
            matches[`${pair[2]}-${pair[3]}`] = true;
            matches[`${pair[3]}-${pair[2]}`] = true;
            //console.log('err');
        }
    }
    const lengths = points
        .map((pair) => pair.length)
        .sort((n1, n2) => +n2 - +n1);
    console.log(lengths[0] * lengths[1] * lengths[2]);

    console.timeEnd(`Challenge ${DAY_NUMBER} part 1`);
}

function part2() {
    console.time(`Challenge ${DAY_NUMBER} part 2`);

    const file = utils.readFileAsString(TEXT_FILE);
    const lines = utils.splitLines(file).filter((line) => line.length);

    const points = lines.map((line) => [line.split(',').map(Number)]);

    while (points.length > 1) {
        let min = 999999999999;
        let pair = undefined;
        for (let i = 0; i < points.length; i++) {
            for (let j = 0; j < points.length; j++) {
                if (i === j) continue;
                for (let k = 0; k < points[i].length; k++) {
                    for (let l = 0; l < points[j].length; l++) {
                        const dist = getDistance(points[i][k], points[j][l]);
                        if (dist < min) {
                            min = dist;
                            pair = [i, j, k, l];
                        }
                    }
                }
            }
        }
        if (pair) {
            const [i, j, k, l] = pair;
            const arr1 = points[i];
            const arr2 = points[j];
            const n1 = points[i][k];
            const n2 = points[j][l];
            points.splice(i, 1);
            points.splice(j - 1, 1);
            points.push([...arr1, ...arr2]);
            if (points.length === 1) {
                console.log(n1[0] * n2[0]);
            }
        }
    }

    console.timeEnd(`Challenge ${DAY_NUMBER} part 2`);
}

module.exports = { part1, part2 };
