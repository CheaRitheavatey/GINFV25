export const algoCode = {
    bubble: {
        title: 'Bubble Sort - Implementation',
        code: [
            { line: 1, code: 'function bubbleSort(arr) {', indent: 0 },
            { line: 2, code: 'let n = arr.length;', indent: 1 },
            { line: 3, code: 'for (let i = 0; i < n - 1; i++) {', indent: 1 },
            { line: 4, code: 'for (let j = 0; j < n - i - 1; j++) {', indent: 2 },
            { line: 5, code: 'if (arr[j] > arr[j + 1]) {', indent: 3 },
            { line: 6, code: 'swap(arr, j, j + 1);', indent: 4 },
            { line: 7, code: '}', indent: 3 },
            { line: 8, code: '}', indent: 2 },
            { line: 9, code: '}', indent: 1 },
            { line: 10, code: 'return arr;', indent: 1 },
            { line: 11, code: '}', indent: 0 },
        ]
    },

    insertion: {
        title: 'Insertion Sort - Implementation' ,
        code: [
            { line: 1, code: 'function insertionSort(arr) {', indent: 0 },
            { line: 2, code: 'for (let i = 1; i < arr.length; i++) {', indent: 1 },
            { line: 3, code: 'let key = arr[i];', indent: 2 },
            { line: 4, code: 'let j = i - 1;', indent: 2 },
            { line: 5, code: 'while (j >= 0 && arr[j] > key) {', indent: 2 },
            { line: 6, code: 'arr[j + 1] = arr[j];', indent: 3 },
            { line: 7, code: 'j--;', indent: 3 },
            { line: 8, code: '}', indent: 2 },
            { line: 9, code: 'arr[j + 1] = key;', indent: 2 },
            { line: 10, code: '}', indent: 1 },
            { line: 11, code: 'return arr;', indent: 1 },
            { line: 12, code: '}', indent: 0 },
        ]
    },

    selection: {
        title: 'Selection Sort - Implementation',
        code: [
            { line: 1, code: 'function selectionSort(arr) {', indent: 0 },
            { line: 2, code: 'for (let i = 0; i < arr.length - 1; i++) {', indent: 1 },
            { line: 3, code: 'let minIdx = i;', indent: 2 },
            { line: 4, code: 'for (let j = i + 1; j < arr.length; j++) {', indent: 2 },
            { line: 5, code: 'if (arr[j] < arr[minIdx]) {', indent: 3 },
            { line: 6, code: 'minIdx = j;', indent: 4 },
            { line: 7, code: '}', indent: 3 },
            { line: 8, code: '}', indent: 2 },
            { line: 9, code: 'swap(arr, i, minIdx);', indent: 2 },
            { line: 10, code: '}', indent: 1 },
            { line: 11, code: 'return arr;', indent: 1 },
            { line: 12, code: '}', indent: 0 },
        ]
    },

    quick: {
        title: 'Quick Sort - Implementation',
        code: [
            { line: 1, code: 'function quickSort(arr, low, high) {', indent: 0 },
            { line: 2, code: 'let pivot = arr[high];', indent: 1 },
            { line: 3, code: 'let i = low - 1;', indent: 1 },
            { line: 4, code: 'for (let j = low; j < high; j++) {', indent: 1 },
            { line: 5, code: 'if (arr[j] < pivot) {', indent: 2 },
            { line: 6, code: 'i++;', indent: 3 },
            { line: 7, code: 'swap(arr, i, j);', indent: 3 },
            { line: 8, code: '}', indent: 2 },
            { line: 9, code: '}', indent: 1 },
            { line: 10, code: 'swap(arr, i + 1, high);', indent: 1 },
            { line: 11, code: 'if (low < high) partition & recurse', indent: 1 },
            { line: 12, code: 'return arr;', indent: 1 },
            { line: 13, code: '}', indent: 0 },
        ]
    },

    merge: {
        title: 'Merge Sort - Implementation',
        code: [
            { line: 1, code: 'function mergeSort(arr, left, right) {', indent: 0 },
            { line: 2, code: 'function merge(l, mid, r) {', indent: 1 },
            { line: 3, code: 'while (i < left.length && j < right.length) {', indent: 2 },
            { line: 4, code: 'if (left[i] <= right[j]) arr[k++] = left[i++];', indent: 3 },
            { line: 5, code: 'else arr[k++] = right[j++];', indent: 3 },
            { line: 6, code: '}', indent: 2 },
            { line: 7, code: 'copy remaining elements...', indent: 2 },
            { line: 8, code: '}', indent: 1 },
            { line: 9, code: 'if (left < right) {', indent: 1 },
            { line: 10, code: 'let mid = Math.floor((left + right) / 2);', indent: 2 },
            { line: 11, code: 'mergeSort(left, mid); mergeSort(mid+1, right);', indent: 2 },
            { line: 12, code: 'merge(left, mid, right);', indent: 2 },
            { line: 13, code: '}', indent: 1 },
            { line: 14, code: '}', indent: 0 },
        ]
    }
}