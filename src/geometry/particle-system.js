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
        this.timeOfMostRecentCollision = 0;
    }

    setBoundary(boundary) {
        this.boundary = boundary;
    }

    addParticle(particle) {
        this.particles.push(particle);
        let particleName = particleRegistry.registerParticle(particle);
        this.particlePairSystem.addNewParticle(particleName);
        this.boundaryParticleSystem.addNewParticle(particleName);
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
            const involvedParticles = this._getInvolvedParticles();

            const remainder = timeStep - step;
            const currentTime = this.time + step;
            const intervalSinceMostRecentCollision = currentTime - this.timeOfMostRecentCollision;
            this.timeOfMostRecentCollision = currentTime;

            this.particlePairSystem.reduceCalculatedCollisionTimes(intervalSinceMostRecentCollision);
            this.boundaryParticleSystem.reduceCalculatedCollisionTimes(intervalSinceMostRecentCollision);
            this.time += step;

            this.recalculate(involvedParticles);

            this.update(remainder);
        } else {
            this._advanceAllParticles(timeStep);
            this.time += timeStep;
        }
    }

    recalculate(particleNames) {
        particleNames.forEach(particleName => {
            this.particlePairSystem.recalculate(particleName);
        });
        const nextPairCollisions = this.particlePairSystem.getNextCollision();
        const pairCollisionTime = nextPairCollisions[0]['timeUntilCollision'];

        particleNames.forEach(particleName => {
            this.boundaryParticleSystem.recalculate(particleName);
        });
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

    _getInvolvedParticles() {
        const involvedParticles = [];
        this.nextCollisions.forEach( collisionData => {
            collisionData.particleNames.forEach(particleName => {
                if (!involvedParticles.includes(particleName)) {
                    involvedParticles.push(particleName);
                }
            });

        });
        return involvedParticles;
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

}
