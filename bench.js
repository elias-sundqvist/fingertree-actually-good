const Benchmark = require('benchmark');
let suite = new Benchmark.Suite();
const fingertree = require('.');

const arrMeasure = {
    base: () => 1,
    sum: (x, y) => x + y,
    zero: () => 0
};

function* range(max) {
    for (let i = 0; i < max; i++) yield i;
}

const t0 = fingertree(arrMeasure);
const ts = [[t0, 0], ...[...range(7)].map(x => 10 ** x).map(x => [t0.appendMany(range(x)), x])];

for (const [tree, n] of ts) {
    suite = suite.add(`FingerTree#PrependTo${n}ElemTree`, () => {
        tree.prepend("New Element");
    })
}

for (const [tree, n] of ts) {
    suite = suite.add(`FingerTree#AppendTo${n}ElemTree`, () => {
        tree.append("New Element");
    })
}

for (const [tree, n] of ts) {
    suite = suite.add(`FingerTree#TailOf${n}ElemTree`, () => {
        tree.tail();
    })
}

for (const [tree, n] of ts) {
    suite = suite.add(`FingerTree#Measure${n}ElemTree`, () => {
        tree.measure();
    })
}

for (const [tree, n] of ts) {
    suite = suite.add(`FingerTree#RandomSplit${n}ElemTree`, () => {
        const i = Math.floor(Math.random() * n);
        tree.split(x => x > i);
    })
}

for (const [tree, n] of ts) {
    for (const [tree2, n2] of ts) {
        suite = suite.add(`FingerTree#Concat${n}ElemTreeWith${n2}ElemTree`, () => {
            tree.concat(tree2);
        })
    }
}

suite.on('cycle', event => {
    // Output benchmark result by converting benchmark result to string
    console.log(String(event.target));
}).run();