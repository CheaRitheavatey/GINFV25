export const generateBubbleSortSteps = (arr) => {
  const steps = [];
  const arrCopy = [...arr];
  let compCount = 0;
  let swapCount = 0;
  const n = arrCopy.length;

  steps.push({ array: [...arrCopy], highlightedIndices: [], currentLine: 1, comparisons: 0, swaps: 0 });
  steps.push({ array: [...arrCopy], highlightedIndices: [], currentLine: 2, comparisons: compCount, swaps: swapCount });

  for (let i = 0; i < n - 1; i++) {
    steps.push({ array: [...arrCopy], highlightedIndices: [], currentLine: 3, comparisons: compCount, swaps: swapCount });

    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...arrCopy], highlightedIndices: [j, j + 1], currentLine: 4, comparisons: compCount, swaps: swapCount });
      
      compCount++;
      steps.push({ array: [...arrCopy], highlightedIndices: [j, j + 1], currentLine: 5, comparisons: compCount, swaps: swapCount });

      if (arrCopy[j] > arrCopy[j + 1]) {
        swapCount++;
        [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
        steps.push({ array: [...arrCopy], highlightedIndices: [j, j + 1], currentLine: 6, comparisons: compCount, swaps: swapCount });
      }

      steps.push({ array: [...arrCopy], highlightedIndices: [j, j + 1], currentLine: 7, comparisons: compCount, swaps: swapCount });
    }

    steps.push({ array: [...arrCopy], highlightedIndices: [], currentLine: 8, comparisons: compCount, swaps: swapCount });
  }

  steps.push({ array: [...arrCopy], highlightedIndices: [], currentLine: 9, comparisons: compCount, swaps: swapCount });
  steps.push({ array: [...arrCopy], highlightedIndices: [], currentLine: 10, comparisons: compCount, swaps: swapCount });

  return steps;
};

export const generateInsertionSortSteps = (arr) => {
  const steps = [];
  const arrCopy = [...arr];
  let compCount = 0;
  let swapCount = 0;

  steps.push({ array: [...arrCopy], highlightedIndices: [], currentLine: 1, comparisons: 0, swaps: 0 });

  for (let i = 1; i < arrCopy.length; i++) {
    steps.push({ array: [...arrCopy], highlightedIndices: [i], currentLine: 2, comparisons: compCount, swaps: swapCount });
    
    const key = arrCopy[i];
    steps.push({ array: [...arrCopy], highlightedIndices: [i], currentLine: 3, comparisons: compCount, swaps: swapCount });
    
    let j = i - 1;
    steps.push({ array: [...arrCopy], highlightedIndices: [i, j], currentLine: 4, comparisons: compCount, swaps: swapCount });

    while (j >= 0 && arrCopy[j] > key) {
      compCount++;
      steps.push({ array: [...arrCopy], highlightedIndices: [j, j + 1], currentLine: 5, comparisons: compCount, swaps: swapCount });
      
      swapCount++;
      arrCopy[j + 1] = arrCopy[j];
      steps.push({ array: [...arrCopy], highlightedIndices: [j, j + 1], currentLine: 6, comparisons: compCount, swaps: swapCount });
      
      j--;
      steps.push({ array: [...arrCopy], highlightedIndices: j >= 0 ? [j, j + 1] : [0], currentLine: 7, comparisons: compCount, swaps: swapCount });
    }

    if (j >= 0) {
      compCount++;
      steps.push({ array: [...arrCopy], highlightedIndices: [j, j + 1], currentLine: 5, comparisons: compCount, swaps: swapCount });
    }

    arrCopy[j + 1] = key;
    steps.push({ array: [...arrCopy], highlightedIndices: [j + 1], currentLine: 8, comparisons: compCount, swaps: swapCount });
  }

  steps.push({ array: [...arrCopy], highlightedIndices: [], currentLine: 9, comparisons: compCount, swaps: swapCount });

  return steps;
};

export const generateSelectionSortSteps = (arr) => {
  const steps = [];
  const arrCopy = [...arr];
  let compCount = 0;
  let swapCount = 0;
  const n = arrCopy.length;

  steps.push({ array: [...arrCopy], highlightedIndices: [], currentLine: 1, comparisons: 0, swaps: 0 });

  for (let i = 0; i < n - 1; i++) {
    steps.push({ array: [...arrCopy], highlightedIndices: [i], currentLine: 2, comparisons: compCount, swaps: swapCount });
    
    let minIdx = i;
    steps.push({ array: [...arrCopy], highlightedIndices: [i, minIdx], currentLine: 3, comparisons: compCount, swaps: swapCount });

    for (let j = i + 1; j < n; j++) {
      steps.push({ array: [...arrCopy], highlightedIndices: [minIdx, j], currentLine: 4, comparisons: compCount, swaps: swapCount });
      
      compCount++;
      steps.push({ array: [...arrCopy], highlightedIndices: [minIdx, j], currentLine: 5, comparisons: compCount, swaps: swapCount });

      if (arrCopy[j] < arrCopy[minIdx]) {
        minIdx = j;
        steps.push({ array: [...arrCopy], highlightedIndices: [i, minIdx], currentLine: 6, comparisons: compCount, swaps: swapCount });
      }
    }

    if (minIdx !== i) {
      swapCount++;
      [arrCopy[i], arrCopy[minIdx]] = [arrCopy[minIdx], arrCopy[i]];
      steps.push({ array: [...arrCopy], highlightedIndices: [i, minIdx], currentLine: 7, comparisons: compCount, swaps: swapCount });
    }
  }

  steps.push({ array: [...arrCopy], highlightedIndices: [], currentLine: 8, comparisons: compCount, swaps: swapCount });

  return steps;
};

