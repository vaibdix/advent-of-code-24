#!/usr/bin/env node
const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

const findStart = grid => {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '^') return { x, y, dir: '^' };
        }
    }
};

const directions = {
    '^': { dx: 0, dy: -1, right: '>' },
    '>': { dx: 1, dy: 0, right: 'v' },
    'v': { dx: 0, dy: 1, right: '<' },
    '<': { dx: -1, dy: 0, right: '^' }
};

const isOutOfBounds = (x, y, grid) =>
    y < 0 || y >= grid.length || x < 0 || x >= grid[0].length;

const followPath = (grid, start) => {
    const visited = new Set();
    let current = { ...start };

    while (true) {
        visited.add(`${current.x},${current.y}`);

        const nextX = current.x + directions[current.dir].dx;
        const nextY = current.y + directions[current.dir].dy;

        if (isOutOfBounds(nextX, nextY, grid)) break;

        if (grid[nextY][nextX] === '#') {
            current.dir = directions[current.dir].right;
        } else {
            current.x = nextX;
            current.y = nextY;
        }
    }

    return visited.size;
};

const grid = input.map(line => line.split(''));
const start = findStart(grid);
console.log("Part 1:", followPath(grid, start));