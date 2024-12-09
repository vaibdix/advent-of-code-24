#!/usr/bin/env node

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8')
    .trim()
    .split('\n')
    .map(line => line.split(''));

function isCollinear(x1, y1, x2, y2, x3, y3) {
    return Math.abs((y2 - y1) * (x3 - x1) - (y3 - y1) * (x2 - x1)) < 1e-10;
}

// Part 1
const antennas1 = new Map();
for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
        if (input[y][x] !== '.') {
            if (!antennas1.has(input[y][x])) {
                antennas1.set(input[y][x], []);
            }
            antennas1.get(input[y][x]).push([x, y]);
        }
    }
}

const antinodes1 = new Set();
for (const [_, locations] of antennas1) {
    for (let i = 0; i < locations.length; i++) {
        for (let j = i + 1; j < locations.length; j++) {
            const [x1, y1] = locations[i];
            const [x2, y2] = locations[j];
            const dx = x2 - x1;
            const dy = y2 - y1;

            const antinode1 = [x1 + 2 * dx, y1 + 2 * dy];
            const antinode2 = [x1 - dx, y1 - dy];

            for (const [ax, ay] of [antinode1, antinode2]) {
                if (ax >= 0 && ax < input[0].length && ay >= 0 && ay < input.length) {
                    antinodes1.add(`${Math.round(ax)},${Math.round(ay)}`);
                }
            }
        }
    }
}
console.log('Part 1:', antinodes1.size);

