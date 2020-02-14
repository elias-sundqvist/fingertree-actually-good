const NoCache = {_t: "NoCache"};

//Node
const Branch2 = {_t: "Branch2"};
const branch2 = (a, b) => ({t: Branch2, a, b, _mCache: NoCache});
const Branch3 = {_t: "Branch3"};
const branch3 = (a, b, c) => ({t: Branch3, a, b, c, _mCache: NoCache});

//Affix
const One = {_t: "One"};
const one = (a) => ({t: One, a, _mCache: NoCache});
const Two = {_t: "Two"};
const two = (a, b) => ({t: Two, a, b, _mCache: NoCache});
const Three = {_t: "Three"};
const three = (a, b, c) => ({t: Three, a, b, c, _mCache: NoCache});
const Four = {_t: "Four"};
const four = (a, b, c, d) => ({t: Four, a, b, c, d, _mCache: NoCache});

//Tree
const Single = {_t: "Single"};
const single = (content) => ({t: Single, content, _mCache: NoCache});
const Empty = {_t: "Empty"};
const empty = () => ({t: Empty, _mCache: NoCache});
const Deep = {_t: "Deep"};
const deep = (left, middle, right) => ({t: Deep, left, middle, right, _mCache: NoCache});

const nodeToAffix = (n) => {
    switch (n.t) {
        case Branch2:
            return two(n.a,n.b);
        case Branch3:
            return three(n.a, n.b, n.c);
        default:
            throw "nodeToAffix called on incompatible type!"
    }
};

const nodeToList = (n) => {
    switch (n.t) {
        case Branch2:
            return [n.a, n.b];
        case Branch3:
            return [n.a, n.b, n.c];
        default:
            throw "nodeToList called on incompatible type!"
    }
};


const affixPrepend = (affix, x) => {
    const {a, b, c} = affix;
    switch (affix.t) {
        case Three:
            return four(x, a, b, c);
        case Two:
            return three(x, a, b,);
        case One:
            return two(x, a);
        default:
            throw "affixPrepend called on incompatible type!";
    }
};

const affixAppend = (affix, x) => {
    const {a, b, c} = affix;
    switch (affix.t) {
        case Three:
            return four(a, b, c, x);
        case Two:
            return three(a, b, x);
        case One:
            return two(a, x);
        default:
            throw "affixAppend called on incompatible type!";
    }
};


function affixToList(affix) {
    const {a, b, c, d} = affix;
    switch (affix.t) {
        case Four:
            return [a, b, c, d];
        case Three:
            return [a, b, c];
        case Two:
            return [a, b];
        case One:
            return [a];
        default:
            throw "affixToList called on incompatible type!";
    }
}

function listToAffix(lst) {
    switch (lst.length) {
        case 1:
            return one(...lst);
        case 2:
            return two(...lst);
        case 3:
            return three(...lst);
        case 4:
            return four(...lst);
        default:
            throw "Invalid list length! Can't convert to affix."
    }
}

function affixToTree(affix) {
    const {a, b, c, d} = affix;
    switch (affix.t) {
        case Four:
            return deep(two(a, b), empty(), two(c, d));
        case Three:
            return deep(one(a), empty(), two(b, c));
        case Two:
            return deep(one(a), empty(), one(b));
        case One:
            return single(a);
        default:
            throw "affixToList called on incompatible type!";
    }
}

const prepend = (o, x) => {
    switch (o.t) {
        case Empty:
            return single(x);
        case Single:
            return deep(one(x), empty(), one(o.content));
        case Deep:
            const l = o.left;
            switch (l.t) {
                case Four:
                    const node = branch3(l.b, l.c, l.d);
                    return deep(two(x, l.a), prepend(o.middle, node), o.right);
                default:
                    return deep(affixPrepend(o.left, x), o.middle, o.right)
            }
        default:
            throw "prepend called on incompatible type!";
    }
};

