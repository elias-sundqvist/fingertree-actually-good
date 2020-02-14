/**
 * Create an empty fingertree which uses the provided measure monoid
 *
 * **Example**:
 * ```js
 * const arrayListMeasure = {
 *     base: ()=>1,
 *     sum: (x,y)=>x+y,
 *     zero: ()=>0
 * }
 * const myTree = fingertree(arrayListMeasure)
 * ```
 *
 * @typeparam MeasureMonoid - The measure to be used by the tree
 * @typeparam Element - The type of elements stored by the tree
 * @typeparam MeasureValue - The type of values returned by the measure
 * @param measure The measure monoid that should be used by the tree.
 */
export function fingertree<MeasureMonoid extends Measure<Element, MeasureValue>, Element, MeasureValue>(measure: MeasureMonoid): FingerTree<MeasureMonoid, Element, MeasureValue>;

/**
 * A measure can be any monoid.
 * @typeparam Element - The type of elements which are measured by the monoid
 * @typeparam MeasureValue - The type of values returned returned by the monoid
 *
 * **Example**:
 * ```js
 * const arrayListMeasure = {
 *     base: ()=>1,
 *     sum: (x,y)=>x+y,
 *     zero: ()=>0
 * }
 * ```
 */
interface Measure<Element, MeasureValue> {
    /**
     * Base is used to compute the initial measure of each element in the tree
     * @param x an initial element of type Element
     * @returns the initial measure for the element
     * 
     * Example:
     * ```js
     * // used for array lists
     * base: () => 1;
     * ```
     */
    base(x: Element): MeasureValue,

    /**
     * Sum is used to combine the measures of two nodes in the tree.
     * A monoid should be commutative, so sum(a,sum(b,c)) === sum(sum(a,b),c)
     *
     * @param x the measure of the first part
     * @param y the measure of the second part
     * @returns the combined measure
     *
     * **Example**:
     * ```js
     * // used for array lists
     * sum: (x,y) => x+y;
     * ```
     */
    sum(x: MeasureValue, y: MeasureValue): MeasureValue,

    /**
     * The measure of an empty tree.
     * @returns the measure of an empty tree.
     *
     * **Example**:
     * ```js
     * // used for array lists
     * zero: () => 0;
     * ```
     */
    zero(): MeasureValue
}

/**
 * A FingerTree is a persistent functional data structure that can
 * be used to quickly split and combine large sequences arbitrarily.
 * It also gives quick access to the first and last elements of the tree.
 *
 * @typeparam MeasureMonoid - The measure to be used by the tree
 * @typeparam Element - The type of elements stored by the tree
 * @typeparam MeasureValue - The type of values returned by the measure
 */
export class FingerTree<MeasureMonoid extends Measure<Element, MeasureValue>, Element, MeasureValue> implements Iterable<Element> {
    /**
     * **Important!** This is an internal function, don't call this constructor
     * unless you are a developer of the library.
     *
     * Creates a new fingertree based on a measure and an interal tree object ()
     * @param measure The measure monoid that should be used by the tree.
     * @param tree Optionally, an existing interal tree object to be used.
     */
    private constructor(measure: MeasureMonoid, tree?: unknown)

    /**
     * Append all elements from an iterable to the end of the tree.
     *
     *
     * **Complexity**: O(m log n)
     *
     * **Amortized Complexity**: O(m)
     *
     * > where m is the number of appended elements
     * > and n is the current number of elements in the list.
     *
     * **Example**:
     * ```js
     * t = fingertree(myMeasure).appendMany([1,2,3])
     * t.flatten() // -> [1,2,3]
     * ```
     * @param iter an iterable of elements
     * @returns a new fingertree with the elements appended
     */
    appendMany(iter: Iterable<Element>): FingerTree<MeasureMonoid, Element, MeasureValue>

