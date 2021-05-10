export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        let x = this.x + vector.x;
        let y = this.y + vector.y;
        return new Vector(x, y);
        
    }

    subtract(vector) {
        let x = this.x - vector.x;
        let y = this.y - vector.y;
        return new Vector(x, y);
    }

    multiply(scalar) {
        let x = scalar * this.x;
        let y = scalar * this.y;
        return new Vector(x, y);
    }

    distance(vector) {
        let x = this.x - vector.x;
        let y = this.y - vector.y;
        return Math.sqrt(x * x + y * y);
    }

    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }
}