const append = (o, x) => {
    switch (o.t) {
        case Empty:
            return single(x);
        case Single:
            return deep(one(o.content), empty(), one(x));
        case Deep:
            const r = o.right;
            switch (r.t) {
                case Four:
                    const node = branch3(r.a, r.b, r.c);
                    return deep(o.left, append(o.middle, node), two(r.d, x));
                default:
                    return deep(o.left, o.middle, affixAppend(o.right, x))
            }
        default:
            throw "append called on incompatible type!";
    }
};

const viewl = (o) => {
    switch (o.t) {
        case Empty:
            return null;
        case Single:
            return [o.content, empty()];
        case Deep:
            const l = o.left;
            const m = o.middle;
            const r = o.right;
            switch (l.t) {
                case One:
                    const deeper = viewl(m);
                    if (deeper) {
                        let [node, rest] = deeper;
                        return [l.a, deep(nodeToAffix(node), rest, r)]
                    } else {
                        switch (r.t) {
                            case One:
                                return [l.a, single(r.a)];
                            case Two:
                                return [l.a, deep(one(r.a), empty(), one(r.b))];
                            case Three:
                                return [l.a, deep(two(r.a, r.b), empty(), one(r.c))];
                            case Four:
                                return [l.a, deep(three(r.a, r.b, r.c), empty(), one(r.d))];
                            default:
                                throw "Invalid finger tree! Expected affix.";
                        }
                    }
                case Two:
                    return [l.a, deep(one(l.b), m, r)];
                case Three:
                    return [l.a, deep(two(l.b, l.c), m, r)];
                case Four:
                    return [l.a, deep(three(l.b, l.c, l.d), m, r)];
                default:
                    throw "Invalid finger tree! Expected affix.";
            }
        default:
            throw "viewl called on incompatible type!";
    }
};

const viewr = (o) => {
    switch (o.t) {
        case Empty:
            return null;
        case Single:
            return [o.content, empty()];
        case Deep:
            const l = o.left;
            const m = o.middle;
            const r = o.right;
            switch (r.t) {
                case One:
                    const deeper = viewr(m);
                    if (deeper) {
                        let [node, rest] = deeper;
                        return [r.a, deep(l, rest, nodeToAffix(node))]
                    } else {
                        switch (l.t) {
                            case One:
                                return [r.a, single(l.a)];
                            case Two:
                                return [r.a, deep(one(l.a), empty(), one(l.b))];
                            case Three:
                                return [r.a, deep(one(l.a), empty(), two(l.b, l.c))];
                            case Four:
                                return [r.a, deep(one(l.a), empty(), three(l.b, l.c, l.d))];
                            default:
                                throw "Invalid finger tree! Expected affix.";
                        }
                    }
                case Two:
                    return [r.b, deep(l, m, one(r.a))];
                case Three:
                    return [r.c, deep(l, m, two(r.a, r.b))];
                case Four:
                    return [r.d, deep(l, m, three(r.a, r.b, r.c))];
                default:
                    throw "Invalid finger tree! Expected affix.";
            }
        default:
            throw "viewl called on incompatible type!";
    }
};

const treeHead = (o) => {
    switch (o.t) {
        case Empty:
            return null;
        case Single:
            return o.content;
        case Deep:
            return o.left.a;
        default:
            throw "treeHead called on incompatible type!";
    }
};

const treeTail = (o) => {
    const res = viewl(o);
    return res ? res[1] : null;
};

const treeLast = (o) => {
    switch (o.t) {
        case Empty:
            return null;
        case Single:
            return o.content;
        case Deep:
            const r = o.right;
            switch (r.t) {
                case One:
                    return r.a;
                case Two:
                    return r.b;
                case Three:
                    return r.c;
                case Four:
                    return r.d;
                default:
                    throw "invalid tree structure! Expected Node.";
            }
        default:
            throw "treeLast called on incompatible type!";
    }
};

const treeInit = (o) => {
    const res = viewr(o);
    return res ? res[1] : null;
};

const appendMany = (o, lst) => {
    for (const v of lst) {
        o = append(o, v)
    }
    return o;
};

function* treeToIter(o) {
    while (o.t !== Empty) {
        const [x, xs] = viewl(o);
        o = xs;
        yield x;
    }
}

