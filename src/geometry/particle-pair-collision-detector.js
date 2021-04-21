export default class ParticlePairCollisionDetector {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        let d = p1.radius + p2.radius;
        this.dSquared = d * d;
    }

    callback() {
        // this.p1.velocity.x = -this.p1.velocity.x;
        // this.p1.velocity.y = -this.p1.velocity.y;

        // this.p2.velocity.x = -this.p2.velocity.x;
        // this.p2.velocity.y = -this.p2.velocity.y;
    }

    recalculate() {
        let sx = this.p1.position.x - this.p2.position.x;
        let sy = this.p1.position.y - this.p2.position.y;
        let wx = this.p1.velocity.x - this.p2.velocity.x;
        let wy = this.p1.velocity.y - this.p2.velocity.y;

        // Set up the quadratic constants
        let a = wx * wx + wy * wy;
        let b = 2 * (sx * wx + sy * wy);
        let c = sx * sx + sy * sy - this.dSquared;

        let bSquaredMinusFourAC = b * b - 4 * a * c;

        if (bSquaredMinusFourAC > 0) {
            let sqrt = Math.sqrt(bSquaredMinusFourAC);
            let t1 =  (-b - sqrt)/(2 * a);
            if (t1 > 0) {
                return [undefined, 'particle', t1, () => this.callback()];
            }
        }
        return [undefined, undefined, Infinity];
    }

}
