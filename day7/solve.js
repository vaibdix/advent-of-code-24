#!/usr/bin/env node
const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

const evaluateExpr1 = (nums, ops) => nums.reduce((result, num, i) =>
    i === 0 ? num : ops[i - 1] === '+' ? result + num : result * num, 0);

const evaluateExpr2 = (nums, ops) => nums.reduce((result, num, i) => {
    if (i === 0) return num;
    switch (ops[i - 1]) {
        case '+': return result + num;
        case '*': return result * num;
        case '||': return parseInt(`${result}${num}`);
    }
}, 0);

const canMakeValue = (target, nums, ops, evaluate) => {
    if (nums.length === 1) return nums[0] === target;

    const opCount = nums.length - 1;
    const combinations = Math.pow(ops.length, opCount);

    return Array.from({ length: combinations }, (_, i) => {
        const operators = Array.from({ length: opCount }, (_, j) => {
            const divisor = Math.pow(ops.length, j);
            return ops[Math.floor(i / divisor) % ops.length];
        });
        return evaluate(nums, operators) === target;
    }).some(Boolean);
};

const solve = (input, ops, evaluate) =>
    input.reduce((sum, line) => {
        const [target, numsStr] = line.split(': ');
        const nums = numsStr.split(' ').map(Number);
        return sum + (canMakeValue(Number(target), nums, ops, evaluate) ? Number(target) : 0);
    }, 0);

console.log("Part 1:",
    solve(input, ['+', '*'], evaluateExpr1)
);

console.log("Part 2:",
    solve(input, ['+', '*', '||'], evaluateExpr2)
);