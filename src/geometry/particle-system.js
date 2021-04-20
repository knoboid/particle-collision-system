import ParticleRegistry from './particle-registry';
import ParticleCollisionManager from './particle-collision-manager';
import FurureCollisions from './future-collisions';

let registry = ParticleRegistry.getInstance();

export default class ParticleSystem {
    constructor(boundary) {
        this.setBoundary(boundary);
        this.particles = {};
        this.timeToNextCollision = Infinity; // this should probably belong to FutureCollisions
        this.futureCollisions = new FurureCollisions();
    }

    setBoundary(boundary) {
        this.boundary = boundary;
    }

    addParticle(particle) {
        let particleName = registry.registerParticle(particle);
        let collisionManager = new ParticleCollisionManager(particle);
        let collisionDetector = this.boundary.newBoundaryCollisionDetector(particle);
        collisionManager.addCollisionDetector(collisionDetector, 'boundary');
        this.particles[particleName] = {
            particle,
            collisionManager,
        };
        this.futureCollisions.update(particleName, collisionManager.timeToNextCollision);
    }

    update(timeStep=1) {
        Object.values(this.particles).forEach((particleData) => {
            particleData.particle.update(timeStep);
        });
    }
}