const prependMany = (o, lst) => {
    for (const v of lst) {
        o = prepend(o, v)
    }
    return o;
};

function* revArrIter(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        yield arr[i];
    }
}

function* concatIters(iter1, iter2) {
    for (let v of iter1) yield v;
    for (let v of iter2) yield v;
}


// convert list elements to list of 2/3 branches
const listToNodes = (lst) => {
    if (lst.length < 2) throw "Not enough elements for nodes!";
    const resArr = [];
    const it = lst[Symbol.iterator]();
    if (lst.length % 2) {
        let r1 = it.next();
        let r2 = it.next();
        let r3 = it.next();
        resArr.push(branch3(r1.value, r2.value, r3.value))
    }
    while (true) {
        let r1 = it.next();
        if (r1.done) break;
        let r2 = it.next();
        resArr.push(branch2(r1.value, r2.value))
    }
    return resArr;
};

const concatWithMiddle = (o1, mid, o2) => {
    if (o1.t === Empty) return prependMany(o2, revArrIter(mid));
    if (o1.t === Single) return prependMany(o2, concatIters(revArrIter(mid), [o1.content]));
    if (o2.t === Empty) return appendMany(o1, mid);
    if (o2.t === Single) return appendMany(o1, concatIters(mid, [o2.content]));
    if (!(o1.t === Deep && o2.t === Deep)) throw "concatWithMiddle called with unexpected tree types!";
    const l1 = o1.left;
    const m1 = o1.middle;
    const r1 = o1.right;
    const l2 = o2.left;
    const m2 = o2.middle;
    const r2 = o2.right;
    const deeperMid = listToNodes([...affixToList(r1), ...mid, ...affixToList(l2)]);
    const deeper = concatWithMiddle(m1, deeperMid, m2);
    return deep(l1, deeper, r2)
};

const concat = (o1, o2) => concatWithMiddle(o1, [], o2);

const measure = (o, m) => {
    if (o._mCache === undefined) return m.base(o);
    if (o._mCache !== NoCache) return o._mCache;
    //This covers everything, nodes, affixes, and trees
    let result;
    switch (o.t) {
        case Empty:
            result = m.zero();
            break;
        case Single:
            result = measure(o.content, m);
            break;
        case Deep:
            result = m.sum(measure(o.left, m), m.sum(measure(o.middle, m), measure(o.right, m)));
            break;
        case Branch2:
            result = m.sum(measure(o.a, m), measure(o.b, m));
            break;
        case Branch3:
            result = m.sum(measure(o.a, m), m.sum(measure(o.b, m), measure(o.c, m)));
            break;
        case One:
            result = measure(o.a, m);
            break;
        case Two:
            result = m.sum(measure(o.a, m), measure(o.b, m));
            break;
        case Three:
            result = m.sum(measure(o.a, m), m.sum(measure(o.b, m), measure(o.c, m)));
            break;
        case Four:
            result = m.sum(measure(o.a, m), m.sum(measure(o.b, m), m.sum(measure(o.c, m), measure(o.d, m))));
            break;
        default:
            throw "This shouldn't happen!"
    }
    o._mCache = result;
    return result;
};


const deepWithRebalance = (leftArr, middle, rightArr) => {
    if (leftArr.length === 0 && rightArr.length === 0) {
        const deeper = viewl(middle);
        if (!deeper) return empty();
        const [x, rest] = deeper;
        return deepWithRebalance(nodeToList(x), rest, [])
    }
    if (leftArr.length === 0) {
        const deeper = viewl(middle);
        if (!deeper) return affixToTree(listToAffix(rightArr));
        const [x, rest] = deeper;
        return deepWithRebalance(nodeToList(x), rest, rightArr)
    }
    if (rightArr.length === 0) {
        const deeper = viewr(middle);
        if (!deeper) return affixToTree(listToAffix(leftArr));
        const [x, rest] = deeper;
        return deepWithRebalance(leftArr, rest, nodeToList(x))
    }
    if (leftArr.length > 4 || rightArr.length > 4) throw "Affixes cannot be longer than 4 elements";
    return deep(listToAffix(leftArr), middle, listToAffix(rightArr))
};

