import { expect } from 'chai';

import ParticlePairCollisionDetector from '../../src/particle-collision-system/particle-pair-collisions/particle-pair-collision-detector';
import Particle from '../../src/particle-collision-system/particle';

describe('Tests for ParticlePairCollisionDetector object', () => {

    it('should compute the time taken until two particles collide', () => {
        let p1 = new Particle(0, 0, 1, 1, 0);
        let p2 = new Particle(10, 0, 1, -1, 0);

        let ppcd = new ParticlePairCollisionDetector(p1, p2);
        let collisionData = ppcd.recalculate();
        let timeToCollision = collisionData.timeOfCollision;

        expect(timeToCollision).to.equal(4);

        p2.position.x = 11;
        p2.velocity.x = -0.5;
        collisionData = ppcd.recalculate();
        timeToCollision = collisionData.timeOfCollision;

        expect(timeToCollision).to.equal(6);
    });

});
