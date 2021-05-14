import { expect } from 'chai';

import ParticleSystem from '../../src/geometry/particle-system';
import Particle from '../../src/geometry/particle';
import Rectangle from '../../src/geometry/boundary-particle-collisions/rectangle';
import RectangularBoundary from '../../src/geometry/boundary-particle-collisions/rectangular-boundary';

let particleSystem;

function setUp(rectangle) {
    let boundary = new RectangularBoundary(rectangle);
    particleSystem = new ParticleSystem(boundary);
}

describe('Tests for ParticleSystem class', () => {

    it('test update', () => {
        let p1 = new Particle(5, 5, 1, 1, -1);
        let p2 = new Particle();
        setUp(new Rectangle(0, 0, 10, 10));
        particleSystem.addParticle(p1);
        particleSystem.addParticle(p2);

        expect(p1.position.x).to.equal(5);
        particleSystem.update(1);
        expect(p1.position.x).to.equal(6);
        expect(p1.position.y).to.equal(4);
    });

});
