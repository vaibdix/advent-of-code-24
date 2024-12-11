#!/usr/bin/env node

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim();
const map = input.split('\n').map(line => line.split('').map(Number));

// Part 1: Count reachable peaks
function findTrailheadScores(map) {
    const rows = map.length;
    const cols = map[0].length;
    let totalScore = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (map[r][c] === 0) {
                totalScore += calculateTrailheadScore(map, r, c);
            }
        }
    }
    return totalScore;
}

function calculateTrailheadScore(map, startR, startC) {
    const rows = map.length;
    const cols = map[0].length;
    const visited = new Set();
    const reachable9s = new Set();

    function dfs(r, c, currentHeight) {
        const key = `${r},${c}`;
        if (visited.has(key)) return;
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        if (map[r][c] !== currentHeight + 1) return;

        visited.add(key);
        if (map[r][c] === 9) reachable9s.add(key);

        [[r-1,c], [r+1,c], [r,c-1], [r,c+1]].forEach(([nr,nc]) =>
            dfs(nr, nc, map[r][c])
        );
    }

    [[startR-1,startC], [startR+1,startC], [startR,startC-1], [startR,startC+1]]
        .forEach(([r,c]) => {
            if (r >= 0 && r < rows && c >= 0 && c < cols && map[r][c] === 1) {
                dfs(r, c, 0);
            }
        });

    return reachable9s.size;
}

// Part 2: Count distinct paths
function findTrailheadRatings(map) {
    const rows = map.length;
    const cols = map[0].length;
    let totalRating = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (map[r][c] === 0) {
                totalRating += calculateTrailheadRating(map, r, c);
            }
        }
    }
    return totalRating;
}

function calculateTrailheadRating(map, startR, startC) {
    const rows = map.length;
    const cols = map[0].length;
    const paths = new Set();

    function dfs(r, c, currentHeight, path) {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        if (map[r][c] !== currentHeight + 1) return;

        path = path + `${r},${c};`;

        if (map[r][c] === 9) {
            paths.add(path);
            return;
        }

        [[r-1,c], [r+1,c], [r,c-1], [r,c+1]].forEach(([nr,nc]) =>
            dfs(nr, nc, map[r][c], path)
        );
    }

    [[startR-1,startC], [startR+1,startC], [startR,startC-1], [startR,startC+1]]
        .forEach(([r,c]) => {
            if (r >= 0 && r < rows && c >= 0 && c < cols && map[r][c] === 1) {
                dfs(r, c, 0, '');
            }
        });

    return paths.size;
}

console.log('Part 1:', findTrailheadScores(map));
console.log('Part 2:', findTrailheadRatings(map));