#!/usr/bin/env node

const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8')
    .trim()
    .split('\n')
    .map(line => line.split(''));

function findXMAS(grid) {
    const directions = [
        [-1,-1], [-1,0], [-1,1],
        [0,-1],          [0,1],
        [1,-1],  [1,0],  [1,1]
    ];

    let count = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 'X') {
                for (const [dx, dy] of directions) {
                    let valid = true;
                    const word = 'XMAS';

                    for (let k = 0; k < word.length; k++) {
                        const newI = i + dx * k;
                        const newJ = j + dy * k;

                        if (newI < 0 || newI >= grid.length ||
                            newJ < 0 || newJ >= grid[i].length ||
                            grid[newI][newJ] !== word[k]) {
                            valid = false;
                            break;
                        }
                    }
                    if (valid) count++;
                }
            }
        }
    }
    return count;
}


const part1 = findXMAS(input);
console.log('Part 1:', part1);