    /**
     * Prepend all elements from an iterable to the start of the tree.
     * Note that this reverses the elements.
     *
     *
     * **Complexity**: O(m log n)
     *
     * **Amortized Complexity**: O(m)
     *
     * > where m is the number of appended elements
     * > and n is the current number of elements in the list.
     *
     * **Example**:
     * ```js
     * t = fingertree(myMeasure).prependMany([1,2,3])
     * t.flatten() // -> [3,2,1]
     * ```
     *
     * @param iter an iterable of elements
     *
     * @returns a new fingertree with the elements prepended
     */
    prependMany(iter: Iterable<Element>): FingerTree<MeasureMonoid, Element, MeasureValue>

    /**
     * Append a single element to the end of the tree.
     *
     * **Complexity**: O(log n)
     *
     * **Amortized Complexity**: O(1)
     *
     * **Example**:
     * ```js
     * const t = fingertree(myMeasure).append(1)
     * t.flatten() // -> [1]
     * const t2 = t.append(4)
     * t2.flatten() // -> [1,4]
     * ```
     *
     * @param x the element to append
     *
     * @returns a new fingertree with the element appended
     */
    append(x: Element): FingerTree<MeasureMonoid, Element, MeasureValue>

    /**
     * Prepend a single element to the start of the tree.
     *
     * **Complexity**: O(log n)
     *
     * **Amortized Complexity**: O(1)
     *
     * **Example**:
     * ```js
     * const t = fingertree(myMeasure).prepend(1)
     * t.flatten() // -> [1]
     * const t2 = t.prepend(4)
     * t2.flatten() // -> [4,1]
     * ```
     *
     *
     * @param x the element to prepend
     *
     * @returns a new fingertree with the element prepended
     */
    prepend(x: Element): FingerTree<MeasureMonoid, Element, MeasureValue>

    /**
     * Get the first element in the tree
     *
     * **Complexity**: O(1)
     *
     * **Amortized Complexity**: O(1)
     *
     *
     * **Example**:
     * ```js
     * const t = fingertree(myMeasure).appendMany([1,2,3,4,5,6])
     * t.head() // 1
     * ```
     *
     * @returns The first element of the tree
     */
    head(): Element

    /**
     * Get a new tree with the first element removed
     *
     * **Complexity**: O(log n)
     *
     * **Amortized Complexity**: O(1)
     *
     *
     * **Example**:
     * ```js
     * const t = fingertree(myMeasure).appendMany([1,2,3,4,5,6])
     * t.tail().flatten() // [2,3,4,5,6]
     * ```
     *
     * @returns A new tree with the first element removed
     */
    tail(): FingerTree<MeasureMonoid, Element, MeasureValue>

    /**
     * Get the last element in the tree
     *
     * **Complexity**: O(1)
     *
     * **Amortized Complexity**: O(1)
     *
     * **Example**:
     * ```js
     * const t = fingertree(myMeasure).appendMany([1,2,3,4,5,6])
     * t.last() // 6
     * ```
     *
     * @returns The first element of the tree
     */
    last(): Element

    /**
     * Get a new tree with the last element removed
     *
     * **Complexity**: O(log n)
     *
     * **Amortized Complexity**: O(1)
     *
     * **Example**:
     * ```js
     * const t = fingertree(myMeasure).appendMany([1,2,3,4,5,6])
     * [...t.init()] // [1,2,3,4,5]
     * ```
     *
     * @returns A new tree with the last element removed
     */
    init(): FingerTree<MeasureMonoid, Element, MeasureValue>

    /**
     * Compute the monoidal sum of all the tree's elements using the tree measure.
     * This method is typically fast due to results being cached.
     *
     * **Example**:
     * ```js
     * const prodMeasure = {
     *     base: (x)=>x,
     *     sum: (x,y)=>x*y,
     *     zero: ()=>1
     * }
     * const t = fingertree(prodMeasure).appendMany([1,2,3,4,5,6])
     * t.measure() // 720 (the product of all the numbers in the tree)
     * ```
     *
     * @returns the monoidal sum of the tree's elements.
     */
    measure(): MeasureValue