export const generateQuickSortSteps = (arr) => {
  const steps = [];
  const arrCopy = [...arr];
  let compCount = 0;
  let swapCount = 0;

  steps.push({ array: [...arrCopy], highlightedIndices: [], currentLine: 1, comparisons: 0, swaps: 0 });

  const partition = (low, high) => {
    steps.push({ array: [...arrCopy], highlightedIndices: [high], currentLine: 2, comparisons: compCount, swaps: swapCount });
    
    const pivot = arrCopy[high];
    let i = low - 1;
    steps.push({ array: [...arrCopy], highlightedIndices: [high], currentLine: 3, comparisons: compCount, swaps: swapCount });

    for (let j = low; j < high; j++) {
      steps.push({ array: [...arrCopy], highlightedIndices: [j, high], currentLine: 4, comparisons: compCount, swaps: swapCount });
      
      compCount++;
      steps.push({ array: [...arrCopy], highlightedIndices: [j, high], currentLine: 5, comparisons: compCount, swaps: swapCount });

      if (arrCopy[j] < pivot) {
        i++;
        steps.push({ array: [...arrCopy], highlightedIndices: [i, j], currentLine: 6, comparisons: compCount, swaps: swapCount });
        
        swapCount++;
        [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
        steps.push({ array: [...arrCopy], highlightedIndices: [i, j], currentLine: 7, comparisons: compCount, swaps: swapCount });
      }
    }

    swapCount++;
    [arrCopy[i + 1], arrCopy[high]] = [arrCopy[high], arrCopy[i + 1]];
    steps.push({ array: [...arrCopy], highlightedIndices: [i + 1, high], currentLine: 8, comparisons: compCount, swaps: swapCount });

    return i + 1;
  };

  const quickSort = (low, high) => {
    if (low < high) {
      steps.push({ array: [...arrCopy], highlightedIndices: [low, high], currentLine: 9, comparisons: compCount, swaps: swapCount });
      
      const pi = partition(low, high);
      steps.push({ array: [...arrCopy], highlightedIndices: [pi], currentLine: 10, comparisons: compCount, swaps: swapCount });
      
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  };

  quickSort(0, arrCopy.length - 1);
  steps.push({ array: [...arrCopy], highlightedIndices: [], currentLine: 11, comparisons: compCount, swaps: swapCount });

  return steps;
};

export const generateMergeSortSteps = (arr) => {
  const steps = [];
  const arrCopy = [...arr];
  let compCount = 0;
  let swapCount = 0;

  steps.push({ array: [...arrCopy], highlightedIndices: [], currentLine: 1, comparisons: 0, swaps: 0 });

  const merge = (left, mid, right) => {
    steps.push({ array: [...arrCopy], highlightedIndices: [left, mid, right], currentLine: 2, comparisons: compCount, swaps: swapCount });
    
    const leftArr = arrCopy.slice(left, mid + 1);
    const rightArr = arrCopy.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      compCount++;
      steps.push({ array: [...arrCopy], highlightedIndices: [left + i, mid + 1 + j], currentLine: 3, comparisons: compCount, swaps: swapCount });

      if (leftArr[i] <= rightArr[j]) {
        arrCopy[k] = leftArr[i];
        swapCount++;
        steps.push({ array: [...arrCopy], highlightedIndices: [k], currentLine: 4, comparisons: compCount, swaps: swapCount });
        i++;
      } else {
        arrCopy[k] = rightArr[j];
        swapCount++;
        steps.push({ array: [...arrCopy], highlightedIndices: [k], currentLine: 5, comparisons: compCount, swaps: swapCount });
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      arrCopy[k] = leftArr[i];
      swapCount++;
      steps.push({ array: [...arrCopy], highlightedIndices: [k], currentLine: 6, comparisons: compCount, swaps: swapCount });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arrCopy[k] = rightArr[j];
      swapCount++;
      steps.push({ array: [...arrCopy], highlightedIndices: [k], currentLine: 7, comparisons: compCount, swaps: swapCount });
      j++;
      k++;
    }
  };

  const mergeSort = (left, right) => {
    if (left < right) {
      steps.push({ array: [...arrCopy], highlightedIndices: [left, right], currentLine: 8, comparisons: compCount, swaps: swapCount });
      
      const mid = Math.floor((left + right) / 2);
      steps.push({ array: [...arrCopy], highlightedIndices: [mid], currentLine: 9, comparisons: compCount, swaps: swapCount });
      
      mergeSort(left, mid);
      mergeSort(mid + 1, right);
      merge(left, mid, right);
    }
  };

  mergeSort(0, arrCopy.length - 1);
  steps.push({ array: [...arrCopy], highlightedIndices: [], currentLine: 10, comparisons: compCount, swaps: swapCount });

  return steps;
};
