import { expect } from 'chai';
import Vector from '../../src/geometry/vector';

import Particle from '../../src/geometry/particle';

describe('Tests for Particle class', () => {

    it('test construction', () => {
        let particle = new Particle(200, 300, 5, 4, 4);
        expect(particle.position.x).to.equal(200);
        expect(particle.position.y).to.equal(300);
    });

    it('test add', () => {
        let particle = new Particle(200, 300, 5, 4, 4);
        let vector = new Vector(5, 6);
        particle.add(vector);

        expect(particle.position.x).to.equal(205);
        expect(particle.position.y).to.equal(306);
    });

    it('test update', () => {
        let particle = new Particle(200, 300, 5, 10, 11);
        particle.update();
        expect(particle.position.x).to.equal(210);
        expect(particle.position.y).to.equal(311);
    });

});
