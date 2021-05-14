import ParticleRegistry from '../particle-registry';
import ParticlePairCollisionDetector from './particle-pair-collision-detector';
import CollisionData from '../collision-data';

let particleRegistry = ParticleRegistry.getInstance();

export default class ParticlePairCollisionSystem {
    constructor() {
        this.clear();
    }

    clear() {
        this.particles = {};
        this.particlePairCollisionDetectors = {};
        this.particlePairCollisionDetectorArray = [];
        this.calculatedCollisionData = {};
    }

    addNewParticle(particleName) {
        let particle = particleRegistry.getParticle(particleName);
        this.addNewParticlePairCollisionDetectors(particleName, particle);
        this.particles[particleName] = particle;
        this.calculatedCollisionData[particleName] = {};
    }

    /**
     * Creates and stores new ParticlePairCollisionDetector's for a 
     * Particle that is about to be added to the system.
     * @param {*} particleName - name of Particle about to be added to the 
     *                           collision system
     * @param {*} particle - Particle about to be added to the collision system
     */
    addNewParticlePairCollisionDetectors(particleName, particle) {
        this.particlePairCollisionDetectors[particleName] = {};
        Object.entries(this.particles).forEach( ([targetParticleName, targetParticle]) => {
            let particlePairCollisionDetector = new ParticlePairCollisionDetector(particle, targetParticle);
            this.particlePairCollisionDetectorArray.push(particlePairCollisionDetector);
            this.particlePairCollisionDetectors[particleName][targetParticleName] = particlePairCollisionDetector;
            this.particlePairCollisionDetectors[targetParticleName][particleName] = particlePairCollisionDetector;
        });
    }

    /**
     * Get the collisionDetector for a Particle pair.
     * @param {*} name1 
     * @param {*} name2 
     * @returns 
     */
    getCollisionDetector(name1, name2) {
        return this.particlePairCollisionDetectors[name1][name2];
    }

    /**
     * Get all collisionDetectors for a Particle.
     * @param {*} particleName 
     * @returns 
     */
    getCollisionDetectors(particleName) {
        return this.particlePairCollisionDetectors[particleName];
    }

    /**
     * Recalculate and store all collisionData for a Particle.
     * @param {*} particleName 
     */
    recalculate(particleName) {
        let collisionDetectorEntries = Object.entries(this.getCollisionDetectors(particleName));
        collisionDetectorEntries.forEach( ([name, collisionDetector]) => {
            let collisionData = collisionDetector.recalculate();
            this.storeCollisionData(particleName, name, collisionData);
        });
    }

    /**
     * Invokes the given callback on all particle pairs.
     * @param {} callback 
     * @returns 
     */
    traverseAll(callback) {
        const particleNames = this.particleNames();
        const size = particleNames.length;
        if (size < 2) return;
        const outerLoopNames = particleNames.slice(0, -1);
        let counter = 1;
        outerLoopNames.forEach( name1 => {
            const innerLoopNames = particleNames.slice(counter)
            innerLoopNames.forEach( name2 => {
                callback(name1, name2);
            });
            counter++;
        });
    }

    /**
     * Recalculate and store all collisionData.
     */
    recalculateAll() {
        this.traverseAll((name1, name2) => {
            this.recalculateAndStore(name1, name2);
        });
    }

    /**
     * Recalculate collisionData for a Particle pair.
     * @param {*} name1 
     * @param {*} name2 
     */
    recalculatePair(name1, name2) {
        this.recalculate(name1);
        this.recalculate(name2);
    }

    /**
     * Recalculate and store collisionData for a Particle pair.
     * @param {*} name1 
     * @param {*} name2 
     */
    recalculateAndStore(name1, name2) {
        let collisionDetector = this.getCollisionDetector(name1, name2);
        let collisionData = collisionDetector.recalculate();
        this.storeCollisionData(name1, name2, collisionData);
    }

    /**
     * Store collisionData for a Particle pair.
     * @param {*} name1 
     * @param {*} name2 
     * @param {*} collisionData 
     */
    storeCollisionData(name1, name2, collisionData) {
        collisionData.setParticleNames([name1, name2]);
        this.calculatedCollisionData[name1][name2] = collisionData;
        this.calculatedCollisionData[name2][name1] = collisionData;
    }

    /**
     * Returns an Array of the names of all particles in the 
     * collision system.
     * @returns 
     */
    particleNames() {
        return Object.keys(this.particles);
    }

    /**
     * Traverses the calculatedCollisionData property and finds 
     * collisionData with the lowest time-to-next-collision.
     * 
     * Returns the result, and also assigns it to the nextCollisions property.
     * 
     * Since it is possible for two particle collisions to occur simultaneously
     * the result of this method is an array.
     * 
     * @returns nextCollisions 
     */
    getNextCollision() {
        let timeUntilNextCollision = Infinity;
        let nextCollisions = [ new CollisionData(timeUntilNextCollision) ];
        let collisionData;

        this.traverseAll((name1, name2) => {
            collisionData = this.calculatedCollisionData[name1][name2];
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

    reduceCalculatedCollisionTimes(timeDelta) {
        this.traverseAll((name1, name2) => {
            this.decreaseCollisionDataTime(name1, name2, timeDelta);
        });
    }

    decreaseCollisionDataTime(name1, name2, timeDelta) {
        const collisionData = this.calculatedCollisionData[name1][name2];
        collisionData.timeUntilCollision -= timeDelta;
    }

}
