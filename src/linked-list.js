const Node = require('./node');

class LinkedList {

  constructor() {
    this.length = 0;
    this._head = null;
    this._tail = null;
  }

  append(data) {
    var node;
    if (this.length === 0) {
      node = new Node(data);
      this._head = node;
      this._tail = node;
    } else if (this.length === 1) {
      this._tail = new Node(data, null, this._head);
      this._head.prev = this._tail;
    } else if (this.length > 1) {
      node = new Node(data, null, this._tail)
      this._tail.prev = node;
      this._tail = node;
    }
    this.length++;
    return this;
  }

  head() {
    return this._head.data;
  }

  tail() {
    return this._tail.data;
  }

  at(index) {
    var node = this._head,
      count = 0;
    if (index === 0) {
      return node.data;
    }
    do {
      node = node.prev
      count++
    } while (count < index)
    return node.data;
  }

  insertAt(index, data) {
    var node, newnode,count = 0;
    node = this._head;
    if (index === 0) {
      node = new Node(data, this._head, null);
      this._head.next = node;
      return this;
    }
    do {
      node = node.prev
      count++
    } while (count < index)
    newnode = new Node(data, node, node.next);
    node.next.prev = newnode
    node.next = newnode
    this.length++;
    return this;
  }

  isEmpty() {
    return this.length === 0 ? true : false;
  }

  clear() {
    this.length = 0
    this._tail = new Node();
    this._head = new Node();
    return this;
  }

  deleteAt(index) {
    var node = this._head,
      count = 0;
    if (this.length === 1) {
      return this.clear();
    }
    if (index === 0) {
      node.prev.next = null
      this._head = node.prev
      return this;
    }
    do {
      node = node.prev
      count++
    } while (count < index)
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  reverse() {
    var node = this._head,
    n,headData;
    do {
       n = node.next;
      node.next = node.prev;
      node.prev = n;
      node = node.next;
    } while (node != null && node.next != null)
    headData = this._head;
    this._head = this._tail;
    this._tail = headData;
    return this;
  }

  indexOf(data) {
    var node = this._head,
      count = 0;
    if (node.data === data) {
      return count;
    }
    do {
      node = node.prev
      if (node === null) {
        return -1
      }
      count++
      if (node.data === data) {
        return count;
      }
    } while (count < this.length)
  }
}

module.exports = LinkedList;
