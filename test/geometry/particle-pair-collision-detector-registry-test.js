import { expect } from 'chai';

import ParticlePairCollisionDetectorRegistry from '../../src/geometry/particle-pair-collision-detector-registry';
import Particle from '../../src/geometry/particle';
import ParticleRegistry from '../../src/geometry/particle-registry';

function countCollisionDetectorMatrix(pairCollisionDetectorRegistry) {    
    let counter = 0;
    Object.values(pairCollisionDetectorRegistry.particlePairCollisionDetectors).forEach( object => {
        Object.values(object).forEach( collisionDetector => {
            counter++;
        });
    });
    return counter;
}

describe('Tests for ParticlePairCollisionDetectorRegistry', () => {

    it('should create and store the CollisionDetectors as particles are added', () => {
        
        let particleRegistry = ParticleRegistry.getInstance();
        particleRegistry.clear();
        let pairCollisionDetectorRegistry = ParticlePairCollisionDetectorRegistry.getInstance();
        pairCollisionDetectorRegistry.clear();

        expect(countCollisionDetectorMatrix(pairCollisionDetectorRegistry)).to.equal(0);

        let p1 = new Particle(0, 0, 1, 1, 0);
        let name1 = particleRegistry.registerParticle(p1);
        pairCollisionDetectorRegistry.addParticle(name1);
        expect(countCollisionDetectorMatrix(pairCollisionDetectorRegistry)).to.equal(0);
        expect(pairCollisionDetectorRegistry.particlePairCollisionDetectorArray.length).to.equal(0);

        let p2 = new Particle(10, 0, 1, -1, 0);
        let name2 = particleRegistry.registerParticle(p2);
        pairCollisionDetectorRegistry.addParticle(name2);
        expect(countCollisionDetectorMatrix(pairCollisionDetectorRegistry)).to.equal(2);
        expect(pairCollisionDetectorRegistry.particlePairCollisionDetectorArray.length).to.equal(1);

        let p3 = new Particle(0, 3, 1, 1, 0);
        let name3 = particleRegistry.registerParticle(p3);
        pairCollisionDetectorRegistry.addParticle(name3);
        expect(countCollisionDetectorMatrix(pairCollisionDetectorRegistry)).to.equal(6);
        expect(pairCollisionDetectorRegistry.particlePairCollisionDetectorArray.length).to.equal(3);

        let p4 = new Particle(12, 3, 1, -1, 0);
        let name4 = particleRegistry.registerParticle(p4);
        pairCollisionDetectorRegistry.addParticle(name4);
        expect(countCollisionDetectorMatrix(pairCollisionDetectorRegistry)).to.equal(12);
        expect(pairCollisionDetectorRegistry.particlePairCollisionDetectorArray.length).to.equal(6);

        let result = pairCollisionDetectorRegistry.getCollisionDetectors(name1);
        expect(Object.keys(result)).to.eql([name2, name3, name4]);

        result = pairCollisionDetectorRegistry.getCollisionDetectors(name2);
        expect(Object.keys(result)).to.eql([name1, name3, name4]);

        result = pairCollisionDetectorRegistry.getCollisionDetectors(name3);
        expect(Object.keys(result)).to.eql([name1, name2, name4]);

        result = pairCollisionDetectorRegistry.getCollisionDetectors(name4);
        expect(Object.keys(result)).to.eql([name1, name2, name3]);

        pairCollisionDetectorRegistry.recalculate(name4);
    });

    it('should compute the time taken until two particles collide', () => {
        
        let particleRegistry = ParticleRegistry.getInstance();
        particleRegistry.clear();
        let pairCollisionDetectorRegistry = ParticlePairCollisionDetectorRegistry.getInstance();
        pairCollisionDetectorRegistry.clear();

        pairCollisionDetectorRegistry.addParticle(particleRegistry.registerParticle(new Particle(0, 0, 1, 1, 0)));
        pairCollisionDetectorRegistry.addParticle(particleRegistry.registerParticle(new Particle(10, 0, 1, -1, 0)));
        pairCollisionDetectorRegistry.addParticle(particleRegistry.registerParticle(new Particle(0, 3, 1, 1, 0)));
        pairCollisionDetectorRegistry.addParticle(particleRegistry.registerParticle(new Particle(12, 3, 1, -1, 0)));

        let [name1, name2, name3, name4] = Object.keys(pairCollisionDetectorRegistry.particles);

        expect(pairCollisionDetectorRegistry.recalculateResults[name1]).to.eql({});
        expect(pairCollisionDetectorRegistry.recalculateResults[name1][name2]).to.not.exist;

        pairCollisionDetectorRegistry.recalculate(name1);
        expect(pairCollisionDetectorRegistry.recalculateResults[name1][name2]).to.equal(pairCollisionDetectorRegistry.recalculateResults[name2][name1]);
        let timeToCollision = pairCollisionDetectorRegistry.recalculateResults[name1][name2][2];
        expect(timeToCollision).to.equal(4);

        expect(pairCollisionDetectorRegistry.recalculateResults[name3][name4]).to.not.exist;

        pairCollisionDetectorRegistry.recalculateAll();

        expect(pairCollisionDetectorRegistry.recalculateResults[name3][name4]).to.exist;
        timeToCollision = pairCollisionDetectorRegistry.recalculateResults[name3][name4][2];
        expect(timeToCollision).to.equal(5);
    });

});
