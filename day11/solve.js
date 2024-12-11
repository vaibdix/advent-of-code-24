#!/usr/bin/env node

const fs = require('fs');

function processStones(stones, blinks) {
    for (let i = 0; i < blinks; i++) {
        let newStones = [];

        for (let stone of stones) {
            if (stone === '0') {
                newStones.push('1');
                continue;
            }
            if (stone.length % 2 === 0) {
                const mid = Math.floor(stone.length / 2);
                const left = stone.slice(0, mid).replace(/^0+/, '') || '0';
                const right = stone.slice(mid).replace(/^0+/, '') || '0';
                newStones.push(left, right);
                continue;
            }
            const result = (BigInt(stone) * 2024n).toString();
            newStones.push(result);
        }

        stones = newStones;
    }

    return stones.length;
}


const input = fs.readFileSync('input.txt', 'utf8').trim();
const stones = input.split(/\s+/);
const result = processStones(stones, 25);
console.log(result);