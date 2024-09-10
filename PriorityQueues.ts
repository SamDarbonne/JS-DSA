import BinaryTree from './BinaryTree'

interface QueueOptions<K> {
    priority?: (val: K) => string | number;
}

class PriorityQueue<Entry> {
    priority?: (val: Entry) => string | number;
    queue: BinaryTree<Entry>;

    constructor(items: Entry[] | null = null, { priority }: QueueOptions<Entry> = {}) {
        if (priority) this.priority = priority;
        this.queue = new BinaryTree<Entry>(items)
    }

    enqueue(e: Entry) {
        return this.queue.insert(e)
    }
}

class MinPriorityQueue<T> extends PriorityQueue<T> {
    constructor(items?: T[] | null, options?: QueueOptions<T>) {
        super(items, options);
    }

    dequeue() {
        return this.queue.removeFromLeft();
    }
}

class MaxPriorityQueue<T> extends PriorityQueue<T> {
    constructor(items?: T[] | null, options?: QueueOptions<T>) {
        super(items, options);
    }

    dequeue() {
        return this.queue.removeFromRight();
    }
}

export {
    MinPriorityQueue,
    MaxPriorityQueue,
    PriorityQueue,
}