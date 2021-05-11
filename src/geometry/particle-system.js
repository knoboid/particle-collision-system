import ParticleRegistry from './particle-registry';
import ParticleCollisionManager from './particle-collision-manager';
// import FurureCollisions from './future-collisions';
import ParticlePairCollisionSystem from './particle-pair-collision-system';

let particleRegistry = ParticleRegistry.getInstance();

/**
 * 
 */
export default class ParticleSystem {
    constructor(boundary) {
        this.particlePairSystem = new ParticlePairCollisionSystem();
        this.setBoundary(boundary);
        this.particles = {};
        this.time = 0;
        this.timeOfNextCollision = Infinity;
        this.nextCollisions = [];
        // this.futureCollisions = new FurureCollisions();
    }

    setBoundary(boundary) {
        this.boundary = boundary;
    }

    addParticle(particle) {
        let particleName = particleRegistry.registerParticle(particle);
        let collisionManager = new ParticleCollisionManager(particle);
        let collisionDetector = this.boundary.newBoundaryCollisionDetector(particle);
        collisionManager.addCollisionDetector(collisionDetector, 'boundary');
        this.particles[particleName] = {
            particle,
            collisionManager,
        };
        this.particlePairSystem.addNewParticle(particleName);
        // this.futureCollisions.update(particleName, collisionManager.timeToNextCollision);
    }

    start() {
        this.particlePairSystem.recalculateAll();
        let nextPairCollisions = this.particlePairSystem.getNextCollision();
        const pairCollisionTime = nextPairCollisions[0]['timeUntilCollision'];

        let nextBoundaryCollisionDetectors = this.recalculateAllBoundaryCollisionManagers();
        
        if (nextBoundaryCollisionDetectors.time < pairCollisionTime) {
            this.nextCollisions = nextBoundaryCollisionDetectors.nextCollisions;
            this.timeOfNextCollision = nextBoundaryCollisionDetectors.time + this.time;
        }
        else {
            this.nextCollisions = nextPairCollisions;
            this.timeOfNextCollision = pairCollisionTime + this.time;   
        }
    }

    recalculateAllBoundaryCollisionManagers() {
        let time = Infinity;
        let nextCollisions = [];
        Object.values(this.particles).forEach( particleData => {
            particleData.collisionManager.evaluateCollisionDetectors();
            if (particleData.collisionManager.timeToNextCollision < time) {
                time = particleData.collisionManager.timeToNextCollision;
                nextCollisions = [particleData.collisionManager.nextCollision];
            }
            else if (particleData.collisionManager.timeToNextCollision === time) {
                nextCollisions.push(particleData.collisionManager.nextCollision);
            }
        });

        return {
            nextCollisions,
            time
        };
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
        Object.values(this.particles).forEach((particleData) => {
            particleData.particle.update(timeStep);
        });
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