    /**
     * Split the tree at the point where the left side
     * is as large as possible without making the predicate true
     *
     * **Complexity**: O(n log n)
     *
     * **Amortized Complexity**: O(n log n)
     *
     * **Example**:
     * ```js
     * const arrayListMeasure = {
     *     base: (x)=>1,
     *     sum: (x,y)=>x+y,
     *     zero: ()=>0
     * }
     * const t = fingertree(arrayListMeasure).appendMany(['a','b','c','d','e','f','g','h','i','j'])
     * const [left, right] = t.split(x=>x>7)
     * left.flatten() // ['a', 'b', 'c', 'd', 'e', 'f', 'g']
     * right.flatten() // ['h', 'i', 'j']
     * ```
     *
     * @param pred A predicate function that takes the measure of the left side and returns a Bool. Should only flip once as the input grows.
     * @param offset A constant measure value which the predicate inputs can be offset by.
     *
     * @returns the [left, right] split as two new finger trees.
     */
    split(pred: (measured: MeasureValue) => Boolean, offset?: MeasureValue): [FingerTree<MeasureMonoid, Element, MeasureValue>, FingerTree<MeasureMonoid, Element, MeasureValue>]

    /**
     * Make a tree by taking elements from the left until just before the predicate is true for the tree measure.
     *
     * **Complexity**: O(n log n)
     *
     * **Amortized Complexity**: O(n log n)
     *
     * **Example**:
     * ```js
     * const arrayListMeasure = {
     *     base: (x)=>1,
     *     sum: (x,y)=>x+y,
     *     zero: ()=>0
     * }
     * const t = fingertree(arrayListMeasure).appendMany(['a','b','c','d','e','f','g','h','i','j'])
     * const t2 = t.takeUntil(x=>x>7)
     * t2.flatten() // ['a','b','c','d','e','f','g']
     * ```
     *
     * @param pred A predicate function that takes the measure of the left side and returns a Bool. Should only flip once as the input grows.
     * @param offset A constant measure value which the predicate inputs can be offset by.
     *
     * @returns the new tree.
     */
    takeUntil(pred: (measured: MeasureValue) => Boolean, offset?: MeasureValue): FingerTree<MeasureMonoid, Element, MeasureValue>

    /**
     * Make a tree by removing elements from the left until just before the predicate is true for the sum of the removed elements.
     *
     * **Complexity**: O(n log n)
     *
     * **Amortized Complexity**: O(n log n)
     *
     * **Example**:
     * ```js
     * const arrayListMeasure = {
     *     base: (x)=>1,
     *     sum: (x,y)=>x+y,
     *     zero: ()=>0
     * }
     * const t = fingertree(arrayListMeasure).appendMany(['a','b','c','d','e','f','g','h','i','j'])
     * const t2 = t.dropUntil(x=>x>7)
     * t2.flatten() // ['h','i','j']
     * ```
     *
     * @param pred A predicate function that takes the measure of the left side and returns a Bool. Should only flip once as the input grows.
     * @param offset A constant measure value which the predicate inputs can be offset by.
     *
     * @returns the new tree.
     */
    dropUntil(pred: (measured: MeasureValue) => Boolean, offset?: MeasureValue): FingerTree<MeasureMonoid, Element, MeasureValue>

    /**
     * Make a tree by taking elements from the left until just before the predicate turns false for the tree measure.
     *
     * **Complexity**: O(n log n)
     *
     * **Amortized Complexity**: O(n log n)
     *
     * **Example**:
     * ```js
     * const arrayListMeasure = {
     *     base: (x)=>1,
     *     sum: (x,y)=>x+y,
     *     zero: ()=>0
     * }
     * const t = fingertree(arrayListMeasure).appendMany(['a','b','c','d','e','f','g','h','i','j'])
     * const t2 = t.takeWhile(x=>x<4)
     * t2.flatten() // ['a','b','c']
     * ```
     *
     * @param pred A predicate function that takes the measure of the left side and returns a Bool. Should only flip once as the input grows.
     * @param offset A constant measure value which the predicate inputs can be offset by.
     *
     * @returns the new tree.
     */
    takeWhile(pred: (measured: MeasureValue) => Boolean, offset?: MeasureValue): FingerTree<MeasureMonoid, Element, MeasureValue>


