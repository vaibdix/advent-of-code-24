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

// Part 2
const disk2 = makeDisk(input);
for (let el = Math.max(...disk2); el > 0; el--) {
    const count = disk2.filter(x => x === el).length;
    for (let i = 0; i < disk2.length; i++) {
        if (disk2[i] === -1) {
            let spaces = 0;
            while (disk2[i + spaces] === -1 && i + spaces < disk2.length) spaces++;
            if (spaces >= count) {
                let found = 0;
                for (let j = disk2.length - 1; j >= i + count; j--) {
                    if (disk2[j] === el) {
                        disk2[j] = -1;
                        disk2[i + found++] = el;
                    }
                }
                break;
            }
        }
    }
}
console.log('Part 2:', disk2.reduce((a, v, i) => v !== -1 ? a + v * i : a, 0));