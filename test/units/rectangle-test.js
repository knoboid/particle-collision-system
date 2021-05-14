import { expect } from 'chai';

import Rectangle from '../../src/particle-collision-system/boundary-particle-collisions/rectangle';

describe('Tests for Rectangle class', () => {

    it('test area', () => {
        let rectangle = new Rectangle(200, 200, 200, 200);
        expect(rectangle.area()).to.equal(40000);
    });

    it('test isInside', () => {
        let rectangle = new Rectangle(200, 200, 200, 200);
        expect(rectangle.isInside(100, 100)).to.equal(false);
        expect(rectangle.isInside(300, 100)).to.equal(false);
        expect(rectangle.isInside(500, 100)).to.equal(false);
        expect(rectangle.isInside(100, 300)).to.equal(false);
        expect(rectangle.isInside(300, 300)).to.equal(true);
        expect(rectangle.isInside(500, 300)).to.equal(false);
        expect(rectangle.isInside(100, 500)).to.equal(false);
        expect(rectangle.isInside(300, 500)).to.equal(false);
        expect(rectangle.isInside(500, 500)).to.equal(false);
    });

    it('test isInside with a margin', () => {
        let rectangle = new Rectangle(200, 200, 200, 200);
        expect(rectangle.isInside(240, 240, 50)).to.equal(false);
        expect(rectangle.isInside(260, 240, 50)).to.equal(false);
        expect(rectangle.isInside(240, 260, 50)).to.equal(false);
        expect(rectangle.isInside(260, 260, 50)).to.equal(true);

        expect(rectangle.isInside(340, 240, 50)).to.equal(false);
        expect(rectangle.isInside(360, 240, 50)).to.equal(false);
        expect(rectangle.isInside(340, 260, 50)).to.equal(true);
        expect(rectangle.isInside(360, 260, 50)).to.equal(false);

        expect(rectangle.isInside(240, 340, 50)).to.equal(false);
        expect(rectangle.isInside(260, 340, 50)).to.equal(true);
        expect(rectangle.isInside(240, 360, 50)).to.equal(false);
        expect(rectangle.isInside(260, 360, 50)).to.equal(false);

        expect(rectangle.isInside(340, 340, 50)).to.equal(true);
        expect(rectangle.isInside(360, 340, 50)).to.equal(false);
        expect(rectangle.isInside(340, 360, 50)).to.equal(false);
        expect(rectangle.isInside(360, 360, 50)).to.equal(false);
    });

    it('test xRight', () => {
        let rectangle = new Rectangle(6, 5, 4, 3);
        expect(rectangle.xRight()).to.equal(10);
    });

    it('test xLeft', () => {
        let rectangle = new Rectangle(6, 5, 4, 3);
        expect(rectangle.xLeft()).to.equal(6);
    });

    it('test yBottom', () => {
        let rectangle = new Rectangle(6, 5, 4, 3);
        expect(rectangle.yBottom()).to.equal(8);
    });

    it('test yTop', () => {
        let rectangle = new Rectangle(6, 5, 4, 3);
        expect(rectangle.yTop()).to.equal(5);
    });

});
