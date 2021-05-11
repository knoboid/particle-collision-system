import ParticleRegistry from './particle-registry';
// import ParticlePairCollisionDetector from './particle-pair-collision-detector';
// import CollisionData from './collision-data';

let particleRegistry = ParticleRegistry.getInstance();

export default class BoundaryParticleCollisionSystem {
    constructor(rectangularBoundary) {
        this.rectangularBoundary = rectangularBoundary;
        this.collisionDetectors = {};
    }

    addNewParticle(particleName) {
        const particle = particleRegistry.getParticle(particleName);
        const collisionDetector = this.rectangularBoundary.newBoundaryCollisionDetector(particle);
        this.collisionDetectors[particleName] = collisionDetector;
    }

    getCollisionDetectors() {
        return Object.values(this.collisionDetectors);
    }
}
