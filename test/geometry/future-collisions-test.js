import { expect } from 'chai';

import FutureCollisions from '../../src/geometry/future-collisions';

/**
 * FutureCollisions
 * 
 * update takes a particle name, the time of the next collision and the collision detector.
 */
describe('Tests for FutureCollisions object', () => {

    it('should update and retrieve some state', () => {
        let futureCollisions = new FutureCollisions();

        futureCollisions.update("1", 2.5, '-1-');
        expect(futureCollisions.get("1").collisionTime).to.equal(2.5);
        expect(futureCollisions.get("1").collisionDetector).to.equal('-1-');
    });


    it('should store the next collision', () => {
        let futureCollisions = new FutureCollisions();

        futureCollisions.update("1", 2.5, '-1-');
        expect(futureCollisions.get("1").collisionTime).to.equal(2.5);
        expect(futureCollisions.get("1").collisionDetector).to.equal('-1-');

        futureCollisions.update("1", 2.4, '-2-');
        expect(futureCollisions.get("1").collisionTime).to.equal(2.4);
        expect(futureCollisions.get("1").collisionDetector).to.equal('-2-');

        futureCollisions.update("1", 2.7, '-3-');
        expect(futureCollisions.get("1").collisionTime).to.equal(2.4);
    });

    it('should be able to store this data for more than 1 particle', () => {
        let futureCollisions = new FutureCollisions();

        futureCollisions.update("1", 2.4, '-1-');
        futureCollisions.update("2", 1.5, '-2-');

        expect(futureCollisions.get("1").collisionTime).to.equal(2.4);
        expect(futureCollisions.get("2").collisionTime).to.equal(1.5);
    });

    it('should compute which collision will happen next', () => {
        let futureCollisions = new FutureCollisions();

        futureCollisions.update("1", 2.4, '-1-');
        futureCollisions.update("2", 1.5, '-2-');

        futureCollisions.calculateNext();

        expect(futureCollisions.next.collisionTime).to.equal(1.5);
        expect(futureCollisions.next.collisionDetector).to.equal('-2-');
    });

    it("should reset (clear) all data about a particle's collisions", () => {
        let futureCollisions = new FutureCollisions();

        futureCollisions.update("1", 2.4, '-1-');
        futureCollisions.update("2", 1.5, '-2-');

        futureCollisions.reset("2");
        futureCollisions.calculateNext();
    
        expect(futureCollisions.next.collisionTime).to.equal(2.4);
        expect(futureCollisions.next.collisionDetector).to.equal('-1-');
    });

});
