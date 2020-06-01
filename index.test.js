const fc = require("fast-check");
const fingertree = require(".");

const arrMeasure = {
  base: () => 1,
  sum: (x, y) => x + y,
  zero: () => 0,
};

const t = fingertree(arrMeasure);

test("Concating two trees should retain all elements in the same order.", () => {
  fc.assert(
    fc.property(fc.string(0, 10000), fc.string(0, 10000), (a1, a2) => {
      const t1 = t.appendMany(a1);
      expect([...a1]).toEqual(t1.flatten());
      const t2 = t.appendMany(a2);
      expect([...a2]).toEqual(t2.flatten());
      const tc = t1.concat(t2);
      expect(tc.flatten()).toEqual([...a1, ...a2]);
    })
  );
});

test("fingertree based array should index correctly ", () => {
  fc.assert(
    fc.property(fc.string(0, 10000), (a1) => {
      const t1 = t.appendMany(a1);
      fc.property(fc.integer(0, a1.length), (i) => {
        expect(t1.firstMatch((x) => x > i)).toEqual(a1[i]);
      });
    })
  );
});

test("fingertree based array should split correctly ", () => {
  fc.assert(
    fc.property(fc.string(2, 10000), (a1) => {
      const t1 = t.appendMany(a1);
      fc.property(fc.integer(2, a1.length), (i) => {
        const [left, right] = t1.split((x) => x > i);
        expect(right.head()).toEqual(a1[i]);
        expect(left.last()).toEqual(a1[i - 1]);
        expect(left.flatten()).toEqual([...a1.substring(0, i)]);
        expect(right.flatten()).toEqual([...a1.substring(i)]);
      });
    })
  );
});

test("Appending and prepending should work", () => {
  const a = t
    .prependMany("Hello")
    .append("To")
    .prepend("You")
    .appendMany("This")
    .flatten();
  expect(a).toEqual(["You", "o", "l", "l", "e", "H", "To", "T", "h", "i", "s"]);
});

test("Finger Tree should support spreading", () => {
  const l = [1, 2, 3, 4, 5];
  const t2 = t.appendMany(l);
  expect([...t2]).toEqual(l);
});

test("First match should give first match", () => {
  const l = Array.from(new Array(100), (v, k) => k + 5);
  const t2 = t.appendMany(l);
  expect(Object.keys(l).map((n) => t2.firstMatch((x) => x > n))).toEqual(l);
});

test("Drop while should drop until predicate is true", () => {
  const l = ["one", "two", "three", "four", "five", "six"];
  const t2 = t.appendMany(l);
  expect(t2.dropWhile((x) => x < 3).flatten()).toEqual([
    "three",
    "four",
    "five",
    "six",
  ]);
});

test("Drop while should drop until predicate is true", () => {
  const l = ["one", "two", "three", "four", "five", "six"];
  const t2 = t.appendMany(l);
  expect(t2.dropWhile((x) => x < 3).flatten()).toEqual([
    "three",
    "four",
    "five",
    "six",
  ]);
});

test("Take while should take while predicate is true", () => {
  const l = ["one", "two", "three", "four", "five", "six"];
  const t2 = t.appendMany(l);
  expect(t2.takeWhile((x) => x < 3).flatten()).toEqual(["one", "two"]);
});

test("Measure should work", () => {
  const prodMeasure = {
    base: (x) => x,
    sum: (x, y) => x * y,
    zero: () => 1,
  };
  const prodTree = fingertree(prodMeasure);
  expect(prodTree.appendMany([1, 2, 3, 4, 5, 6]).measure()).toEqual(720);
});

