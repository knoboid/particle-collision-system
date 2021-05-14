import { expect } from 'chai';

import Rectangle from '../../src/geometry/boundary-particle-collisions/rectangle';
import Particle from '../../src/geometry/particle';
import RectangularBoundaryCollisionDetector from '../../src/geometry/boundary-particle-collisions/rectangular-boundary-collision-detector';

function transform(collisionData) {
    let h = collisionData.clientData.h;
    let v = collisionData.clientData.v;
    return [h, v, collisionData.timeUntilCollision, collisionData.callback];
}

describe('Tests for RectangularBoundaryCollisionGeometry class', () => {

    it('test particle distance to rectangular boundary', () => {
        let rectangle = new Rectangle(0, 0, 10, 10);
        let particle = new Particle(6, 8, 1, 0, 0);
        let rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);

        expect(rbch.distanceToLeft()).to.eql(5);
        expect(rbch.distanceToRight()).to.eql(3);
        expect(rbch.distanceToTop()).to.eql(7);
        expect(rbch.distanceToBottom()).to.eql(1);
    });

    it('test particle time to rectangular boundary', () => {
        let rectangle = new Rectangle(0, 0, 10, 10);
        let particle = new Particle(6, 8, 1, 1, 1);
        let rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);

        expect(rbch.timeToLeft()).to.eql(-5);
        expect(rbch.timeToRight()).to.eql(3);
        expect(rbch.timeToTop()).to.eql(-7);
        expect(rbch.timeToBottom()).to.eql(1);

        particle = new Particle(6, 8, 1, -0.5, -0.25);
        rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);

        expect(rbch.timeToLeft()).to.eql(10);
        expect(rbch.timeToRight()).to.eql(-6);
        expect(rbch.timeToTop()).to.eql(28);
        expect(rbch.timeToBottom()).to.eql(-4);
    });

    it('test particle stationary', () => {
        let rectangle = new Rectangle(0, 0, 10, 10);
        let particle = new Particle(6, 4, 1, 0, 0);
        let rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);
        expect(transform(rbch.recalculate())).to.eql([0, 0, Infinity, RectangularBoundaryCollisionDetector.noOperation]);
    });

    it('test particle direction right', () => {
        let rectangle = new Rectangle(0, 0, 10, 10);
        let particle = new Particle(6, 4, 1, 1, 0);
        let rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);
        expect(transform(rbch.recalculate()).slice(0, 3)).to.eql([1, 0, 3]);
    });

    it('test particle direction left', () => {
        let rectangle = new Rectangle(0, 0, 10, 10);
        let particle = new Particle(6, 4, 1, -1, 0);
        let rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);
        expect(transform(rbch.recalculate()).slice(0, 3)).to.eql([-1, 0, 5]);
    });

    it('test particle direction up', () => {
        let rectangle = new Rectangle(0, 0, 10, 10);
        let particle = new Particle(6, 4, 1, 0, -1);
        let rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);
        expect(transform(rbch.recalculate()).slice(0, 3)).to.eql([0, -1, 3]);
    });

    it('test particle direction down', () => {
        let rectangle = new Rectangle(0, 0, 10, 10);
        let particle = new Particle(6, 4, 1, 0, 1);
        let rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);
        expect(transform(rbch.recalculate()).slice(0, 3)).to.eql([0, 1, 5]);
    });

    it('test particle direction lower right', () => {
        let particle;
        let rectangle = new Rectangle(0, 0, 10, 10);
        
        // Heading lower right hitting right
        particle = new Particle(6, 4, 1, 1, 1);
        let rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);
        expect(transform(rbch.recalculate()).slice(0, 3)).to.eql([1, 0, 3]);

        // Heading lower right hitting bottom
        particle = new Particle(4, 6, 1, 1, 1);
        rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);
        expect(transform(rbch.recalculate()).slice(0, 3)).to.eql([0, 1, 3]);

        // Heading lower right hitting bottom right
        particle = new Particle(7, 7, 1, 1, 1);
        rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);
        expect(transform(rbch.recalculate()).slice(0, 3)).to.eql([1, 1, 2]);
    });

    it('test particle direction upper right', () => {
        let rectangle = new Rectangle(0, 0, 10, 10);
        let particle;
        
        // Heading upper right hitting right
        particle = new Particle(7, 4, 1, 1, -1);
        let rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);
        expect(transform(rbch.recalculate()).slice(0, 3)).to.eql([1, 0, 2]);

        // Heading upper right hitting top
        particle = new Particle(6, 3, 1, 1, -1);
        rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);
        expect(transform(rbch.recalculate()).slice(0, 3)).to.eql([0, -1, 2]);

        // Heading upper right hitting top right
        particle = new Particle(6, 4, 1, 1, -1);
        rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);
        expect(transform(rbch.recalculate()).slice(0, 3)).to.eql([1, -1, 3]);
    });

    it('test particle direction upper left', () => {
        let rectangle = new Rectangle(0, 0, 10, 10);
        let particle;
        
        // Heading upper left hitting left
        particle = new Particle(3, 4, 1, -1, -1);
        let rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);
        expect(transform(rbch.recalculate()).slice(0, 3)).to.eql([-1, 0, 2]);

        // Heading upper left hitting top
        particle = new Particle(5, 3, 1, -1, -1);
        rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);
        expect(transform(rbch.recalculate()).slice(0, 3)).to.eql([0, -1, 2]);

        // Heading upper left hitting top left
        particle = new Particle(3, 3, 1, -1, -1);
        rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);
        expect(transform(rbch.recalculate()).slice(0, 3)).to.eql([-1, -1, 2]);
    });

    it('test particle direction lower left', () => {
        let rectangle = new Rectangle(0, 0, 10, 10);
        let particle;
        
        // Heading lower left hitting left
        particle = new Particle(3, 4, 1, -1, 1);
        let rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);
        expect(transform(rbch.recalculate()).slice(0, 3)).to.eql([-1, 0, 2]);

        // Heading lower left hitting bottom
        particle = new Particle(5, 7, 1, -1, 1);
        rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);
        expect(transform(rbch.recalculate()).slice(0, 3)).to.eql([0, 1, 2]);

        // Heading lower left hitting bottom left
        particle = new Particle(7, 3, 1, -1, 1);
        rbch = new RectangularBoundaryCollisionDetector(particle, rectangle);
        expect(transform(rbch.recalculate()).slice(0, 3)).to.eql([-1, 1, 6]);
    });

});
