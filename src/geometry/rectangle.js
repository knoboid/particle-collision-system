export default class Rectangle {

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }

    inside(x, y) {
        return x > this.x  &&
            y > this.y &&
            x < this.x + this.width &&
            y < this.y + this.height;
    }

}
