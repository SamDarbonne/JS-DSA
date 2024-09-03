import BinaryTree, { BinaryTreeNode } from "./BinaryTree";

const testSorting = (node): boolean => {
    if (node.left !== null) {
        expect(node.compare(node.left.value)).toBe(-1)
        if (!testSorting(node.left)) return false
    }
    if (node.right !== null) {
        expect(node.compare(node.right.value)).toBe(1)
        if (!testSorting(node.right)) return false
    }
    return true;
}

describe('Binary Tree', () => {
    describe('should instantiate', () => {
        describe('with one input', () => {
            it('number', () => {
                const tree = new BinaryTree<number>(1);
                expect(tree.root.value).toBe(1)
                expect(tree.root.left).toBe(null)
                expect(tree.root.right).toBe(null)
            })
            it('string', () => {
                const tree = new BinaryTree<string>('hello');
                expect(tree.root.value).toBe('hello')
                expect(tree.root.left).toBe(null)
                expect(tree.root.right).toBe(null)
            })
        })
        describe('with a list', () => {
            describe('of numbers', () => {
                it('sorted', () => {
                    const tree = new BinaryTree<number>([1,2,3,4]);
                    expect(testSorting(tree.root)).toBe(true);
                })
                it('unsorted', () =>{
                    const tree = new BinaryTree([1,4,3,2]);
                    expect(testSorting(tree.root)).toBe(true);
                })
            })

            describe('of strings', () => {
                it('sorted', () => {
                    const tree = new BinaryTree(['a', 'b', 'c', 'd']);
                    expect(testSorting(tree.root)).toBe(true)
                })
                it('unsorted', () =>{
                    const tree = new BinaryTree(['a', 'd', 'c', 'b']);
                    expect(testSorting(tree.root)).toBe(true)
                })
            })
        })
    })
    describe('should calculate height correctly', () => {
        it('for lopsided insertion', () => {
            const tree = new BinaryTree<number>([4])
            tree.insert(3)
            tree.insert(2)
            expect(tree.root.getHeight()).toBe(2)
        })
        it('for balanced trees', () => {
            const tree = new BinaryTree<number>([4,2,6,1,3,5,7])
            expect(tree.root.getHeight()).toBe(3)
        })
    })
    describe('should rotate', () => {
        describe('right', () => {
            it('simple tree', () => {
                let root = new BinaryTreeNode<number>(2);
                root.left = new BinaryTreeNode<number>(1);
                root.right = new BinaryTreeNode<number>(3);
                root = root.rotateRight();
                expect(root.value).toBe(1)
                expect(root.left).toBe(null);
                expect(root.right?.value).toBe(2)
                expect(root.right?.right?.value).toBe(3)
                expect(root.height).toBe(3);
                expect(root.right?.height).toBe(2)
                expect(root.right?.right?.height).toBe(1)
            })
        })
        describe('left', () => {
            it('simple tree', () => {
                let root = new BinaryTreeNode<number>(2);
                root.left = new BinaryTreeNode<number>(1);
                root.right = new BinaryTreeNode<number>(3);
                root = root.rotateLeft();
                expect(root.value).toBe(3);
                expect(root.right).toBe(null);
                expect(root.left?.value).toBe(2);
                expect(root.left?.left?.value).toBe(1);
                expect(root.height).toBe(3);
                expect(root.left?.height).toBe(2);
                expect(root.left?.left?.height).toBe(1);
            })
        })
    })
})
