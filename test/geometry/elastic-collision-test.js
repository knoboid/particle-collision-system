import { expect } from 'chai';

import { elasticCollision } from '../../src/geometry/physics';
import Particle from '../../src/geometry/particle';
import Vector from '../../src/geometry/vector';

/**
 * Elastic Collision Test
 */
describe('Tests for ElasticCollision object', () => {

    it('should update and retrieve some state', () => {
        let p1 = new Particle(10, 10, 1, 0, 0);
        let p2 = new Particle(8, 10, 1, 1, 1);

        elasticCollision(p1, p2);

        expect(p2.velocity).to.eql(new Vector(0, 1));
        expect(p1.velocity).to.eql(new Vector(1, 0));
    });

});
