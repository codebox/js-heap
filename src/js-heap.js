function buildHeap(fnMap = v => v) {
    const values = [];

    function getIndexOfParent(childIndex) {
        console.assert(childIndex > 0);
        return Math.floor((childIndex - 1) / 2);
    }

    function getIndexesOfChildren(parentIndex) {
        console.assert(parentIndex >= 0);
        const firstChildIndex = parentIndex * 2 + 1;
        return [firstChildIndex, firstChildIndex+1].filter(i => i < values.length);
    }

    function swap(i1, i2) {
        console.assert(i1 >= 0 && i1 < values.length);
        console.assert(i2 >= 0 && i2 < values.length);
        [values[i1], values[i2]] = [values[i2], values[i1]];
    }

    function bubbleUp(n) {
        const value = values[n];
        while(n) {
            let parentIndex = getIndexOfParent(n),
                parent = values[parentIndex];

            if (fnMap(parent) <= fnMap(value)) {
                break;
            }
            swap(parentIndex, n);
            n = parentIndex;
        }
    }

    function sinkDown(n) {
        const value = values[n];

        while(true) {
            const indexOfChildToSwap = getIndexesOfChildren(n)
                .reduce((smallestSoFar,i) => fnMap(smallestSoFar[1]) < fnMap(values[i]) ? smallestSoFar : [i, values[i]], [null, value])[0];

            if (indexOfChildToSwap === null) {
                break;
            }
            swap(indexOfChildToSwap, n);
            n = indexOfChildToSwap;
        }
    }

    return {
        insert(value) {
            values.push(value);
            bubbleUp(values.length - 1);
        },
        peek() {
            return values[0]; // 'undefined' if array is empty
        },
        extract() {
            const minValue = values.shift();

            if (values.length) {
                const lastValue = values.pop();
                values.unshift(lastValue);
                sinkDown(0);
            }

            return minValue;
        }
    };
}
