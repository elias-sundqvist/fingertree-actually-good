
<a name="1_intromd"></a>

![Travis CI](https://travis-ci.com/elias-sundqvist/fingertree-actually-good.svg?token=uoGVKzqcJ4f6CpWHKxMe&branch=master)
![Benchmark CI](https://github.com/elias-sundqvist/fingertree-actually-good/workflows/Benchmark%20CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/elias-sundqvist/fingertree-actually-good/badge.svg?t=iERS8k)](https://coveralls.io/github/elias-sundqvist/fingertree-actually-good)
![npm](https://img.shields.io/npm/v/fingertree-actually-good)
![GitHub](https://img.shields.io/github/license/elias-sundqvist/fingertree-actually-good)
# fingertree-actually-good
> A good *(fast, unit tested, and with full functionality)* fingertree implementation in JavaScript.
## Installation
```bash
npm install fingertree-actually-good
```
## Usage
### Importing the library
```js
import fingertree from 'fingertree-actually-good';
``` 
### API Documentation:

<a name="2_apimd"></a>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [fingertree-actually-good](#fingertree-actually-good)
  - [Functions](#functions)
- [Class: FingerTree <**MeasureMonoid, Element, MeasureValue**>](#class-fingertree-measuremonoid-element-measurevalue)
  - [Type parameters](#type-parameters)
  - [Implements](#implements)
  - [Methods](#methods)
- [Interface: Measure <**Element, MeasureValue**>](#interface-measure-element-measurevalue)
  - [Type parameters](#type-parameters-1)
  - [Methods](#methods-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


<a name="globalsmd"></a>


## fingertree-actually-good


### Functions

####  fingertree

▸ **fingertree**<**MeasureMonoid**, **Element**, **MeasureValue**>(`measure`: MeasureMonoid): *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

Create an empty fingertree which uses the provided measure monoid

**Example**:
```js
const arrayListMeasure = {
    base: ()=>1,
    sum: (x,y)=>x+y,
    zero: ()=>0
}
const myTree = fingertree(arrayListMeasure)
```

**Type parameters:**

▪ **MeasureMonoid**: *[Measure](#interfacesmeasuremd)‹Element, MeasureValue›*

The measure to be used by the tree

▪ **Element**

The type of elements stored by the tree

▪ **MeasureValue**

The type of values returned by the measure

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`measure` | MeasureMonoid | The measure monoid that should be used by the tree.  |

**Returns:** *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*


<a name="classesfingertreemd"></a>


## Class: FingerTree <**MeasureMonoid, Element, MeasureValue**>

A FingerTree is a persistent functional data structure that can
be used to quickly split and combine large sequences arbitrarily.
It also gives quick access to the first and last elements of the tree.

### Type parameters

▪ **MeasureMonoid**: *[Measure](#interfacesmeasuremd)‹Element, MeasureValue›*

The measure to be used by the tree

▪ **Element**

The type of elements stored by the tree

▪ **MeasureValue**

The type of values returned by the measure


### Implements

* Iterable‹Element›


### Methods

####  [Symbol.iterator]

▸ **[Symbol.iterator]**(): *Iterator‹Element›*

Iterate over the tree's elements from left to right.

**Example**
```js
const t = fingertree(myMeasure);
const t2 = t.appendMany([1,2,3,4]);

//Now we can use iteration
// 1. in for loops
for(let i of t2) {console.log(i)}
// > output:
// > 1
// > 2
// > 3
// > 4

// 2. with spread operators
[...t2] // [1,2,3,4]
```

**Returns:** *Iterator‹Element›*

___

####  append

▸ **append**(`x`: Element): *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

Append a single element to the end of the tree.

**Complexity**: O(log n)

**Amortized Complexity**: O(1)

**Example**:
```js
const t = fingertree(myMeasure).append(1)
t.flatten() // -> [1]
const t2 = t.append(4)
t2.flatten() // -> [1,4]
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`x` | Element | the element to append  |

**Returns:** *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

a new fingertree with the element appended

___

####  appendMany

▸ **appendMany**(`iter`: Iterable‹Element›): *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

Append all elements from an iterable to the end of the tree.

**Complexity**: O(m log n)

**Amortized Complexity**: O(m)

> where m is the number of appended elements
> and n is the current number of elements in the list.

**Example**:
```js
t = fingertree(myMeasure).appendMany([1,2,3])
t.flatten() // -> [1,2,3]
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`iter` | Iterable‹Element› | an iterable of elements |

**Returns:** *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

a new fingertree with the elements appended

___

####  concat

▸ **concat**(`fingerTree2`: [FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›): *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

Concatenate two fingertrees into a single, bigger, fingertree.

**Complexity**: O(n log n)

**Amortized Complexity**: O(n log n)

**Example**:
```js
const t = fingerTree(myMeasure);
const t1 = t.appendMany([1,2,3,4,5])
t1.flatten() // [1,2,3,4,5]
const t2 = t.appendMany([6,7,8,9,10])
t2.flatten() // [6,7,8,9,10]
const combined t1.concat(t2);
combined.flatten() // [1,2,3,4,5,6,7,8,9,10]
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fingerTree2` | [FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue› | The finger tree who's elements will follow this tree. |

**Returns:** *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

The concatenated tree

___

####  dropUntil

▸ **dropUntil**(`pred`: function, `offset?`: MeasureValue): *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

Make a tree by removing elements from the left until just before the predicate is true for the sum of the removed elements.

**Complexity**: O(n log n)

**Amortized Complexity**: O(n log n)

**Example**:
```js
const arrayListMeasure = {
    base: (x)=>1,
    sum: (x,y)=>x+y,
    zero: ()=>0
}
const t = fingertree(arrayListMeasure).appendMany(['a','b','c','d','e','f','g','h','i','j'])
const t2 = t.dropUntil(x=>x>7)
t2.flatten() // ['h','i','j']
```

**Parameters:**

▪ **pred**: *function*

A predicate function that takes the measure of the left side and returns a Bool. Should only flip once as the input grows.

▸ (`measured`: MeasureValue): *Boolean*

**Parameters:**

Name | Type |
------ | ------ |
`measured` | MeasureValue |

▪`Optional`  **offset**: *MeasureValue*

A constant measure value which the predicate inputs can be offset by.

**Returns:** *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

the new tree.

___

####  dropWhile

▸ **dropWhile**(`pred`: function, `offset?`: MeasureValue): *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

Make a tree by removing elements from the left until just before the predicate is false for the sum of the removed elements.

**Complexity**: O(n log n)

**Amortized Complexity**: O(n log n)

**Example**:
```js
const arrayListMeasure = {
    base: (x)=>1,
    sum: (x,y)=>x+y,
    zero: ()=>0
}
const t = fingertree(arrayListMeasure).appendMany(['a','b','c','d','e','f','g','h','i','j'])
const t2 = t.dropWhile(x=>x<4)
t2.flatten() // ['d','e','f','g','h','i','j']
```

**Parameters:**

▪ **pred**: *function*

A predicate function that takes the measure of the left side and returns a Bool. Should only flip once as the input grows.

▸ (`measured`: MeasureValue): *Boolean*

**Parameters:**

Name | Type |
------ | ------ |
`measured` | MeasureValue |

▪`Optional`  **offset**: *MeasureValue*

A constant measure value which the predicate inputs can be offset by.

**Returns:** *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

the new tree.

___

####  firstMatch

▸ **firstMatch**(`pred`: function, `offset?`: MeasureValue): *Element*

Find the first element such that the monoidal sum of its own measure with everything to the left makes the predicate true.

**Example**:
```js
const arrayListMeasure = {
    base: (x)=>1,
    sum: (x,y)=>x+y,
    zero: ()=>0
}
const t = fingertree(arrayListMeasure).appendMany(['a','b','c','d','e'])
t.firstMatch(x=>x>=4) // 'd'
```

**Parameters:**

▪ **pred**: *function*

A predicate function that takes the measure of the left side and returns a Bool. Should only flip once as the input grows.

▸ (`measured`: MeasureValue): *Boolean*

**Parameters:**

Name | Type |
------ | ------ |
`measured` | MeasureValue |

▪`Optional`  **offset**: *MeasureValue*

A constant measure value which the predicate inputs can be offset by.

**Returns:** *Element*

the matching element

___

####  flatten

▸ **flatten**(): *Element[]*

Flatten the tree from left to right into a normal javascript array.

**Complexity**: O(n)

**Example**:
```js
const t = fingertree(myMeasure);
t.append(1).prepend('h').append("hello").flatten() // ['h',1,"Hello"]
```

**Returns:** *Element[]*

___

####  head

▸ **head**(): *Element*

Get the first element in the tree

**Complexity**: O(1)

**Amortized Complexity**: O(1)

**Example**:
```js
const t = fingertree(myMeasure).appendMany([1,2,3,4,5,6])
t.head() // 1
```

**Returns:** *Element*

The first element of the tree

___

####  init

▸ **init**(): *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

Get a new tree with the last element removed

**Complexity**: O(log n)

**Amortized Complexity**: O(1)

**Example**:
```js
const t = fingertree(myMeasure).appendMany([1,2,3,4,5,6])
[...t.init()] // [1,2,3,4,5]
```

**Returns:** *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

A new tree with the last element removed

___

####  isEmpty

▸ **isEmpty**(): *Boolean*

Check whether the tree is empty

**Example**
```js
const t = fingertree(myMeasure);
t.isEmpty() // true;
const t2 = t.append(1);
t2.isEmpty() // false;
```

**Returns:** *Boolean*

___

####  last

▸ **last**(): *Element*

Get the last element in the tree

**Complexity**: O(1)

**Amortized Complexity**: O(1)

**Example**:
```js
const t = fingertree(myMeasure).appendMany([1,2,3,4,5,6])
t.last() // 6
```

**Returns:** *Element*

The first element of the tree

___

####  measure

▸ **measure**(): *MeasureValue*

Compute the monoidal sum of all the tree's elements using the tree measure.
This method is typically fast due to results being cached.

**Example**:
```js
const prodMeasure = {
    base: (x)=>x,
    sum: (x,y)=>x*y,
    zero: ()=>1
}
const t = fingertree(prodMeasure).appendMany([1,2,3,4,5,6])
t.measure() // 720 (the product of all the numbers in the tree)
```

**Returns:** *MeasureValue*

the monoidal sum of the tree's elements.

___

####  prepend

▸ **prepend**(`x`: Element): *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

Prepend a single element to the start of the tree.

**Complexity**: O(log n)

**Amortized Complexity**: O(1)

**Example**:
```js
const t = fingertree(myMeasure).prepend(1)
t.flatten() // -> [1]
const t2 = t.prepend(4)
t2.flatten() // -> [4,1]
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`x` | Element | the element to prepend  |

**Returns:** *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

a new fingertree with the element prepended

___

####  prependMany

▸ **prependMany**(`iter`: Iterable‹Element›): *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

Prepend all elements from an iterable to the start of the tree.
Note that this reverses the elements.

**Complexity**: O(m log n)

**Amortized Complexity**: O(m)

> where m is the number of appended elements
> and n is the current number of elements in the list.

**Example**:
```js
t = fingertree(myMeasure).prependMany([1,2,3])
t.flatten() // -> [3,2,1]
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`iter` | Iterable‹Element› | an iterable of elements  |

**Returns:** *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

a new fingertree with the elements prepended

___

####  split

▸ **split**(`pred`: function, `offset?`: MeasureValue): *[[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›, [FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›]*

Split the tree at the point where the left side
is as large as possible without making the predicate true

**Complexity**: O(n log n)

**Amortized Complexity**: O(n log n)

**Example**:
```js
const arrayListMeasure = {
    base: (x)=>1,
    sum: (x,y)=>x+y,
    zero: ()=>0
}
const t = fingertree(arrayListMeasure).appendMany(['a','b','c','d','e','f','g','h','i','j'])
const [left, right] = t.split(x=>x>7)
left.flatten() // ['a', 'b', 'c', 'd', 'e', 'f', 'g']
right.flatten() // ['h', 'i', 'j']
```

**Parameters:**

▪ **pred**: *function*

A predicate function that takes the measure of the left side and returns a Bool. Should only flip once as the input grows.

▸ (`measured`: MeasureValue): *Boolean*

**Parameters:**

Name | Type |
------ | ------ |
`measured` | MeasureValue |

▪`Optional`  **offset**: *MeasureValue*

A constant measure value which the predicate inputs can be offset by.

**Returns:** *[[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›, [FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›]*

the [left, right] split as two new finger trees.

___

####  tail

▸ **tail**(): *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

Get a new tree with the first element removed

**Complexity**: O(log n)

**Amortized Complexity**: O(1)

**Example**:
```js
const t = fingertree(myMeasure).appendMany([1,2,3,4,5,6])
t.tail().flatten() // [2,3,4,5,6]
```

**Returns:** *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

A new tree with the first element removed

___

####  takeUntil

▸ **takeUntil**(`pred`: function, `offset?`: MeasureValue): *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

Make a tree by taking elements from the left until just before the predicate is true for the tree measure.

**Complexity**: O(n log n)

**Amortized Complexity**: O(n log n)

**Example**:
```js
const arrayListMeasure = {
    base: (x)=>1,
    sum: (x,y)=>x+y,
    zero: ()=>0
}
const t = fingertree(arrayListMeasure).appendMany(['a','b','c','d','e','f','g','h','i','j'])
const t2 = t.takeUntil(x=>x>7)
t2.flatten() // ['a','b','c','d','e','f','g']
```

**Parameters:**

▪ **pred**: *function*

A predicate function that takes the measure of the left side and returns a Bool. Should only flip once as the input grows.

▸ (`measured`: MeasureValue): *Boolean*

**Parameters:**

Name | Type |
------ | ------ |
`measured` | MeasureValue |

▪`Optional`  **offset**: *MeasureValue*

A constant measure value which the predicate inputs can be offset by.

**Returns:** *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

the new tree.

___

####  takeWhile

▸ **takeWhile**(`pred`: function, `offset?`: MeasureValue): *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

Make a tree by taking elements from the left until just before the predicate turns false for the tree measure.

**Complexity**: O(n log n)

**Amortized Complexity**: O(n log n)

**Example**:
```js
const arrayListMeasure = {
    base: (x)=>1,
    sum: (x,y)=>x+y,
    zero: ()=>0
}
const t = fingertree(arrayListMeasure).appendMany(['a','b','c','d','e','f','g','h','i','j'])
const t2 = t.takeWhile(x=>x<4)
t2.flatten() // ['a','b','c']
```

**Parameters:**

▪ **pred**: *function*

A predicate function that takes the measure of the left side and returns a Bool. Should only flip once as the input grows.

▸ (`measured`: MeasureValue): *Boolean*

**Parameters:**

Name | Type |
------ | ------ |
`measured` | MeasureValue |

▪`Optional`  **offset**: *MeasureValue*

A constant measure value which the predicate inputs can be offset by.

**Returns:** *[FingerTree](#classesfingertreemd)‹MeasureMonoid, Element, MeasureValue›*

the new tree.


<a name="interfacesmeasuremd"></a>


## Interface: Measure <**Element, MeasureValue**>

A measure can be any monoid.

### Type parameters

▪ **Element**

The type of elements which are measured by the monoid

▪ **MeasureValue**

The type of values returned returned by the monoid

**Example**:
```js
const arrayListMeasure = {
    base: ()=>1,
    sum: (x,y)=>x+y,
    zero: ()=>0
}
```



### Methods

####  base

▸ **base**(`x`: Element): *MeasureValue*

Base is used to compute the initial measure of each element in the tree

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`x` | Element | an initial element of type Element |

**Returns:** *MeasureValue*

the initial measure for the element

Example:
```js
// used for array lists
base: () => 1;
```

___

####  sum

▸ **sum**(`x`: MeasureValue, `y`: MeasureValue): *MeasureValue*

Sum is used to combine the measures of two nodes in the tree.
A monoid should be commutative, so sum(a,sum(b,c)) === sum(sum(a,b),c)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`x` | MeasureValue | the measure of the first part |
`y` | MeasureValue | the measure of the second part |

**Returns:** *MeasureValue*

the combined measure

**Example**:
```js
// used for array lists
sum: (x,y) => x+y;
```

___

####  zero

▸ **zero**(): *MeasureValue*

The measure of an empty tree.

**Returns:** *MeasureValue*

the measure of an empty tree.

**Example**:
```js
// used for array lists
zero: () => 0;
```


<a name="3_benchmark_resultsmd"></a>

## Benchmark Results

```
FingerTree#PrependTo0ElemTree x 101,095,757 ops/sec ±4.13% (80 runs sampled)
FingerTree#PrependTo1ElemTree x 95,372,422 ops/sec ±3.93% (77 runs sampled)
FingerTree#PrependTo10ElemTree x 86,550,261 ops/sec ±3.58% (81 runs sampled)
FingerTree#PrependTo100ElemTree x 82,458,431 ops/sec ±5.00% (76 runs sampled)
FingerTree#PrependTo1000ElemTree x 87,829,141 ops/sec ±4.11% (76 runs sampled)
FingerTree#PrependTo10000ElemTree x 70,582,072 ops/sec ±18.48% (67 runs sampled)
FingerTree#PrependTo100000ElemTree x 47,440,836 ops/sec ±54.71% (72 runs sampled)
FingerTree#PrependTo1000000ElemTree x 85,858,594 ops/sec ±4.96% (78 runs sampled)
FingerTree#AppendTo0ElemTree x 98,193,690 ops/sec ±4.15% (80 runs sampled)
FingerTree#AppendTo1ElemTree x 54,093,354 ops/sec ±2.21% (86 runs sampled)
FingerTree#AppendTo10ElemTree x 76,189,385 ops/sec ±3.41% (83 runs sampled)
FingerTree#AppendTo100ElemTree x 74,198,772 ops/sec ±3.27% (78 runs sampled)
FingerTree#AppendTo1000ElemTree x 75,930,306 ops/sec ±3.00% (82 runs sampled)
FingerTree#AppendTo10000ElemTree x 78,203,402 ops/sec ±2.73% (84 runs sampled)
FingerTree#AppendTo100000ElemTree x 76,595,779 ops/sec ±3.12% (82 runs sampled)
FingerTree#AppendTo1000000ElemTree x 77,442,100 ops/sec ±3.29% (83 runs sampled)
FingerTree#TailOf0ElemTree x 63,371,844 ops/sec ±2.77% (85 runs sampled)
FingerTree#TailOf1ElemTree x 34,448,752 ops/sec ±1.26% (90 runs sampled)
FingerTree#TailOf10ElemTree x 12,296,696 ops/sec ±1.47% (91 runs sampled)
FingerTree#TailOf100ElemTree x 5,568,404 ops/sec ±6.42% (84 runs sampled)
FingerTree#TailOf1000ElemTree x 3,704,433 ops/sec ±0.59% (90 runs sampled)
FingerTree#TailOf10000ElemTree x 2,429,494 ops/sec ±1.39% (89 runs sampled)
FingerTree#TailOf100000ElemTree x 1,971,881 ops/sec ±0.58% (90 runs sampled)
FingerTree#TailOf1000000ElemTree x 1,871,120 ops/sec ±1.05% (89 runs sampled)
FingerTree#Measure0ElemTree x 71,492,164 ops/sec ±2.72% (85 runs sampled)
FingerTree#Measure1ElemTree x 57,105,188 ops/sec ±3.49% (82 runs sampled)
FingerTree#Measure10ElemTree x 40,236,396 ops/sec ±4.13% (88 runs sampled)
FingerTree#Measure100ElemTree x 40,104,284 ops/sec ±1.81% (90 runs sampled)
FingerTree#Measure1000ElemTree x 36,061,189 ops/sec ±4.89% (79 runs sampled)
FingerTree#Measure10000ElemTree x 37,208,668 ops/sec ±2.07% (83 runs sampled)
FingerTree#Measure100000ElemTree x 38,298,849 ops/sec ±2.36% (82 runs sampled)
FingerTree#Measure1000000ElemTree x 35,310,729 ops/sec ±9.61% (76 runs sampled)
FingerTree#RandomSplit0ElemTree x 10,631,511 ops/sec ±0.85% (91 runs sampled)
FingerTree#RandomSplit1ElemTree x 5,059,693 ops/sec ±0.89% (87 runs sampled)
FingerTree#RandomSplit10ElemTree x 213,546 ops/sec ±2.46% (85 runs sampled)
FingerTree#RandomSplit100ElemTree x 154,849 ops/sec ±2.54% (91 runs sampled)
FingerTree#RandomSplit1000ElemTree x 91,391 ops/sec ±2.65% (87 runs sampled)
FingerTree#RandomSplit10000ElemTree x 64,809 ops/sec ±1.54% (89 runs sampled)
FingerTree#RandomSplit100000ElemTree x 50,238 ops/sec ±0.64% (91 runs sampled)
FingerTree#RandomSplit1000000ElemTree x 38,263 ops/sec ±1.35% (91 runs sampled)
FingerTree#Concat0ElemTreeWith0ElemTree x 19,896,870 ops/sec ±0.81% (92 runs sampled)
FingerTree#Concat0ElemTreeWith1ElemTree x 19,213,649 ops/sec ±2.59% (88 runs sampled)
FingerTree#Concat0ElemTreeWith10ElemTree x 20,261,738 ops/sec ±0.97% (90 runs sampled)
FingerTree#Concat0ElemTreeWith100ElemTree x 20,073,775 ops/sec ±0.98% (90 runs sampled)
FingerTree#Concat0ElemTreeWith1000ElemTree x 20,414,365 ops/sec ±1.02% (92 runs sampled)
FingerTree#Concat0ElemTreeWith10000ElemTree x 20,613,424 ops/sec ±0.68% (92 runs sampled)
FingerTree#Concat0ElemTreeWith100000ElemTree x 20,544,998 ops/sec ±1.03% (90 runs sampled)
FingerTree#Concat0ElemTreeWith1000000ElemTree x 18,720,799 ops/sec ±3.92% (82 runs sampled)
FingerTree#Concat1ElemTreeWith0ElemTree x 3,614,523 ops/sec ±4.38% (83 runs sampled)
FingerTree#Concat1ElemTreeWith1ElemTree x 3,606,507 ops/sec ±0.50% (90 runs sampled)
FingerTree#Concat1ElemTreeWith10ElemTree x 3,686,210 ops/sec ±0.60% (89 runs sampled)
FingerTree#Concat1ElemTreeWith100ElemTree x 3,640,934 ops/sec ±0.61% (94 runs sampled)
FingerTree#Concat1ElemTreeWith1000ElemTree x 3,607,454 ops/sec ±1.29% (86 runs sampled)
FingerTree#Concat1ElemTreeWith10000ElemTree x 3,125,409 ops/sec ±2.50% (84 runs sampled)
FingerTree#Concat1ElemTreeWith100000ElemTree x 3,009,434 ops/sec ±8.50% (80 runs sampled)
FingerTree#Concat1ElemTreeWith1000000ElemTree x 2,183,878 ops/sec ±30.74% (57 runs sampled)
FingerTree#Concat10ElemTreeWith0ElemTree x 12,335,214 ops/sec ±14.48% (58 runs sampled)
FingerTree#Concat10ElemTreeWith1ElemTree x 2,943,777 ops/sec ±6.16% (73 runs sampled)
FingerTree#Concat10ElemTreeWith10ElemTree x 1,364,459 ops/sec ±4.58% (79 runs sampled)
FingerTree#Concat10ElemTreeWith100ElemTree x 1,594,247 ops/sec ±0.63% (91 runs sampled)
FingerTree#Concat10ElemTreeWith1000ElemTree x 1,584,415 ops/sec ±0.58% (92 runs sampled)
FingerTree#Concat10ElemTreeWith10000ElemTree x 1,609,327 ops/sec ±0.65% (82 runs sampled)
FingerTree#Concat10ElemTreeWith100000ElemTree x 1,163,352 ops/sec ±6.72% (72 runs sampled)
FingerTree#Concat10ElemTreeWith1000000ElemTree x 890,814 ops/sec ±6.15% (66 runs sampled)
FingerTree#Concat100ElemTreeWith0ElemTree x 17,937,603 ops/sec ±5.03% (81 runs sampled)
FingerTree#Concat100ElemTreeWith1ElemTree x 3,804,105 ops/sec ±2.56% (86 runs sampled)
FingerTree#Concat100ElemTreeWith10ElemTree x 1,238,229 ops/sec ±4.42% (76 runs sampled)
FingerTree#Concat100ElemTreeWith100ElemTree x 532,721 ops/sec ±4.50% (83 runs sampled)
FingerTree#Concat100ElemTreeWith1000ElemTree x 472,716 ops/sec ±5.33% (74 runs sampled)
FingerTree#Concat100ElemTreeWith10000ElemTree x 505,303 ops/sec ±4.49% (79 runs sampled)
FingerTree#Concat100ElemTreeWith100000ElemTree x 516,227 ops/sec ±4.92% (78 runs sampled)
FingerTree#Concat100ElemTreeWith1000000ElemTree x 497,876 ops/sec ±4.83% (80 runs sampled)
FingerTree#Concat1000ElemTreeWith0ElemTree x 19,926,982 ops/sec ±0.97% (89 runs sampled)
FingerTree#Concat1000ElemTreeWith1ElemTree x 3,757,808 ops/sec ±1.80% (84 runs sampled)
FingerTree#Concat1000ElemTreeWith10ElemTree x 1,104,399 ops/sec ±5.10% (75 runs sampled)
FingerTree#Concat1000ElemTreeWith100ElemTree x 671,673 ops/sec ±5.25% (76 runs sampled)
FingerTree#Concat1000ElemTreeWith1000ElemTree x 600,555 ops/sec ±2.79% (84 runs sampled)
FingerTree#Concat1000ElemTreeWith10000ElemTree x 478,199 ops/sec ±2.53% (86 runs sampled)
FingerTree#Concat1000ElemTreeWith100000ElemTree x 477,585 ops/sec ±2.47% (87 runs sampled)
FingerTree#Concat1000ElemTreeWith1000000ElemTree x 450,701 ops/sec ±4.17% (86 runs sampled)
FingerTree#Concat10000ElemTreeWith0ElemTree x 19,572,633 ops/sec ±1.04% (91 runs sampled)
FingerTree#Concat10000ElemTreeWith1ElemTree x 3,814,716 ops/sec ±1.00% (89 runs sampled)
FingerTree#Concat10000ElemTreeWith10ElemTree x 1,232,594 ops/sec ±4.26% (75 runs sampled)
FingerTree#Concat10000ElemTreeWith100ElemTree x 774,532 ops/sec ±3.77% (84 runs sampled)
FingerTree#Concat10000ElemTreeWith1000ElemTree x 480,338 ops/sec ±4.29% (81 runs sampled)
FingerTree#Concat10000ElemTreeWith10000ElemTree x 391,378 ops/sec ±3.86% (85 runs sampled)
FingerTree#Concat10000ElemTreeWith100000ElemTree x 348,976 ops/sec ±2.90% (83 runs sampled)
FingerTree#Concat10000ElemTreeWith1000000ElemTree x 370,820 ops/sec ±3.59% (83 runs sampled)
FingerTree#Concat100000ElemTreeWith0ElemTree x 18,840,616 ops/sec ±1.46% (89 runs sampled)
FingerTree#Concat100000ElemTreeWith1ElemTree x 3,411,742 ops/sec ±5.40% (84 runs sampled)
FingerTree#Concat100000ElemTreeWith10ElemTree x 1,295,934 ops/sec ±3.64% (80 runs sampled)
FingerTree#Concat100000ElemTreeWith100ElemTree x 527,559 ops/sec ±7.14% (71 runs sampled)
FingerTree#Concat100000ElemTreeWith1000ElemTree x 421,084 ops/sec ±4.01% (79 runs sampled)
FingerTree#Concat100000ElemTreeWith10000ElemTree x 386,141 ops/sec ±3.50% (84 runs sampled)
FingerTree#Concat100000ElemTreeWith100000ElemTree x 296,544 ops/sec ±8.01% (78 runs sampled)
FingerTree#Concat100000ElemTreeWith1000000ElemTree x 278,959 ops/sec ±3.51% (86 runs sampled)
FingerTree#Concat1000000ElemTreeWith0ElemTree x 15,871,327 ops/sec ±6.83% (77 runs sampled)
FingerTree#Concat1000000ElemTreeWith1ElemTree x 3,275,900 ops/sec ±2.79% (83 runs sampled)
FingerTree#Concat1000000ElemTreeWith10ElemTree x 1,162,888 ops/sec ±5.71% (74 runs sampled)
FingerTree#Concat1000000ElemTreeWith100ElemTree x 689,867 ops/sec ±7.99% (78 runs sampled)
FingerTree#Concat1000000ElemTreeWith1000ElemTree x 399,844 ops/sec ±8.01% (75 runs sampled)
FingerTree#Concat1000000ElemTreeWith10000ElemTree x 335,577 ops/sec ±6.95% (79 runs sampled)
FingerTree#Concat1000000ElemTreeWith100000ElemTree x 317,946 ops/sec ±4.89% (79 runs sampled)
FingerTree#Concat1000000ElemTreeWith1000000ElemTree x 238,679 ops/sec ±5.45% (66 runs sampled)
```

<a name="4_referencesmd"></a>

## References
  - [A Haskell tutorial for implementing fingertrees](http://andrew.gibiansky.com/blog/haskell/finger-trees/)
  - [Hinze and Paterson (Original fingertree paper)](http://staff.city.ac.uk/~ross/papers/FingerTree.pdf)


<a name="5_licensemd"></a>

## License
[LGPL-3.0](LICENSE)