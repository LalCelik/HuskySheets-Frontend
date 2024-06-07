export default class Operation {
    constructor(operator, left, right) {
        this.type = 'Operation';
        this.operator = operator;
        this.left = left;
        this.right = right;
    }
}
