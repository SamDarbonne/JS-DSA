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
                expect(Array.isArray(queue.queue)).toBe(true);
                expect(queue.queue.length).toBe(0);
            })
            it('when instantiated with a list', () => {
                const queue = new TestClass([1,2,3]);
                expect(Array.isArray(queue.queue)).toBe(true);
                expect(queue.queue.length).toBe(3);
            })
            it('when instantiated with priority callback', () => {
                const queue = new TestClass(null, { priority: (val: number) => val})
                expect(Array.isArray(queue.queue)).toBe(true);
                expect(queue.queue.length).toBe(0);
            })
        })
        describe(`should insert at proper index`, () => {
            describe(`when storing numbers`, () => {
                it ('in the middle of the queue', () => {
                    const queue = new TestClass([1,2,3,5,6,7]);
                    const insertionIndex = queue.enqueue(4);
                    expect(insertionIndex).toBe(3);
                    expect(queue.queue).toStrictEqual([1,2,3,4,5,6,7]);
                })
                it ('in the front of the queue', () => {
                    const queue = new TestClass([2,3,4,5,6,7]);
                    const insertionIndex = queue.enqueue(1);
                    expect(insertionIndex).toBe(0);
                    expect(queue.queue).toStrictEqual([1,2,3,4,5,6,7]);
                })
                it ('in the back of the queue', () => {
                    const queue = new TestClass([1,2,3,4,5,6]);
                    const insertionIndex = queue.enqueue(7);
                    expect(insertionIndex).toBe(6);
                    expect(queue.queue).toStrictEqual([1,2,3,4,5,6,7]);
                })
            })
            describe('when storing objects', () => {
                const sortedQueue = [
                    { rank: 1 },
                    { rank: 2 },
                    { rank: 3 },
                    { rank: 4 },
                    { rank: 5 }
                ]
                it ('in the middle of the queue', () => {
                    const queue = new TestClass([
                        { rank: 1 },
                        { rank: 2 },
                        { rank: 4 },
                        { rank: 5 },
                    ], { priority: (val: {rank: number}) => val.rank})
                    const insertionIndex = queue.enqueue({ rank: 3 });
                    expect(insertionIndex).toBe(2)
                    expect(queue.queue).toStrictEqual(sortedQueue)
                })
                it ('in the front of the queue', () => {
                    const queue = new TestClass([
                        { rank: 2 },
                        { rank: 3 },
                        { rank: 4 },
                        { rank: 5 }
                    ], { priority: (val) => val.rank })
                    const insertionIndex = queue.enqueue({ rank: 1 });
                    expect(insertionIndex).toBe(0)
                    expect(queue.queue).toStrictEqual(sortedQueue)
                })
                it ('in the back of the queue', () => {
                    const queue = new TestClass([
                        { rank: 1 },
                        { rank: 2 },
                        { rank: 3 },
                        { rank: 4 },
                    ], { priority: (val: {rank: number}) => val.rank})
                    const insertionIndex = queue.enqueue({ rank: 5 });
                    expect(insertionIndex).toBe(4)
                    expect(queue.queue).toStrictEqual(sortedQueue)
                })
            })
            describe('when storing strings', () => {
                const sortedQueue = ['a', 'b', 'c', 'd']
                it('in the middle of the queue', () => {
                    const queue = new TestClass(['a', 'b', 'd']);
                    const insertionIndex = queue.enqueue('c');
                    expect(insertionIndex).toBe(2);
                    expect(queue.queue).toStrictEqual(sortedQueue);
                })
                it('in the front of the queue', () => {
                    const queue = new TestClass(['b', 'c', 'd']);
                    const insertionIndex = queue.enqueue('a');
                    expect(insertionIndex).toBe(0);
                    expect(queue.queue).toStrictEqual(sortedQueue);
                })
                it('in the back of the queue', () => {
                    const queue = new TestClass(['a', 'b', 'c']);
                    const insertionIndex = queue.enqueue('d');
                    expect(insertionIndex).toBe(3);
                    expect(queue.queue).toStrictEqual(sortedQueue);
                })
            })
        })
    })
})

