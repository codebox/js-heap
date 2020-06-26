describe("Heap", () => {
    "use strict";
    let heap;

    beforeEach(() => {
        heap = buildMinHeap();
    });

    describe("getMin()", () => {
        it("should return 'undefined' if heap is empty", function() {
            expect(heap.getMin()).toBeUndefined();
            expect(heap.getMin()).toBeUndefined(); // idempotency check
        });

        it("should return value if heap has only 1 item", function() {
            const VALUE = 123;
            heap.insert(VALUE);
            expect(heap.getMin()).toBe(VALUE);
            expect(heap.getMin()).toBe(VALUE); // idempotency check
        });

        it("should return value if heap has only 2 items", function() {
            heap.insert(2);
            heap.insert(1);
            expect(heap.getMin()).toBe(1);
            expect(heap.getMin()).toBe(1); // idempotency check
        });
    });

    describe("extractMin()", () => {
        function testExtractionOrder(...values) {
            values.forEach(heap.insert);
            values.sort();
            values.forEach(value => {
                expect(heap.extractMin()).toBe(value);
            });
            expect(heap.extractMin()).toBeUndefined();
        }

        it("should return 'undefined' if heap is empty", function() {
            expect(heap.extractMin()).toBeUndefined();
            expect(heap.extractMin()).toBeUndefined();
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
            expect(heap.extractMin()).toBe(1);
            expect(heap.extractMin()).toBe(2);
            heap.insert(1);
            expect(heap.extractMin()).toBe(1);
            heap.insert(4);
            expect(heap.extractMin()).toBe(3);
            expect(heap.extractMin()).toBe(4);
            heap.insert(1);
            expect(heap.extractMin()).toBe(1);
            expect(heap.extractMin()).toBeUndefined();
            heap.insert(4);
            expect(heap.extractMin()).toBe(4);
            expect(heap.extractMin()).toBeUndefined();
        });

    });

});
