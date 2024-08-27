interface QueueOptions<K> {
    priority?: (val: K) => string | number;
}

class PriorityQueue<Entry> {
    priority?: (val: Entry) => string | number;
    queue: any[];

    constructor(items?: Entry[] | null, { priority }: QueueOptions<Entry> = {}) {
        if (priority) this.priority = priority;
        this.queue = items?.length 
            ? items.sort((a, b) => {
                if (priority) return priority(a) > priority(b) ? 1 : -1;
                else return a > b ? 1 : -1;
            })
            : []
    }

    getInsertionIndex(entry: Entry) {
        // naive binary search
        let min = 0, max = this.queue.length, lowest = max;
        while (min <= max) {
            const mid = Math.floor((min + max) / 2);
            let condition = false;
            if (this.priority && this.queue[mid] !== undefined) {
                condition = (this.priority(entry) < this.priority(this.queue[mid]))
            } else {
                condition = entry < this.queue[mid]
            }
            if (condition) {
                lowest = mid;
                max = mid - 1;
            } else {
                min = mid + 1;
            }
        }
        return lowest;
    }

    enqueue(e: Entry) {
        if (this.queue.length === 0) {
            this.queue = [e];
            return 1
        }
        const insertionIndex = this.getInsertionIndex(e)
        this.queue.splice(insertionIndex, 0, e)
        return insertionIndex
    }
}

class MinPriorityQueue<T> extends PriorityQueue<T> {
    constructor(items?: T[], options?: QueueOptions<T>) {
        super(items, options);
    }

    dequeue() {
        return this.queue.shift();
    }
}

class MaxPriorityQueue<T> extends PriorityQueue<T> {
    constructor(items?: T[], options?: QueueOptions<T>) {
        super(items, options);
    }

    dequeue() {
        return this.queue.pop();
    }
}

export {
    MinPriorityQueue,
    MaxPriorityQueue,
    PriorityQueue,
}