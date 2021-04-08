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

    it('test distanceFromCenter', () => {
        let particle = new Particle(0, 0, 1);
        let distance = particle.distanceFromCenter(new Vector(3, 4));
        expect(distance).to.equal(5);
        // Test alias
        distance = particle.distanceFromCentre(new Vector(3, 4));
        expect(distance).to.equal(5);
    });

    it('test distanceBetweenParticleCenters', () => {
        let particle1 = new Particle(1, 2, 1);
        let particle2 = new Particle(4, 6, 1);
        let distance = particle1.distanceBetweenParticleCenters(particle2);
        expect(distance).to.equal(5);
        // Test alias
        particle2 = new Particle(7, 10, 1);
        distance = particle1.distanceBetweenParticleCentres(particle2);
        expect(distance).to.equal(10);
    });

    it('test distanceBetweenParticles', () => {
        let particle1 = new Particle(1, 2, 1);
        let particle2 = new Particle(4, 6, 1);
        let distance = particle1.distanceBetweenParticles(particle2);
        expect(distance).to.equal(3);
        // Test alias
        particle2 = new Particle(7, 10, 0.5);
        distance = particle1.distanceBetweenParticles(particle2);
        expect(distance).to.equal(8.5);
    });



});
