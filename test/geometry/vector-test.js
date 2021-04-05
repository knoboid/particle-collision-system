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

});
