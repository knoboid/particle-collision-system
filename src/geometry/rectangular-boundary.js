export default class RectangularBoundary {
    constructor(rectangle) {
        this.rectangle = rectangle;
    }

    bounce(particle) {
        if (!this.rectangle.isWithinRight(particle.position.x, particle.radius)) {
            particle.velocity.x = -particle.velocity.x;
        } else {
            if (!this.rectangle.isWithinLeft(particle.position.x, particle.radius)) {
                particle.velocity.x = -particle.velocity.x;
            }
        }
    
        if (!this.rectangle.isWithinTop(particle.position.y, particle.radius)) {
            particle.velocity.y = -particle.velocity.y;
        } else {
            if (!this.rectangle.isWithinBottom(particle.position.y, particle.radius)) {
                particle.velocity.y = -particle.velocity.y;
            }
        }
    }
}
