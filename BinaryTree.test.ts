import BinaryTree from "./BinaryTree";

describe('Binary Tree', () => {
    describe('should instantiate', () => {
        it('with no list', () => {
            const tree = new BinaryTree([]);
            expect(tree.root?.value).toBe(undefined)
            expect(tree.root?.left).toBe(null)
            expect(tree.root?.right).toBe(null)
        })
        it('with a list', () => {
            const tree = new BinaryTree([1,2,3,4]);
            expect(tree.root?.value).toBe(2)
            expect(tree.root?.right?.right?.value).toBe(4)
        })
    })
    describe('should sort inputs properly', () => {
        it('with numbers', () => {
            const tree = new BinaryTree([1,4,5,6,3,2,9])
            expect(tree.root?.value).toBe(4);
            expect(tree.root?.left?.left?.value).toBe(1);
            expect(tree.root?.right?.right?.value).toBe(9);
        })
    })
    describe('should insert properly', () => {
        it('with numbers', () => {
            const tree1 = new BinaryTree<number>([1,2,3,4,5,6,7])
            tree1.insert(8)
            expect(tree1.root?.right?.right?.right?.value).toBe(8)
            tree1.insert(3)
            expect(tree1.root?.left?.right?.left?.value).toBe(3)
            const tree2 = new BinaryTree([1,1,1,2,3,4,5])
            expect(tree2.root?.left?.left?.value).toBe(1)
        })
    })
})
