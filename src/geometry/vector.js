import Victor from 'victor';

export default class Vector {
    constructor(x, y) {
        this.vector = new Victor(x, y);
    }

    clone() {
        return this.vector.clone();
    }

    add(vector) {
        let result = this.clone().add(vector.vector);
        return new Vector(result.x, result.y);
    }
}
