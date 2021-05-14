/**
 * The nextParticleCollisions property is an object which, for each particleName, stores
 * the time of its next collision, and the associated CollisionDetector.
 */
export default class FutureCollisions {
    constructor() {
        this.nextParticleCollisions = {};
    }

    update(particleName, collisionTime, collisionDetector) {
        let isBeforeNextCollision;
        
        try {
            isBeforeNextCollision = collisionTime < this.nextParticleCollisions[particleName].collisionTime;          
        } catch (error) {
            let isTypeError = error.name === 'TypeError';
            let isCollisionTimeUndefined = error.message === 'Cannot read property \'collisionTime\' of undefined';
            if (isTypeError && isCollisionTimeUndefined) {
                this.nextParticleCollisions[particleName] = {};
                isBeforeNextCollision = collisionTime < Infinity;          
            }
            else {
                throw(error);
            }
        }
        if (isBeforeNextCollision) {
            this.nextParticleCollisions[particleName] = {
                collisionTime,
                collisionDetector,
            };
        }
    }

    get(particleName) {
        return this.nextParticleCollisions[particleName];
    }

    reset(particleName) {
        this.nextParticleCollisions[particleName] = {
            collisionTime: Infinity,
        };
    }

    calculateNext() {
        let timeToNext = Infinity;
        let next;
        Object.values(this.nextParticleCollisions).forEach(data => {
            if (data.collisionTime < timeToNext) {
                timeToNext = data.collisionTime;
                next = data;
            }
        });
        this.next = next;
    }

}
