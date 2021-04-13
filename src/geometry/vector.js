import VectorAdapter from './victor-adapter';

export default class Vector extends VectorAdapter {
    constructor(x, y) {
        super(x, y);
    }

    add(vector) {
        return super.add(vector);
    }

    subtract(vector) {
        return super.subtract(vector);
    }

    multiply(scalar) {
        return super.multiply(scalar);
    }

    distance(vector) {
        return super.distance(vector);
    }
}
