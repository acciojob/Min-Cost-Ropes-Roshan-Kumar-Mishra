class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractMin() {
    if (this.isEmpty()) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.heap[currentIndex] < this.heap[parentIndex]) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown() {
    let currentIndex = 0;
    let nextIndex = this.getNextIndex(currentIndex);

    while (nextIndex !== null && this.heap[currentIndex] > this.heap[nextIndex]) {
      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
      nextIndex = this.getNextIndex(currentIndex);
    }
  }

  getNextIndex(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;

    if (leftChildIndex < this.heap.length && rightChildIndex < this.heap.length) {
      return this.heap[leftChildIndex] < this.heap[rightChildIndex] ? leftChildIndex : rightChildIndex;
    }

    return leftChildIndex < this.heap.length ? leftChildIndex : (rightChildIndex < this.heap.length ? rightChildIndex : null);
  }

  swap(index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function mincost(arr) {
  const minHeap = new MinHeap();

  // Insert all ropes into the min heap
  for (const length of arr) {
    minHeap.insert(length);
  }

  let totalCost = 0;

  // Continue until there is only one rope left
  while (minHeap.heap.length > 1) {
    // Extract the two smallest ropes
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();

    // Connect the ropes and add the cost to the total
    const currentCost = rope1 + rope2;
    totalCost += currentCost;

    // Insert the connected rope back into the heap
    minHeap.insert(currentCost);
  }

  return totalCost;
}

// Example usage:
// const ropes = [4, 3, 2, 6];
const result = mincost(ropes);
console.log(`The minimum cost to connect the ropes is: ${result}`);

