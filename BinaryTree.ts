export class BinaryTreeNode<T> {
    value: T;
    left: BinaryTreeNode<T> | null = null;
    right: BinaryTreeNode<T> | null = null;
    height: number;
    priority?: (value: T) => number;
    constructor(value: T, priority?) {
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

    compare(nodeA: T, nodeB: T = this.value): 0 | 1 | -1 {
        let a, b;
        if (this.priority) {
            [a, b] = [this.priority(nodeA), this.priority(nodeB)]
        } else [a, b] = [nodeA, nodeB];
        if (a === b) return 0;
        if (a < b) return -1;
        return 1
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
                break;
        }
        const balance = root.getBalance();
            // Left-Left Case
        if (balance > 1) {
            if (this.compare(entry, root.left!.value)) {
                root.left = root.left!.rotateLeft();
                return root.rotateRight();
            } return root.rotateRight()
        } else if (balance < -1) {
            if (this.compare(entry, root.right!.value)) {
                root.right = root.right!.rotateRight();
                return root.rotateLeft();
            } return root.rotateLeft();
        }
        return root
    }
}

class BinaryTree<Entry> {
    root: BinaryTreeNode<Entry>;
    priority?: (value: Entry) => number;
    constructor(value: Entry | Entry[], priority?) {
    this.priority = priority;
        if (Array.isArray(value)) {
            this.root = new BinaryTreeNode<Entry>(value[0]);
            value.slice(1).forEach(entry => this.insert(entry))
        } else {
            this.root = new BinaryTreeNode<Entry>(value)
        }
    }
    insert(value: Entry): Entry {
        this.root = this.root.insert(value)
        return value;
    }
}

export default BinaryTree