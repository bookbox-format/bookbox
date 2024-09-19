export interface LinkedList<T> {
    head: ListItem<T> | null;
    tail: ListItem<T> | null;
}

export interface ListItem<T> {
    next: ListItem<T> | null;
    prev: ListItem<T> | null;
    data: T;
}

function getItem<T>(data: T): ListItem<T> {
    return {
        data,
        next: null,
        prev: null,
    };
}

export function addTail<T>(list: LinkedList<T>, data: T): void {
    const item = getItem(data);
    const oldTail = list.tail;
    if (oldTail) {
        oldTail.next = item;
        item.prev = oldTail;
    }
    list.tail = item;
}

export function addHead<T>(list: LinkedList<T>, data: T): void {
    const item = getItem(data);
    const oldHead = list.head;
    if (oldHead) {
        oldHead.prev = item;
        item.next = oldHead;
    }
    list.head = item;
}

export function removeHead<T>(list: LinkedList<T>): void {
    const oldHead = list.head;
    if (oldHead) {
        const currentHead = oldHead.next;
        if (currentHead) {
            currentHead.prev = null;
        }
        list.head = currentHead;
    }
}

export function removeTail<T>(list: LinkedList<T>): void {
    const oldTail = list.tail;
    if (oldTail) {
        const currentTail = oldTail.prev;
        if (currentTail) {
            currentTail.next = null;
        }
        list.tail = currentTail;
    }
}

export function findItem<T>(list: LinkedList<T>, find: (data: T) => boolean): ListItem<T> | null {
    let current = list.head;
    while (current !== null) {
        if (find(current.data)) {
            return current;
        }
        current = current.next;
    }
    return null;
}
