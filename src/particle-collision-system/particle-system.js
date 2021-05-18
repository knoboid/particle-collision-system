import ParticleRegistry from './particle-registry';
import NextCollisions from './next-collisions';

let particleRegistry = ParticleRegistry.getInstance();

/**
 * 
 */
export default class ParticleSystem {
    constructor() {
        this.collisionSystems = [];
        this.particles = [];
        this.time = 0;
        this.timeOfMostRecentCollision = 0;
        this.nc = new NextCollisions();
    }

    addCollisionSystem(collisionSystem) {
        this.collisionSystems.push(collisionSystem);
    }

    addParticle(particle) {
        this.particles.push(particle);
        let particleName = particleRegistry.registerParticle(particle);
        this.collisionSystems.forEach(collisionSystem => {
            collisionSystem.addNewParticle(particleName);
        });
    }

    start() {
        this.nc.reset();

        this.collisionSystems.forEach(collisionSystem => {
            collisionSystem.recalculateAll(this.time);
            collisionSystem.evaluateNextCollisions(this.nc);
        });
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

        this.collisionSystems.forEach( collisionSystem => {
            particleNames.forEach(particleName => {
                collisionSystem.recalculate(particleName, currentTime);
            });
            collisionSystem.evaluateNextCollisions(this.nc);
        });
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
