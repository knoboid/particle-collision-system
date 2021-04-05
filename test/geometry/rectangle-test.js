import { expect } from 'chai';

import Rectangle from '../../src/geometry/rectangle';

describe('Tests for Rectangle class', () => {

    it('test area', () => {
        let rectangle = new Rectangle(200, 200, 200, 200);
        expect(rectangle.area()).to.equal(40000);
    });

    it('test inside', () => {
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

});