const splitList = (lst, m, pred, offset) => {
    let splitPoint = 0;
    while (true) {
        offset = m.sum(offset, measure(lst[splitPoint], m));
        if (pred(offset)) break;
        splitPoint++;
    }
    return [lst.slice(0, splitPoint), lst.slice(splitPoint)]
};

const chunkToTree = (xs) => {
    if (xs.length <= 0) return empty();
    return affixToTree(listToAffix(xs))
};

const splitWithMid = (o, m, pred, offset) => {
    switch (o.t) {
        case Empty:
            return null;
        case Single:
            return pred(m.sum(offset, measure(o, m))) ? [empty(), o.content, empty()] : null;
        case Deep: {
            if (!pred(m.sum(offset, measure(o, m)))) return null;
            let offset2 = m.sum(offset, measure(o.left, m));
            // if split point in prefix
            if (pred(offset2)) {
                const [before, [x, ...after]] = splitList(affixToList(o.left), m, pred, offset);
                return [chunkToTree(before), x, deepWithRebalance(after, o.middle, affixToList(o.right))]
            }
            let offset3 = m.sum(offset2, measure(o.middle, m));
            // if split point in the deeper tree
            if (pred(offset3)) {
                const [before, node, after] = splitWithMid(o.middle, m, pred, offset2);
                const [beforeNode, [x, ...afterNode]] = splitList(nodeToList(node), m, pred, m.sum(offset2, measure(before, m)));
                return [deepWithRebalance(affixToList(o.left), before, beforeNode), x, deepWithRebalance(afterNode, after, affixToList(o.right))]
            }
            // otherwise it must be in the suffix
            const [before, [x, ...after]] = splitList(affixToList(o.right), m, pred, offset3);
            return [deepWithRebalance(affixToList(o.left), o.middle, before), x, chunkToTree(after)]
        }
        default:
            throw "splitWithMid called on incompatible type!"
    }
};

const NoOffset = {};

class FingerTree {
    constructor(measure, tree) {
        this.m = measure;
        if (!tree) this.t = empty();
        else this.t = tree;
    }

    appendMany(iter) {
        return new FingerTree(this.m, appendMany(this.t, iter))
    }

    prependMany(iter) {
        return new FingerTree(this.m, prependMany(this.t, iter))
    }

    append(x) {
        return new FingerTree(this.m, append(this.t, x))
    }

    prepend(x) {
        return new FingerTree(this.m, prepend(this.t, x))
    }

    head() {
        return treeHead(this.t)
    }

    tail() {
        return new FingerTree(this.m, treeTail(this.t))
    }

    last() {
        return treeLast(this.t)
    }

    init() {
        return new FingerTree(this.m, treeInit(this.t))
    }

    measure() {
        return measure(this.t, this.m)
    }

    split(pred, offset = NoOffset) {
        if (offset === NoOffset) offset = this.m.zero();
        if (!pred(this.m.sum(offset, measure(this.t, this.m)))) return [this, new FingerTree(this.m)];
        const [before, x, after] = splitWithMid(this.t, this.m, pred, offset);
        return [new FingerTree(this.m, before), new FingerTree(this.m, prepend(after, x))]
    }

    takeUntil(pred, offset) {
        return this.split(pred, offset)[0]
    }

    dropUntil(pred, offset) {
        return this.split(pred, offset)[1]
    }

    takeWhile(pred, offset) {
        return this.takeUntil(x => !pred(x), offset)
    }

    dropWhile(pred, offset) {
        return this.dropUntil(x => !pred(x), offset)
    }

    firstMatch(pred, offset) {
        return this.dropUntil(pred, offset).head()
    }

    concat(fingerTree2) {
        if (this.m !== fingerTree2.m) throw "Can't concatenate finger trees with different measures!";
        return new FingerTree(this.m, concat(this.t, fingerTree2.t));
    }

    flatten() {
        return [...treeToIter(this.t)];
    }

    * [Symbol.iterator]() {
        for (const x of treeToIter(this.t)) yield x;
    }
}

const fingertree = measure => new FingerTree(measure);

module.exports = fingertree;