import ParticleRegistry from './particle-registry';
import CollisionData from './collision-data';

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

    recalculateAll() {
        this.getParticleNames().forEach( particleName => {
            this.recalculateAndStore(particleName);
        });
    }

    recalculateAndStore(particleName) {
        let collisionDetector = this.getCollisionDetector(particleName);
        let collisionData = collisionDetector.recalculate();
        this.storeCollisionData(particleName, collisionData);
    }

    storeCollisionData(particleName, collisionData) {
        this.calculatedCollisionData[particleName] = collisionData;
    }

    getNextCollision() {
        let timeUntilNextCollision = Infinity;
        let nextCollisions = [ new CollisionData(timeUntilNextCollision) ];
        let collisionData;

        this.getParticleNames().forEach( particleName => {
            collisionData = this.calculatedCollisionData[particleName];
            if (collisionData.timeUntilCollision < timeUntilNextCollision) {
                timeUntilNextCollision = collisionData.timeUntilCollision;
                nextCollisions = [ collisionData ];
            }
            else if(collisionData.timeUntilCollision == timeUntilNextCollision) {
                nextCollisions.push(collisionData);
            }
        });
        this.nextCollisions = nextCollisions;
        return nextCollisions;
    }
}
