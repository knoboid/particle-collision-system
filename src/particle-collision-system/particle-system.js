import ParticleRegistry from './particle-registry';
import ParticlePairCollisionSystem from './particle-pair-collisions/particle-pair-collision-system';
import BoundaryParticleCollisionSystem from './boundary-particle-collisions/boundary-particle-collision-system';
import NextCollisions from './next-collisions';

let particleRegistry = ParticleRegistry.getInstance();

/**
 * 
 */
export default class ParticleSystem {
    constructor(boundary) {
        this.particlePairSystem = new ParticlePairCollisionSystem();
        this.boundaryParticleSystem = new BoundaryParticleCollisionSystem(boundary);
        this.particles = [];
        this.time = 0;
        this.timeOfMostRecentCollision = 0;
        this.nc = new NextCollisions();
    }

    addParticle(particle) {
        this.particles.push(particle);
        let particleName = particleRegistry.registerParticle(particle);
        this.particlePairSystem.addNewParticle(particleName);
        this.boundaryParticleSystem.addNewParticle(particleName);
    }

    start() {
        this.nc.reset();

        this.particlePairSystem.recalculateAll(this.time);
        this.particlePairSystem.evaluateNextCollisions(this.nc);

        this.boundaryParticleSystem.recalculateAll(this.time);
        this.boundaryParticleSystem.evaluateNextCollisions(this.nc);
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
        this.nc.reset();

        particleNames.forEach(particleName => {
            this.particlePairSystem.recalculate(particleName, currentTime);
        });
        this.particlePairSystem.evaluateNextCollisions(this.nc);

        particleNames.forEach(particleName => {
            this.boundaryParticleSystem.recalculate(particleName, currentTime);
        });
        this.boundaryParticleSystem.evaluateNextCollisions(this.nc);
    }

    _getInvolvedParticles() {
        const involvedParticles = [];
        this.nc.nextCollisions.forEach( collisionData => {
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
        return this.nc.timeOfNextCollision - this.time;
    }

    _advanceAllParticles(timeStep) {
        this.particles.forEach(particle => particle.update(timeStep));
    }

    _executeCallbacks() {
        this.nc.nextCollisions.forEach( nextCollision => {
                nextCollision.callback();
        });
    }

}
