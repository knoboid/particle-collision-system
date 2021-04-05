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
        return x > this.x + margin  &&
            y > this.y + margin &&
            x < this.x + this.width - margin &&
            y < this.y + this.height - margin;
    }

}
