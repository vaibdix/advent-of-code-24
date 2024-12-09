#!/usr/bin/env node
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim();

const makeDisk = str => {
    let disk = [], isFile = true, counter = 0;
    for (const c of str) {
        disk.push(...Array(Number(c)).fill(isFile ? counter++ : -1));
        isFile = !isFile;
    }
    return disk;
}

// Part 1
const disk1 = makeDisk(input);
let i = 0;
while (i < disk1.length) {
    if (disk1[i] === -1) {
        let temp;
        do { temp = disk1.pop(); } while (temp === -1 && disk1.length > i);
        if (temp !== undefined && temp !== -1) disk1[i++] = temp;
    } else i++;
}
console.log('Part 1:', disk1.reduce((a, v, i) => a + v * i, 0));

