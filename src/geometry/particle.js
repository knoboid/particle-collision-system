import Vector from './vector';

export default class Particle {
    constructor(x, y, r, xVelocity, yVelocity) {
        this.position = new Vector(x, y);
        this.radius = r;
        this.velocity = new Vector(xVelocity, yVelocity);
    }

    add(vector) {
        this.position = this.position.add(vector);
    }

    update() {
        this.add(this.velocity);
    }
}
