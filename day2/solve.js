#!/usr/bin/env node

const fs = require('fs');

let dat;
try {
    const fileContent = fs.readFileSync('input.txt', 'utf8');
    dat = fileContent.split('\n')
        .filter(line => line.trim())
        .map(line => line.match(/\d+/g).map(Number));
} catch (err) {
    console.error('Error reading file:', err);
    process.exit(1);
}

function safe(s) {
    s = Array.from(s);
    let s_ = Array.from(s).sort((a,b) => a-b);
    if (arraysEqual(s, s_) || arraysEqual(s, s_.reverse())) {
        for (let i = 0; i < s.length - 1; i++) {
            if (s[i] === s[i+1] || Math.abs(s[i] - s[i+1]) > 3) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

console.log(dat.filter(i => safe(i)).length);
