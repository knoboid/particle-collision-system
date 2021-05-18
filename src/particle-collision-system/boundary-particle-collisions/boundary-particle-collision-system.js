import ParticleRegistry from '../particle-registry';
import CollisionData from '../collision-data';

let particleRegistry = ParticleRegistry.getInstance();

export default class BoundaryParticleCollisionSystem {
    constructor(rectangularBoundary) {
        this.rectangularBoundary = rectangularBoundary;
        this.collisionDetectors = {};
        this.calculatedCollisionData = {};
    }

    addNewParticle(particleName) {
        const particle = particleRegistry.getParticle(particleName);
        const collisionDetector = this.rectangularBoundary.newBoundaryCollisionDetector(particle);
        this.collisionDetectors[particleName] = collisionDetector;
    }

    getCollisionDetector(particleName) {
        return this.collisionDetectors[particleName];
    }

    getCollisionDetectors() {
        return Object.values(this.collisionDetectors);
    }

    getParticleNames() {
        return Object.keys(this.collisionDetectors);
    }

    recalculate(particleName, currentTime) {
        this.recalculateAndStore(particleName, currentTime);
    }

    recalculateAll(currentTime) {
        this.getParticleNames().forEach( particleName => {
            this.recalculateAndStore(particleName, currentTime);
        });
    }

    recalculateAndStore(particleName, currentTime) {
        let collisionDetector = this.getCollisionDetector(particleName);
        let collisionData = collisionDetector.recalculate(currentTime);
        this.storeCollisionData(particleName, collisionData);
    }

    storeCollisionData(particleName, collisionData) {
        collisionData.setParticleNames([particleName]);
        this.calculatedCollisionData[particleName] = collisionData;
    }

    evaluateNextCollisions(nextCollisions) {
        this.getParticleNames().forEach( particleName => {
            const collisionData = this.calculatedCollisionData[particleName];
            nextCollisions.evaluate(collisionData);

        });
    }

}
