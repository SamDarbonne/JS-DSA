class BinaryTreeNode<T> {
    value: T;
    left?: BinaryTreeNode<T> | null;
    right?: BinaryTreeNode<T> | null;
    constructor(value: T, left?: BinaryTreeNode<T> | null, right?: BinaryTreeNode<T> | null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

type InputList<T> = [T, ...T[]]

class BinaryTree<Entry> {
    root: BinaryTreeNode<Entry> | null;
    priority?: (arg0: Entry) => number;
    buildTree: (inputList: Entry[]) => BinaryTreeNode<Entry>
    constructor(list: Entry[], priority?: (arg0: Entry) => number) {
        this.priority = priority;
        this.buildTree = (inputList: Entry[]) => {
            if (inputList.length === 1) return new BinaryTreeNode<Entry>(inputList[0]);
            if (priority !== undefined) {
                inputList.sort((a, b) => priority(a) - priority(b))
            } else {
                inputList.sort()
            }
            const mid = Math.floor((inputList.length - 1) / 2);
            const leftArray: Entry[] = [...inputList].splice(0, mid);
            const rightArray: Entry[] = [...inputList].splice(mid + 1, inputList.length);
            const left = leftArray.length ? this.buildTree(leftArray as InputList<Entry>) : null;
            const right = rightArray.length ? this.buildTree(rightArray as InputList<Entry>) : null;
            const newNode: BinaryTreeNode<Entry> = new BinaryTreeNode<Entry>(inputList[mid], left, right);
            return newNode;
        }
        this.root = this.buildTree(list)
    }

    getHeight(node: BinaryTreeNode<Entry>): number {
        if (!node) return 0
        const {left, right} = node;
        if (!left && !right) return 0;
        else if (right && !left) return this.getHeight(right) + 1;
        else if (left && !right) return this.getHeight(left) + 1;
        else if (right && left) return Math.max(this.getHeight(left), this.getHeight(right)) + 1
        return 0
    }

    isBalanced(node: BinaryTreeNode<Entry>): boolean {
        const left = node.left ? this.getHeight(node.left) : 0;
        const right = node.right ? this.getHeight(node.right) : 0;
        if (Math.abs(left - right) < 2) {
            if (node.left && node.right) {
                return this.isBalanced(node.left) && this.isBalanced(node.right)
            } else if (node.left) return this.isBalanced(node.left)
            else if (node.right) return this.isBalanced(node.right)
            else return true
        }
        return false
    }

    compare(valueA: Entry, valueB: Entry): 0 | 1 | -1 {
        let a, b;
        if (this.priority) {
            [a, b] = [this.priority(valueA), this.priority(valueB)]
        } else [a, b] = [valueA, valueB];
        if (a === b) return 0;
        if (a < b) return 1;
        return -1
    }

    insert(entryValue: Entry, root = this.root): void {
        if (!root?.value) {
            this.root = new BinaryTreeNode<Entry>(entryValue)
            return
        }
        const newNode = new BinaryTreeNode<Entry>(entryValue);
        const comparison = this.compare(entryValue, root.value)
        switch(comparison) {
            case 1:
                if (root.left) this.insert(entryValue, root.left)
                else root.left = newNode
                break;
            case 0:
                if (root.left) {
                    newNode.left = root.left;
                    root.left = newNode;
                } else root.left = newNode;
                break;
            case -1:
                if (root.right) this.insert(entryValue, root.right)
                else root.right = new BinaryTreeNode<Entry>(entryValue)
        }
    }
}

// const tree = new BinaryTree<number>([1,2,3,4,7,8])
// console.log(tree.root)
// if (tree.root?.value) {
//     console.log(tree.getHeight(tree.root))
//     console.log(tree.isBalanced(tree.root))
//     tree.insert(5)
//     console.log(tree.root)
// }

export default BinaryTree;