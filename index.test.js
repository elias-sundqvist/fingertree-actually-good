const fc = require('fast-check');
const fingertree = require('.');

const arrMeasure = {
    base: () => 1,
    sum: (x, y) => x + y,
    zero: () => 0
};

const t = fingertree(arrMeasure);

test('Concating two trees should retain all elements in the same order.', () => {
    fc.assert(
        fc.property(fc.string(0,10000), fc.string(0,10000), (a1, a2) => {
            const t1 = t.appendMany(a1);
            expect([...a1]).toEqual(t1.flatten());
            const t2 = t.appendMany(a2);
            expect([...a2]).toEqual(t2.flatten());
            const tc = t1.concat(t2);
            expect(tc.flatten()).toEqual([...a1, ...a2]);
        })
    );
});

test('fingertree based array should index correctly ', ()=>{
    fc.assert(
        fc.property(fc.string(0,10000), (a1)=>{
            const t1 = t.appendMany(a1);
            fc.property(fc.integer(0,a1.length), (i)=>{
                expect(t1.firstMatch(x=>x>i)).toEqual(a1[i]);
            })
        } )
    )
});

test('fingertree based array should split correctly ', ()=>{
    fc.assert(
        fc.property(fc.string(2,10000), (a1)=>{
            const t1 = t.appendMany(a1);
            fc.property(fc.integer(2,a1.length), (i)=>{
                const [left, right] = t1.split(x=>x>i);
                expect(right.head()).toEqual(a1[i]);
                expect(left.last()).toEqual(a1[i-1]);
                expect(left.flatten()).toEqual([...a1.substring(0,i)]);
                expect(right.flatten()).toEqual([...a1.substring(i)]);
            })
        } )
    )
});


test('Appending and prepending should work', ()=>{
    const a = t.prependMany("Hello").append("To").prepend("You").appendMany("This").flatten();
    expect(a).toEqual(["You", 'o','l','l','e','H',"To",'T','h','i','s'])
});

test('Finger Tree should support spreading', ()=>{
    const l = [1,2,3,4,5];
    const t2 = t.appendMany(l);
    expect([...t2]).toEqual(l)
});

test('First match should give first match',()=>{
    const l = ['one','two','three','four','five','six'];
    const t2 = t.appendMany(l);
    expect(t2.firstMatch(x=>x>3)).toEqual('four');
});

test('Drop while should drop until predicate is true', ()=>{
    const l = ['one','two','three','four','five','six'];
    const t2 = t.appendMany(l);
    expect(t2.dropWhile(x=>x<3).flatten()).toEqual(['three','four','five','six']);
});

test('Drop while should drop until predicate is true', ()=>{
    const l = ['one','two','three','four','five','six'];
    const t2 = t.appendMany(l);
    expect(t2.dropWhile(x=>x<3).flatten()).toEqual(['three','four','five','six']);
});

test('Take while should take while predicate is true', ()=>{
    const l = ['one','two','three','four','five','six'];
    const t2 = t.appendMany(l);
    expect(t2.takeWhile(x=>x<3).flatten()).toEqual(['one', 'two']);
});

test('Measure should work', ()=>{
    const prodMeasure = {
        base: x=>x,
        sum: (x,y)=>x*y,
        zero: ()=>1
    };
    const prodTree = fingertree(prodMeasure);
    expect(prodTree.appendMany([1,2,3,4,5,6]).measure()).toEqual(720);
});

test('Init should remove last element', ()=>{
    const t2 = t.appendMany([1,2,3,4,5,6,7,8,9,10]);
    expect(t2.init().flatten()).toEqual([1,2,3,4,5,6,7,8,9])
});

test('Tail should remove first element', ()=>{
    const t2 = t.appendMany([1,2,3,4,5,6,7,8,9,10]);
    expect(t2.tail().flatten()).toEqual([2,3,4,5,6,7,8,9,10])
});


test('Head should return first element', ()=>{
    const t2 = t.appendMany([1,2,3,4,5,6,7,8,9,10]);
    expect(t2.head()).toEqual(1)
});

test('Last should return last element', ()=>{
    const t2 = t.appendMany([1,2,3,4,5,6,7,8,9,10]);
    expect(t2.last()).toEqual(10)
});

test('Splitting should work for all indices', ()=>{
    const l100 = Array.from(new Array(100),(v,k)=>k);
    const t2 = t.appendMany(l100);
    for(let i = 0; i<100; i++) {
        const [left, right] = t2.split(x => x > i);
        expect(left.flatten()).toEqual(l100.slice(0,i))
        expect(right.flatten()).toEqual(l100.slice(i,100))
    }
});

