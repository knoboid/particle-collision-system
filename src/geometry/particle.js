import Vector from './vector';

export default class Particle {
    constructor(x, y, r, xVelocity=0, yVelocity=0) {
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

    distanceFromCenter(point) {
        return this.position.distance(point);
    }

    distanceFromCentre(point) {
        return this.distanceFromCenter(point);
    }

    distanceBetweenParticleCenters(particle) {
        return this.distanceFromCenter(particle.position);
    }

    distanceBetweenParticleCentres(particle) {
        return this.distanceBetweenParticleCenters(particle);
    }

    distanceBetweenParticles(particle) {
        return this.distanceBetweenParticleCenters(particle) - this.radius - particle.radius;
    }

}
