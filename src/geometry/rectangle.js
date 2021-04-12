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

    /**
     * Calculates whether point (x, y) is inside the rectangle.
     * A positive margin defines a rectanglar boundary within the 
     * rectagle to which the calculation is then applied. 
     * @param {*} x 
     * @param {*} y 
     * @param {*} margin
     * @returns boolean
     */
    isInside(x, y, margin=0) {
        return this.isWithinLeft(x, margin)  &&
            this.isWithinTop(y, margin) &&
            this.isWithinRight(x, margin) &&
            this.isWithinBottom(y, margin);
    }

    isWithinLeft(x, margin=0) {
        return x > this.x + margin;
    }

    isWithinRight(x, margin=0) {
        return x < this.x + this.width - margin;
    }

    isWithinTop(y, margin=0) {
        return y > this.y + margin;
    }

    isWithinBottom(y, margin=0) {
        return y < this.y + this.height - margin;
    }

    xRight() {
        return this.x + this.width;
    }

    xLeft() {
        return this.x;
    }

    yBottom() {
        return this.y + this.height;
    }

    yTop() {
        return this.y;
    }

}
