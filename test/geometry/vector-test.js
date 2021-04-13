import { expect } from 'chai';

import Vector from '../../src/geometry/vector';

describe('Tests for Vector class', () => {

    it('test construction', () => {
        let vector = new Vector(200, 300);
        expect(vector.x).to.equal(200);
        expect(vector.y).to.equal(300);
    });

    it('test add', () => {
        let v1 = new Vector(200, 300);
        let v2 = new Vector(20, 30);
        let v3 = v1.add(v2);
        expect(v3.x).to.equal(220);
        expect(v1.x).to.equal(200);
        expect(v2.x).to.equal(20);
    });

    it('test subtract', () => {
        let v1 = new Vector(200, 300);
        let v2 = new Vector(20, 30);
        let v3 = v1.subtract(v2);
        expect(v3.x).to.equal(180);
        expect(v1.x).to.equal(200);
        expect(v2.x).to.equal(20);
    });

    it('test distance', () => {
        let v1 = new Vector(1, 2);
        let v2 = new Vector(4, 6);
        let distance = v1.distance(v2);
        expect(distance).to.equal(5);
        expect(v1.x).to.equal(1);
        expect(v2.x).to.equal(4);
    });

    it('test multiply', () => {
        let v1 = new Vector(1, 2);
        let s = 5;
        let v2 = v1.multiply(s);
        expect(v2.x).to.equal(5);
        expect(v1.x).to.equal(1);
    });

});
