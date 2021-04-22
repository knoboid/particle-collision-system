import ParticleRegistry from './particle-registry';
import ParticlePairCollisionDetector from './particle-pair-collision-detector';

let particleRegistry = ParticleRegistry.getInstance();

class ParticlePairCollisionDetectorRegistry {
    constructor() {
        this.clear();
    }

    clear() {
        this.particles = {};
        this.particlePairCollisionDetectors = {};
        this.particlePairCollisionDetectorArray = [];
        this.calculatedCollisionData = {};
    }

    static getInstance(p5) {
        return ParticlePairCollisionDetectorRegistry.instance;
    }

    addParticle(particleName) {
        let particle = particleRegistry.getParticle(particleName);
        this.addNewParticlePairCollisionDetectors(particleName, particle);
        this.particles[particleName] = particle;
        this.calculatedCollisionData[particleName] = {};
    }

    addNewParticlePairCollisionDetectors(particleName, particle) {
        this.particlePairCollisionDetectors[particleName] = {};
        Object.entries(this.particles).forEach( ([targetParticleName, targetParticle]) => {
            let particlePairCollisionDetector = new ParticlePairCollisionDetector(particle, targetParticle);
            this.particlePairCollisionDetectorArray.push(particlePairCollisionDetector);
            this.particlePairCollisionDetectors[particleName][targetParticleName] = particlePairCollisionDetector;
            this.particlePairCollisionDetectors[targetParticleName][particleName] = particlePairCollisionDetector;
        });
    }

    getCollisionDetector(name1, name2) {
        return this.particlePairCollisionDetectors[name1][name2];
    }

    getCollisionDetectors(particleName) {
        return this.particlePairCollisionDetectors[particleName];
    }

    recalculate(particleName) {
        let collisionDetectorEntries = Object.entries(this.getCollisionDetectors(particleName));
        collisionDetectorEntries.forEach( ([name, collisionDetector]) => {
            let collisionData = collisionDetector.recalculate();
            this.storeCollisionData(particleName, name, collisionData);
        });
    }

    traverseAll(callback) {
        let particleNames = this.particleNames();
        let size = particleNames.length;
        if (size < 2) return;
        let outerLoopNames = particleNames.slice(0, -1);
        let counter = 1;
        outerLoopNames.forEach( name1 => {
            let innerLoopNames = particleNames.slice(counter)
            innerLoopNames.forEach( name2 => {
                callback(name1, name2);
            });
            counter++;
        });
    }

    recalculateAll() {
        this.traverseAll((name1, name2) => {
            this.recalculateAndStore(name1, name2);
        });
    }

    recalculatePair(name1, name2) {
        this.recalculate(name1);
        this.recalculate(name2);
    }

    recalculateAndStore(name1, name2) {
        let collisionDetector = this.getCollisionDetector(name1, name2);
        let collisionData = collisionDetector.recalculate();
        this.storeCollisionData(name1, name2, collisionData);
    }

    storeCollisionData(name1, name2, collisionData) {
        this.calculatedCollisionData[name1][name2] = collisionData;
        this.calculatedCollisionData[name2][name1] = collisionData;
    }

    particleNames() {
        return Object.keys(this.particles);
    }

    /**
     * Traverses the calculatedCollisionData property and finds the 
     * collisionData with the lowest time-to-next-collision.
     * Returns the result, and also assigns it to the nextCollisionData property
     * 
     * @returns nextCollisionData 
     */
    getNextCollision() {
        let nextCollisionData = [undefined, undefined, Infinity, undefined];
        let collisionData;

        this.traverseAll((name1, name2) => {
            collisionData = this.calculatedCollisionData[name1][name2];
            if (collisionData[2] < nextCollisionData[2]) nextCollisionData = collisionData;
        });
        this.nextCollisionData = nextCollisionData;
        return nextCollisionData;
    }

}

ParticlePairCollisionDetectorRegistry.instance = new ParticlePairCollisionDetectorRegistry();

export default ParticlePairCollisionDetectorRegistry;
