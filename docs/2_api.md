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