test("Init should remove last element", () => {
  const t2 = t.appendMany([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  expect(t2.init().flatten()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("Tail should remove first element", () => {
  const t2 = t.appendMany([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  expect(t2.tail().flatten()).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("Head should return first element", () => {
  const t2 = t.appendMany([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  expect(t2.head()).toEqual(1);
});

test("Last should return last element", () => {
  const t2 = t.appendMany([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  expect(t2.last()).toEqual(10);
});

test("Update head should work", () => {
  const t2 = t.appendMany([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  let t3 = t2;
  for (let i = 0; i < 100; i++) {
    t3 = t3.updateHead((x) => x + 1);
  }
  expect(t3.flatten()).toEqual([101, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  // Original trees should not be affected
  expect(t2.flatten()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("Update last should work", () => {
  const t2 = t.appendMany([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  let t3 = t2;
  for (let i = 0; i < 100; i++) {
    t3 = t3.updateLast((x) => x + 1);
  }
  expect(t3.flatten()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 110]);
  // Original trees should not be affected
  expect(t2.flatten()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("Update first match should work", () => {
  const t2 = t.appendMany([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  let t3 = t2;
  for (let i = 0; i < 5; i++) {
    t3 = t3.updateFirstMatch(
      (x) => 2 * x,
      (x) => x > i
    );
  }
  expect(t3.flatten()).toEqual([2, 4, 6, 8, 10, 6, 7, 8, 9, 10]);
  // Original trees should not be affected
  expect(t2.flatten()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("Map should work", () => {
  const prodMeasure = {
    base: (x) => x,
    sum: (x, y) => x * y,
    zero: () => 1,
  };
  const t2 = t.appendMany([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const t3 = t2.map((x) => x * 2, prodMeasure);
  expect(t3.flatten()).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
  expect(t3.measure()).toEqual(2 * 4 * 6 * 8 * 10 * 12 * 14 * 16 * 18 * 20);
  // Original trees should not be affected
  expect(t2.flatten()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  expect(t2.measure()).toEqual(10);
});

test("mapTrue should work", () => {
  const t2 = t.appendMany([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const t3 = t2.mapTrue(
    (x) => x * 3,
    (x) => x > 5
  );
  expect(t3.flatten()).toEqual([1, 2, 3, 4, 5, 18, 21, 24, 27, 30]);
});

test("mapTrue double odd numbers example should work", () => {
  // in this example we double all the odd numbers
  const myMeasure = {
    base: (x) => ({
      count: 1,
      firstOddPos: x % 2 ? 0 : Number.POSITIVE_INFINITY,
    }),
    sum: (x, y) => ({
      count: x.count + y.count,
      firstOddPos: Math.min(x.firstOddPos, x.count + y.firstOddPos),
    }),
    zero: () => ({ count: 0, firstOddPos: Number.POSITIVE_INFINITY }),
  };
  const t = fingertree(myMeasure);
  const t2 = t.appendMany([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const t3 = t2.mapTrue(
    (x) => x * 2,
    (left, glob) => left.count > glob.firstOddPos
  );
  expect(t3.flatten()).toEqual([2, 2, 6, 4, 10, 6, 14, 8, 18, 10]);
});

test("mapTrue should work use updated global tree", () => {
  const m = {
    base: (x) => ({
      count: 1,
      minBlockingPos: x.isBlocking ? 0 : Number.POSITIVE_INFINITY,
      maximumReach: x.reach,
    }),
    sum: (x, y) => ({
      count: x.count + y.count,
      minBlockingPos: Math.min(x.minBlockingPos, x.count + y.minBlockingPos),
      maximumReach: Math.max(x.maximumReach, x.count + y.maximumReach),
    }),
    zero: () => ({
      count: 0,
      minBlockingPos: Number.POSITIVE_INFINITY,
      maximumReach: Number.NEGATIVE_INFINITY,
    }),
  };
  let t = fingertree(m);
  const t2 = t.appendMany([
    { reach: 5, isBlocking: false },
    { reach: 1, isBlocking: false },
    { reach: 3, isBlocking: false },
    { reach: 0, isBlocking: true },
    { reach: 1, isBlocking: false },
    { reach: 1, isBlocking: false },
    { reach: 0, isBlocking: true },
  ]);
  const t3 = t2.mapTrue(
    () => {
      return {
        reach: 0,
        isBlocking: false,
      };
    },
    (left, glob) => {
      return left.maximumReach >= glob.minBlockingPos;
    }
  );
  expect(t3.flatten()).toEqual([
    { reach: 0, isBlocking: false },
    { reach: 1, isBlocking: false },
    { reach: 0, isBlocking: false },
    { reach: 0, isBlocking: false },
    { reach: 1, isBlocking: false },
    { reach: 0, isBlocking: false },
    { reach: 0, isBlocking: false },
  ]);
});

test("Splitting empty tree should return empty trees", () => {
  expect(t.split((x) => false)).toEqual([t, t]);
  expect(t.split((x) => true)).toEqual([t, t]);
});

test("Splitting should work for all indices", () => {
  const l100 = Array.from(new Array(100), (v, k) => k);
  const t2 = t.appendMany(l100);
  for (let i = 0; i < 100; i++) {
    const [left, right] = t2.split((x) => x > i);
    expect(left.flatten()).toEqual(l100.slice(0, i));
    expect(right.flatten()).toEqual(l100.slice(i, 100));
  }
});

test("isEmpty should correctly tell wether the tree is empty", () => {
  expect(t.isEmpty()).toBeTruthy();
  expect(t.append(1).isEmpty()).toBeFalsy();
});
