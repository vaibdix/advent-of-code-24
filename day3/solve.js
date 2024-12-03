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



// Part 2
const findInstructions = (text) => {
    const regex = /(mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))/g;
    const matches = [...text.matchAll(regex)];

    let enabled = true;
    return matches
        .map(match => {
            if (match[0] === 'do()') return { type: 'do' };
            if (match[0] === "don't()") return { type: 'dont' };
            return {
                type: 'mul',
                x: parseInt(match[2]),
                y: parseInt(match[3])
            };
        })
        .reduce((sum, instruction) => {
            if (instruction.type === 'do') {
                enabled = true;
                return sum;
            }
            if (instruction.type === 'dont') {
                enabled = false;
                return sum;
            }
            return sum + (enabled ? instruction.x * instruction.y : 0);
        }, 0);
}

const totalWithControls = findInstructions(input);
console.log('Part 2:', totalWithControls);