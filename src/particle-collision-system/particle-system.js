import ParticleRegistry from './particle-registry';
import ParticlePairCollisionSystem from './particle-pair-collisions/particle-pair-collision-system';
import BoundaryParticleCollisionSystem from './boundary-particle-collisions/boundary-particle-collision-system';

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
        this.particlePairSystem.recalculateAll(this.time);
        const nextPairCollisions = this.particlePairSystem.getNextCollision();
        const pairCollisionTime = nextPairCollisions[0]['timeOfCollision'];

        this.boundaryParticleSystem.recalculateAll(this.time);
        const nextBoundaryCollisions = this.boundaryParticleSystem.getNextCollision();
        const boundaryCollisionTime = nextBoundaryCollisions[0]['timeOfCollision'];
        
        if (boundaryCollisionTime < pairCollisionTime) {
            this.nextCollisions = nextBoundaryCollisions;
            this.timeOfNextCollision = boundaryCollisionTime;
        }
        else {
            this.nextCollisions = nextPairCollisions;
            this.timeOfNextCollision = pairCollisionTime;   
        }
    }

    update(timeStep=1) {
        if (this._isThereACollisionDuringThisTimeStep(timeStep)) {
            let step = this._timeToNextCollision();
            this._advanceAllParticles(step);
            this._executeCallbacks();
            const involvedParticles = this._getInvolvedParticles();

            const timeRemainingForThisUpdate = timeStep - step;
            const currentTime = this.time + step;
            this.timeOfMostRecentCollision = currentTime;

            this.time += step;

            this.recalculate(involvedParticles, this.time);

            this.update(timeRemainingForThisUpdate);
        } else {
            this._advanceAllParticles(timeStep);
            this.time += timeStep;
        }
    }

    recalculate(particleNames, currentTime) {
        particleNames.forEach(particleName => {
            this.particlePairSystem.recalculate(particleName, currentTime);
        });
        const nextPairCollisions = this.particlePairSystem.getNextCollision();
        const pairCollisionTime = nextPairCollisions[0]['timeOfCollision'];

        particleNames.forEach(particleName => {
            this.boundaryParticleSystem.recalculate(particleName, currentTime);
        });
        const nextBoundaryCollisions = this.boundaryParticleSystem.getNextCollision();
        const boundaryCollisionTime = nextBoundaryCollisions[0]['timeOfCollision'];

        if (boundaryCollisionTime < pairCollisionTime) {
            this.nextCollisions = nextBoundaryCollisions;
            this.timeOfNextCollision = boundaryCollisionTime;
        }
        else {
            this.nextCollisions = nextPairCollisions;
            this.timeOfNextCollision = pairCollisionTime;   
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
