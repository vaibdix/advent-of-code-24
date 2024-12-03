#!/usr/bin/env node

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim();

// Part 1
const findMultiplications = (text) => {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const matches = [...text.matchAll(regex)]
        .map(match => ({
            x: parseInt(match[1]),
            y: parseInt(match[2])
        }));
    return matches;
}

const total = findMultiplications(input)
    .reduce((sum, { x, y }) => sum + (x * y), 0);

console.log('Part 1:', total);



