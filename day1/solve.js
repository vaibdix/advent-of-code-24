#!/usr/bin/env node

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8')
    .trim()
    .split('\n')
    .map(line => {
        const [a, b] = line.split(/\s+/).map(Number);
        return [a, b];
    });

// Part 1
const a = input.map(pair => pair[0]).sort((a, b) => a - b);
const b = input.map(pair => pair[1]).sort((a, b) => a - b);
const total = a.reduce((sum, val, i) => sum + Math.abs(val - b[i]), 0);
console.log('Part 1:', total);