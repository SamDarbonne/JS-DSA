export class BinaryTreeNode<T> {
    value: T | null;
    left: BinaryTreeNode<T> | null = null;
    right: BinaryTreeNode<T> | null = null;
    height: number;
    priority?: (value: T) => number;
    constructor(value: T | null, priority?) {
        this.height = 1;
        this.priority = priority;
        this.value = value;
    }

    getHeight(node: BinaryTreeNode<T> | null = this): number {
        if (!node) return 0;
        if (!node.left && !node.right) return 1;
        return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

    getBalance(node: BinaryTreeNode<T> = this): number {
        return ((node.left?.getHeight() || 0) - (node.right?.getHeight() || 0));
    }

    compare(nodeA: T | null, nodeB: T | null = this.value as T | null): 0 | 1 | -1 {
        let a, b;
        if (this.priority) {
            [a, b] = [nodeA ? this.priority(nodeA) : null, nodeB ? this.priority(nodeB) : null];
        } else [a, b] = [nodeA, nodeB];
        if (a === b) return 0;
        if (a && b && a < b) return -1;
        return 1;
    }

    rotateRight(node: BinaryTreeNode<T> = this): BinaryTreeNode<T> {
        if (node.left) {
            const newNode = node.left;
            const temp = newNode.right;
            newNode.right = node;
            newNode.right.left = temp;
            newNode.height = newNode.getHeight();
            newNode.right.height = newNode.right.getHeight();
            if (newNode.left) newNode.left.height = newNode.left.getHeight();
            return newNode
        }
        return node
    }

    rotateLeft(node: BinaryTreeNode<T> = this): BinaryTreeNode<T> {
        if (node.right) {
            const newNode = node.right;
            const temp = newNode.left;
            newNode.left = node;
            newNode.left.right = temp;
            newNode.height = newNode.getHeight();
            newNode.left.height = newNode.left.getHeight();
            if (newNode.right) newNode.right.height = newNode.right.getHeight();
            return newNode
        }
        return node
    }

    rebalance(node: BinaryTreeNode<T> = this): BinaryTreeNode<T> {
        const balance = node.getBalance();
        if (balance > 1) {
            if (this.compare(node.value, node.left!.value)) {
                node.left = node.left!.rotateLeft();
                return node.rotateRight();
            } return node.rotateRight()
        } else if (balance < -1) {
            if (this.compare(node.value, node.right!.value)) {
                node.right = node.right!.rotateRight();
                return node.rotateLeft();
            } return node.rotateLeft();
        }
        return node
    }

    insert(entry: T, root: BinaryTreeNode<T> = this): BinaryTreeNode<T> {
        if (!root?.value) {
            root = new BinaryTreeNode<T>(entry)
            return root
        }
        const comparison = this.compare(entry, root.value)
        switch (comparison) {
            case -1:
                if (root.left) {
                    root.left = root.left.insert(entry);
                } else {
                    root.left = new BinaryTreeNode<T>(entry, this.priority);
                }
                break;
            case 1:
                if (root.right) {
                    root.right = root.right.insert(entry);
                } else {
                    root.right = new BinaryTreeNode<T>(entry, this.priority);
                }
                break;
            case 0:
                return root;
        }
        return this.rebalance();
    }
    
    removeFromLeft(): [BinaryTreeNode<T> | null, T | null] {
        let newRoot: BinaryTreeNode<T> | null = null,
            outputValue: T | null = null;
        if (!this.left) {
            outputValue = this.value;
            newRoot = this.right;
        } else {
            const [newLeft, value] = this.left.removeFromLeft();
            outputValue = value;
            this.left = newLeft;
            this.height = this.getHeight();
            newRoot = this.rebalance();
        }
        return [newRoot, outputValue];
    }

    removeFromRight(): [BinaryTreeNode<T> | null, T | null] {
        let newRoot: BinaryTreeNode<T> | null = null,
            outputValue: T | null = null;
        if (!this.right) {
            outputValue = this.value;
            newRoot = this.left;
        } else {
            const [newRight, value] = this.right.removeFromRight();
            outputValue = value;
            this.right = newRight;
            this.height = this.getHeight();
            newRoot = this.rebalance();
        }
        return [newRoot, outputValue];
    }
}

class BinaryTree<Entry> {
    root: BinaryTreeNode<Entry> | null = null;
    priority?: (value: Entry) => number;
    
    constructor(value: Entry | Entry[] | null, priority?) {
    this.priority = priority;
        if (Array.isArray(value)) {
            this.root = new BinaryTreeNode<Entry>(value[0]);
            value.slice(1).forEach(entry => this.insert(entry))
        } else {
            this.root = new BinaryTreeNode<Entry>(value)
        }
    }

    insert(value: Entry): Entry {
        if (!this.root) {
            this.root = new BinaryTreeNode<Entry>(value)
        }
        this.root = this.root.insert(value)
        return value;
    }

    removeFromSide(side: 'left' | 'right'): () => Entry | null {
        return () => {
            const left = side === 'left';
            if (!this.root) return null;
            const [newRoot, value] = left ? this.root.removeFromLeft() : this.root.removeFromRight();
            this.root = newRoot;
            return value;
        }
        
    }

    removeFromLeft = this.removeFromSide('left')
    removeFromRight = this.removeFromSide('right');
}

export default BinaryTree