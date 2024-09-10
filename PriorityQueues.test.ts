import { MinPriorityQueue, MaxPriorityQueue, PriorityQueue } from './PriorityQueues'

const testCases = [
    { text: 'Base Class PriorityQueue', TestClass: PriorityQueue},
    { text: 'MinPriorityQueue', TestClass: MinPriorityQueue},
    { text: 'MaxPriorityQueue', TestClass: MaxPriorityQueue},
]

testCases.forEach(({text, TestClass}) => {
    describe(text, () => {
        describe('should instantiate', () => {
            it('when instantiated with no options', () => {
                const queue = new TestClass();
            })
            it('when instantiated with a list', () => {
                const queue = new TestClass([1,2,3]);
            })
            it('when instantiated with priority callback', () => {
                const queue = new TestClass(null, { priority: (val: number) => val})
            })
        })
        describe(`should insert`, () => {
            describe(`when storing numbers`, () => {
                it ('in the middle of the queue', () => {
                    const queue = new TestClass([1,2,3,5,6,7]);
                    const enqueuedValue = queue.enqueue(4);
                    expect(enqueuedValue).toBe(4);
                    expect(queue.queue.root!.value).toBe(3)
                })
                it ('in the front of the queue', () => {
                    const queue = new TestClass([2,3,4,5,6,7]);
                    const enqueuedValue = queue.enqueue(1);
                    expect(enqueuedValue).toBe(1);
                    expect(queue.queue.root!.value).toBe(4);
                })
                it ('in the back of the queue', () => {
                    const queue = new TestClass([1,2,3,4,5,6]);
                    const enqueuedValue = queue.enqueue(7);
                    expect(enqueuedValue).toBe(7);
                    // expect(queue.queue).toStrictEqual([1,2,3,4,5,6,7]);
                })
            })
            describe('when storing objects', () => {
                it ('in the middle of the queue', () => {
                    const queue = new TestClass([
                        { rank: 1 },
                        { rank: 2 },
                        { rank: 4 },
                        { rank: 5 },
                    ], { priority: (val: {rank: number}) => val.rank})
                    const enqueuedValue = queue.enqueue({ rank: 3 });
                    expect(enqueuedValue).toStrictEqual({ rank: 3})
                })
                it ('in the front of the queue', () => {
                    const queue = new TestClass([
                        { rank: 2 },
                        { rank: 3 },
                        { rank: 4 },
                        { rank: 5 }
                    ], { priority: (val) => val.rank })
                    const enqueuedValue = queue.enqueue({ rank: 1 });
                    expect(enqueuedValue).toStrictEqual({ rank: 1 });
                })
                it ('in the back of the queue', () => {
                    const queue = new TestClass([
                        { rank: 1 },
                        { rank: 2 },
                        { rank: 3 },
                        { rank: 4 },
                    ], { priority: (val: {rank: number}) => val.rank})
                    const enqueuedValue = queue.enqueue({ rank: 5 });
                    expect(enqueuedValue).toStrictEqual({ rank: 5 });
                })
            })
            describe('when storing strings', () => {
                it('in the middle of the queue', () => {
                    const queue = new TestClass(['a', 'b', 'd']);
                    const enqueuedValue = queue.enqueue('c');
                    expect(enqueuedValue).toBe('c');
                })
                it('in the front of the queue', () => {
                    const queue = new TestClass(['b', 'c', 'd']);
                    const insertionIndex = queue.enqueue('a');
                    expect(insertionIndex).toBe('a');
                })
                it('in the back of the queue', () => {
                    const queue = new TestClass(['a', 'b', 'c']);
                    const insertionIndex = queue.enqueue('d');
                    expect(insertionIndex).toBe('d');
                })
            })
        })
    })
})
describe('MinPriorityQueue', () => {
    describe('should dequeue', () => {
        it('with numbers', () => {
            const queue = new MinPriorityQueue<number>([1,2,3,4,5,6,7]);
            ([1,2,3,4,5,6,7]).forEach((num) => {
                const removed = queue.dequeue();
                expect(removed).toBe(num)
            })
        })
        it('with letters', () => {
            const queue = new MinPriorityQueue<string>(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
            (['a', 'b', 'c', 'd', 'e', 'f', 'g']).forEach((num) => {
                const removed = queue.dequeue();
                expect(removed).toBe(num)
            })
        })
    })
})

describe('MaxPriorityQueue', () => {
    describe('should dequeue', () => {
        it('with numbers', () => {
            const queue = new MaxPriorityQueue<number>([1,2,3,4,5,6,7]);
            ([7,6,5,4,3,2,1]).forEach((num) => {
                const removed = queue.dequeue();
                expect(removed).toBe(num)
            })
        })
        it('with letters', () => {
            const queue = new MaxPriorityQueue<string>(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
            (['g', 'f', 'e', 'd', 'c', 'b', 'a']).forEach((num) => {
                const removed = queue.dequeue();
                expect(removed).toBe(num)
            })
        })
    })
})
   

