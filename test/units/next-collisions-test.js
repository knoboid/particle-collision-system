import { expect } from 'chai';

import CollisionData from '../../src/particle-collision-system/collision-data';
import NextCollisions from '../../src/particle-collision-system/next-collisions';

describe('Tests for NextCollision object', () => {

    it('should update and retrieve some state', () => {
        const nextCollisions = new NextCollisions();

        const c1 = new CollisionData(3.4, undefined, 'first');
        const c2 = new CollisionData(3.6, undefined, 'second');

        nextCollisions.evaluate(c1);
        nextCollisions.evaluate(c2);

        expect(nextCollisions.timeOfNextCollision).to.equal(3.4);
        expect(nextCollisions.nextCollisions.length).to.equal(1);
        expect(nextCollisions.nextCollisions[0]).to.eql(c1);

        const c3 = new CollisionData(3.4, undefined, 'third');

        nextCollisions.evaluate(c3);

        expect(nextCollisions.timeOfNextCollision).to.equal(3.4);
        expect(nextCollisions.nextCollisions.length).to.equal(2);
        expect(nextCollisions.nextCollisions[1]).to.eql(c3);
    });

});
