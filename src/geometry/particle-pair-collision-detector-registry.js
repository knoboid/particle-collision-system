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
        this.recalculateResults = {};

    }

    static getInstance(p5) {
        return ParticlePairCollisionDetectorRegistry.instance;
    }

    addParticle(particleName) {
        let particle = particleRegistry.getParticle(particleName);
        this.addNewParticlePairCollisionDetectors(particleName, particle);
        this.particles[particleName] = particle;
        this.recalculateResults[particleName] = {};
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
            let result = collisionDetector.recalculate();
            this.storeResult(particleName, name, result);
        });
    }

    recalculateAll() {
        let particleNames = this.particleNames();
        let size = particleNames.length;
        if (size < 2) return;
        let outerLoopNames = particleNames.slice(0, -1);
        let counter = 1;
        outerLoopNames.forEach( name1 => {
            let innerLoopNames = particleNames.slice(counter)
            innerLoopNames.forEach( name2 => {
                this.recalculateAndStore(name1, name2);
            });
            counter++;
        });
    }

    recalculatePair(name1, name2) {
        this.recalculate(name1);
        this.recalculate(name2);
    }

    recalculateAndStore(name1, name2) {
        let collisionDetector = this.getCollisionDetector(name1, name2);
        let result = collisionDetector.recalculate();
        this.storeResult(name1, name2, result);
    }

    storeResult(name1, name2, result) {
        this.recalculateResults[name1][name2] = result;
        this.recalculateResults[name2][name1] = result;
    }

    particleNames() {
        return Object.keys(this.particles);
    }

}

ParticlePairCollisionDetectorRegistry.instance = new ParticlePairCollisionDetectorRegistry();

export default ParticlePairCollisionDetectorRegistry;