    /**
     * Make a tree by removing elements from the left until just before the predicate is false for the sum of the removed elements.
     *
     * **Complexity**: O(n log n)
     *
     * **Amortized Complexity**: O(n log n)
     *
     * **Example**:
     * ```js
     * const arrayListMeasure = {
     *     base: (x)=>1,
     *     sum: (x,y)=>x+y,
     *     zero: ()=>0
     * }
     * const t = fingertree(arrayListMeasure).appendMany(['a','b','c','d','e','f','g','h','i','j'])
     * const t2 = t.dropWhile(x=>x<4)
     * t2.flatten() // ['d','e','f','g','h','i','j']
     * ```
     *
     * @param pred A predicate function that takes the measure of the left side and returns a Bool. Should only flip once as the input grows.
     * @param offset A constant measure value which the predicate inputs can be offset by.
     *
     * @returns the new tree.
     */
    dropWhile(pred: (measured: MeasureValue) => Boolean, offset?: MeasureValue): FingerTree<MeasureMonoid, Element, MeasureValue>

    /**
     * Find the first element such that the monoidal sum of its own measure with everything to the left makes the predicate true.
     *
     * **Example**:
     * ```js
     * const arrayListMeasure = {
     *     base: (x)=>1,
     *     sum: (x,y)=>x+y,
     *     zero: ()=>0
     * }
     * const t = fingertree(arrayListMeasure).appendMany(['a','b','c','d','e'])
     * t.firstMatch(x=>x>=4) // 'd'
     * ```
     *
     * @param pred A predicate function that takes the measure of the left side and returns a Bool. Should only flip once as the input grows.
     * @param offset A constant measure value which the predicate inputs can be offset by.
     *
     * @returns the matching element
     */
    firstMatch(pred: (measured: MeasureValue) => Boolean, offset?: MeasureValue): Element

    /**
     * Concatenate two fingertrees into a single, bigger, fingertree.
     *
     * **Complexity**: O(n log n)
     *
     * **Amortized Complexity**: O(n log n)
     *
     * **Example**:
     * ```js
     * const t = fingerTree(myMeasure);
     * const t1 = t.appendMany([1,2,3,4,5])
     * t1.flatten() // [1,2,3,4,5]
     * const t2 = t.appendMany([6,7,8,9,10])
     * t2.flatten() // [6,7,8,9,10]
     * const combined t1.concat(t2);
     * combined.flatten() // [1,2,3,4,5,6,7,8,9,10]
     * ```
     *
     * @param fingerTree2 The finger tree who's elements will follow this tree.
     * @returns The concatenated tree
     */
    concat(fingerTree2: FingerTree<MeasureMonoid, Element, MeasureValue>): FingerTree<MeasureMonoid, Element, MeasureValue>

    /**
     * Check whether the tree is empty
     *
     * **Example**
     * ```js
     * const t = fingertree(myMeasure);
     * t.isEmpty() // true;
     * const t2 = t.append(1);
     * t2.isEmpty() // false;
     * ```
     */
    isEmpty(): Boolean

    /**
     * Flatten the tree from left to right into a normal javascript array.
     *
     * **Complexity**: O(n)
     *
     * **Example**:
     * ```js
     * const t = fingertree(myMeasure);
     * t.append(1).prepend('h').append("hello").flatten() // ['h',1,"Hello"]
     * ```
     */
    flatten(): Element[]

    /**
     * Iterate over the tree's elements from left to right.
     *
     * **Example**
     * ```js
     * const t = fingertree(myMeasure);
     * const t2 = t.appendMany([1,2,3,4]);
     *
     * //Now we can use iteration
     * // 1. in for loops
     * for(let i of t2) {console.log(i)}
     * // > output:
     * // > 1
     * // > 2
     * // > 3
     * // > 4
     *
     * // 2. with spread operators
     * [...t2] // [1,2,3,4]
     * ```
     */
    [Symbol.iterator](): Iterator<Element>;
}