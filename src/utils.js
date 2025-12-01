const fs = require('fs');
const path = require('path');

function readFileAsString(fileName) {
    const filePath = path.join(__dirname, fileName);
    return fs.readFileSync(filePath, 'utf-8');
}

function splitLines(string, trim = false) {
    if (trim) {
        return string.trim().split('\n');
    } else {
        return string.split('\n');
    }
}

function warnOnEmptyLine(array) {
    array.forEach((row, index) => {
        if (!row || !row.trim()) {
            console.warn(`Empty Line on: ${index}`);
        }
    });
}

function withMemoization(timeConsumingFn) {
    const cache = new Map();

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = timeConsumingFn(...args);
        cache.set(key, result);
        return result;
    };
}

module.exports = {
    readFileAsString,
    warnOnEmptyLine,
    splitLines,
    withMemoization,
};
