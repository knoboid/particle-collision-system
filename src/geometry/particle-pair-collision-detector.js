import CollisionData from './collision-data';
import { elasticCollision as applyElasticCollision } from './physics';

export default class ParticlePairCollisionDetector {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.collisionCalculator = new CollisionCalculator(p1, p2);
    }

    callback() {
        const m1 = this.p1.radius * this.p1.radius;
        const m2 = this.p2.radius * this.p2.radius;
        applyElasticCollision(this.p1, this.p2, m1, m2);
    }

    recalculate() {
        this.collisionCalculator.update();

        if (this.collisionCalculator.isOnCollisionCourse()) {
            return new CollisionData(this.collisionCalculator.timeUntilCollision(), () => this.callback());
        }

        return new CollisionData(Infinity);
    }

}

class CollisionCalculator {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        const d = p1.radius + p2.radius;
        this.dSquared = d * d;
    }

    update() {
        const relPos = this.p1.position.subtract(this.p2.position);
        const relVel = this.p1.velocity.subtract(this.p2.velocity);

        // Set up the quadratic constants
        const a = relVel.x * relVel.x + relVel.y * relVel.y;
        const b = 2 * (relPos.x * relVel.x + relPos.y * relVel.y);
        const c = relPos.x * relPos.x + relPos.y * relPos.y - this.dSquared;

        this.quadraticEquation = new QuadraticEquationSolver(a, b, c);
    }

    isOnCollisionCourse() {
        return this.quadraticEquation.hasRealRoots && this.quadraticEquation.root1 > 0;
    }

    timeUntilCollision() {
        return this.quadraticEquation.root1;
    }
}

/**
 * Handles the Quadratic Equation specific calculations.
 * 
 * If there are real roots the first root is calculated.
 * 
 * The current application does not require the second root, so we do not 
 * waste time calculating it.
 */
class QuadraticEquationSolver {
    constructor(a, b, c) {
        const bSquaredMinusFourAC = b * b - 4 * a * c;
        if (bSquaredMinusFourAC > 0) {
            this.hasRealRoots = true;
            const sqrt = Math.sqrt(bSquaredMinusFourAC);
            this.root1 = (-b - sqrt)/(2 * a);
        }
        else {
            this.hasRealRoots = false;
        }
    }
}
