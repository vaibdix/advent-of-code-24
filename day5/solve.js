#!/usr/bin/env node
const fs = require('fs');

const [ruleStr, updateStr] = fs.readFileSync('input.txt', 'utf8').trim().split('\n\n');

const rules = ruleStr.split('\n')
    .filter(Boolean)
    .map(l => l.split('|').map(Number));

const updates = updateStr.split('\n')
    .filter(Boolean)
    .map(l => l.split(',').map(Number));

const isValid = update => !rules.some(([before, after]) =>
    update.some((n1, i) =>
        update.slice(i + 1).some(n2 => n1 === after && n2 === before)
    )
);

// Part 1: Sum of middle numbers from valid updates
console.log("Part 1:",
    updates.reduce((sum, update) =>
        sum + (isValid(update) ? update[Math.floor(update.length / 2)] : 0), 0
    )
);
