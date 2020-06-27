# JavaScript Binary Heap

Here's a simple JavaScript implementation of a Binary Heap,
 a data structure that can be used as a [Priority Queue](https://en.wikipedia.org/wiki/Priority_queue) storing items and returning
them in priority order. The code uses a number of ECMAScript 6 features and therefore will not work on older browsers.

I've implemented `insert`, `extract` and `peek` methods because that was all I needed at the time, but
it should be simple to extend if required:

Method|Time Complexity (Worst Case)
------|-----------
insert()|O(log n)
extract()|O(log n)
peek()|O(1)

To create a heap object, just call the `buildHeap()` function and add new items using the `insert()` method.
By default a 'min-heap' is created, where the smallest remaining item will be returned next:


    const heap = buildHeap();
    
    heap.insert(3);
    heap.insert(2);
    heap.insert(1);
    
    heap.extract(); // 1
    heap.extract(); // 2
    heap.extract(); // 3
    heap.extract(); // undefined - heap is now empty

`buildHeap()` accepts an optional argument which will be used as a mapping function, transforming values before comparing them
with each other. In this way custom ordering can be implemented, for example to create a heap which stores objects and always returns the
one with the highest `score` property, do this:

    const maxScoreHeap = buildHeap(v => -v.score);
