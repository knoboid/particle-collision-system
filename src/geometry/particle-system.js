import ParticleRegistry from './particle-registry';
// import FurureCollisions from './future-collisions';
import ParticlePairCollisionSystem from './particle-pair-collision-system';
import BoundaryParticleCollisionSystem from './boundary-particle-collision-system';

let particleRegistry = ParticleRegistry.getInstance();

/**
 * 
 */
export default class ParticleSystem {
    constructor(boundary) {
        this.setBoundary(boundary);
        this.particlePairSystem = new ParticlePairCollisionSystem();
        this.boundaryParticleSystem = new BoundaryParticleCollisionSystem(boundary);
        this.particles = [];
        this.time = 0;
        this.timeOfNextCollision = Infinity;
        this.nextCollisions = [];
        // this.futureCollisions = new FurureCollisions();
    }

    setBoundary(boundary) {
        this.boundary = boundary;
    }

    addParticle(particle) {
        this.particles.push(particle);
        let particleName = particleRegistry.registerParticle(particle);
        this.particlePairSystem.addNewParticle(particleName);
        this.boundaryParticleSystem.addNewParticle(particleName);
        // this.futureCollisions.update(particleName, collisionManager.timeToNextCollision);
    }

    start() {
        this.particlePairSystem.recalculateAll();
        const nextPairCollisions = this.particlePairSystem.getNextCollision();
        const pairCollisionTime = nextPairCollisions[0]['timeUntilCollision'];

        this.boundaryParticleSystem.recalculateAll();
        const nextBoundaryCollisions = this.boundaryParticleSystem.getNextCollision();
        const boundaryCollisionTime = nextBoundaryCollisions[0]['timeUntilCollision'];
        
        if (boundaryCollisionTime < pairCollisionTime) {
            this.nextCollisions = nextBoundaryCollisions;
            this.timeOfNextCollision = boundaryCollisionTime + this.time;
        }
        else {
            this.nextCollisions = nextPairCollisions;
            this.timeOfNextCollision = pairCollisionTime + this.time;   
        }
    }

    update(timeStep=1) {
        if (this._isThereACollisionDuringThisTimeStep(timeStep)) {
            let step = this._timeToNextCollision();
            this._advanceAllParticles(step);
            this._executeCallbacks();
            this.start();
            let remainder = timeStep - step;
            this.update(remainder);
        } else {
            this._advanceAllParticles(timeStep);
            this.time += timeStep;
        }
    }

    _isThereACollisionDuringThisTimeStep(timeStep) {
        return timeStep > this._timeToNextCollision();
    }

    _timeToNextCollision() {
        return this.timeOfNextCollision - this.time;
    }

    _advanceAllParticles(timeStep) {
        this.particles.forEach(particle => particle.update(timeStep));
    }

    _executeCallbacks() {
        this.nextCollisions.forEach( nextCollision => {
            nextCollision.callback();
        });
    }

    // peekParticle() {
    //     let particles = Object.values(this.particles);
    // }

}
