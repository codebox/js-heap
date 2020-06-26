describe("Heap", () => {
    "use strict";
    let heap;

    beforeEach(() => {
        heap = buildHeap();
    });

    describe("peek()", () => {
        it("should return 'undefined' if heap is empty", function() {
            expect(heap.peek()).toBeUndefined();
            expect(heap.peek()).toBeUndefined(); // idempotency check
        });

        it("should return value if heap has only 1 item", function() {
            const VALUE = 123;
            heap.insert(VALUE);
            expect(heap.peek()).toBe(VALUE);
            expect(heap.peek()).toBe(VALUE); // idempotency check
        });

        it("should return value if heap has only 2 items", function() {
            heap.insert(2);
            heap.insert(1);
            expect(heap.peek()).toBe(1);
            expect(heap.peek()).toBe(1); // idempotency check
        });
    });

    describe("extract()", () => {
        function testExtractionOrder(...values) {
            values.forEach(heap.insert);
            values.sort();
            values.forEach(value => {
                expect(heap.extract()).toBe(value);
            });
            expect(heap.extract()).toBeUndefined();
        }

        it("should return 'undefined' if heap is empty", function() {
            expect(heap.extract()).toBeUndefined();
            expect(heap.extract()).toBeUndefined();
        });

        it("should return values in correct sequence if heap has only 1 item", function() {
            testExtractionOrder(123);
        });

        it("should return values in correct sequence if heap has multiple values all the same", function() {
            testExtractionOrder(1,1,1,1);
        });

        it("should return values in correct sequence if inserted in sorted order", function() {
            testExtractionOrder(1,2,3);
        });

        it("should return values in correct sequence if inserted in unsorted order", function() {
            testExtractionOrder(3,2,1);
        });

        it("should return values in correct sequence if heap contains duplicates", function() {
            testExtractionOrder(3,1,2,1);
        });

        it("should return values in correct sequence if values are inserted between calls", function() {
            heap.insert(3);
            heap.insert(1);
            heap.insert(2);
            expect(heap.extract()).toBe(1);
            expect(heap.extract()).toBe(2);
            heap.insert(1);
            expect(heap.extract()).toBe(1);
            heap.insert(4);
            expect(heap.extract()).toBe(3);
            expect(heap.extract()).toBe(4);
            heap.insert(1);
            expect(heap.extract()).toBe(1);
            expect(heap.extract()).toBeUndefined();
            heap.insert(4);
            expect(heap.extract()).toBe(4);
            expect(heap.extract()).toBeUndefined();
        });
    });

    describe("mapping function", () => {
        it("should create max-heap correctly", () => {
            const maxHeap = buildHeap(v => -v);
            maxHeap.insert(1);
            maxHeap.insert(2);
            maxHeap.insert(3);
            expect(maxHeap.peek()).toBe(3);
            expect(maxHeap.extract()).toBe(3);
            expect(maxHeap.extract()).toBe(2);
            expect(maxHeap.extract()).toBe(1);
            expect(maxHeap.extract()).toBeUndefined();
        });
        it("should allow object property values to be used for comparison", () => {
            const maxHeap = buildHeap(v => v.x);
            maxHeap.insert({x:1});
            maxHeap.insert({x:2});
            maxHeap.insert({x:3});
            expect(maxHeap.peek()).toEqual({x:1});
            expect(maxHeap.extract()).toEqual({x:1});
            expect(maxHeap.extract()).toEqual({x:2});
            expect(maxHeap.extract()).toEqual({x:3});
            expect(maxHeap.extract()).toBeUndefined();
        });

    });

});
