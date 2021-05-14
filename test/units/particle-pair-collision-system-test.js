import { expect } from 'chai';

import ParticlePairCollisionSystem from '../../src/particle-collision-system/particle-pair-collisions/particle-pair-collision-system';
import Particle from '../../src/particle-collision-system/particle';
import ParticleRegistry from '../../src/particle-collision-system/particle-registry';

function countCollisionDetectorMatrix(particlePairCollisionSystem) {    
    let counter = 0;
    Object.values(particlePairCollisionSystem.particlePairCollisionDetectors).forEach( object => {
        Object.values(object).forEach( collisionDetector => {
            counter++;
        });
    });
    return counter;
}

describe('Tests for ParticlePairCollisionSystem', () => {

    it('should create and store the CollisionDetectors as particles are added', () => {
        
        let particleRegistry = ParticleRegistry.getInstance();
        particleRegistry.clear();
        let particlePairCollisionSystem = new ParticlePairCollisionSystem();
        particlePairCollisionSystem.clear();

        expect(countCollisionDetectorMatrix(particlePairCollisionSystem)).to.equal(0);

        let p1 = new Particle(0, 0, 1, 1, 0);
        let name1 = particleRegistry.registerParticle(p1);
        particlePairCollisionSystem.addNewParticle(name1);
        expect(countCollisionDetectorMatrix(particlePairCollisionSystem)).to.equal(0);
        expect(particlePairCollisionSystem.particlePairCollisionDetectorArray.length).to.equal(0);

        let p2 = new Particle(10, 0, 1, -1, 0);
        let name2 = particleRegistry.registerParticle(p2);
        particlePairCollisionSystem.addNewParticle(name2);
        expect(countCollisionDetectorMatrix(particlePairCollisionSystem)).to.equal(2);
        expect(particlePairCollisionSystem.particlePairCollisionDetectorArray.length).to.equal(1);

        let p3 = new Particle(0, 3, 1, 1, 0);
        let name3 = particleRegistry.registerParticle(p3);
        particlePairCollisionSystem.addNewParticle(name3);
        expect(countCollisionDetectorMatrix(particlePairCollisionSystem)).to.equal(6);
        expect(particlePairCollisionSystem.particlePairCollisionDetectorArray.length).to.equal(3);

        let p4 = new Particle(12, 3, 1, -1, 0);
        let name4 = particleRegistry.registerParticle(p4);
        particlePairCollisionSystem.addNewParticle(name4);
        expect(countCollisionDetectorMatrix(particlePairCollisionSystem)).to.equal(12);
        expect(particlePairCollisionSystem.particlePairCollisionDetectorArray.length).to.equal(6);

        let result = particlePairCollisionSystem.getCollisionDetectors(name1);
        expect(Object.keys(result)).to.eql([name2, name3, name4]);

        result = particlePairCollisionSystem.getCollisionDetectors(name2);
        expect(Object.keys(result)).to.eql([name1, name3, name4]);

        result = particlePairCollisionSystem.getCollisionDetectors(name3);
        expect(Object.keys(result)).to.eql([name1, name2, name4]);

        result = particlePairCollisionSystem.getCollisionDetectors(name4);
        expect(Object.keys(result)).to.eql([name1, name2, name3]);

        particlePairCollisionSystem.recalculate(name4);
    });

    it('should compute the time taken until two particles collide', () => {
        
        let particleRegistry = ParticleRegistry.getInstance();
        particleRegistry.clear();
        let particlePairCollisionSystem = new ParticlePairCollisionSystem();
        particlePairCollisionSystem.clear();

        particlePairCollisionSystem.addNewParticle(particleRegistry.registerParticle(new Particle(0, 0, 1, 1, 0)));
        particlePairCollisionSystem.addNewParticle(particleRegistry.registerParticle(new Particle(10, 0, 1, -1, 0)));
        particlePairCollisionSystem.addNewParticle(particleRegistry.registerParticle(new Particle(0, 3, 1, 1, 0)));
        particlePairCollisionSystem.addNewParticle(particleRegistry.registerParticle(new Particle(12, 3, 1, -1, 0)));

        let [name1, name2, name3, name4] = Object.keys(particlePairCollisionSystem.particles);

        expect(particlePairCollisionSystem.calculatedCollisionData[name1]).to.eql({});
        expect(particlePairCollisionSystem.calculatedCollisionData[name1][name2]).to.not.exist;

        particlePairCollisionSystem.recalculate(name1);
        expect(particlePairCollisionSystem.calculatedCollisionData[name1][name2]).to.equal(particlePairCollisionSystem.calculatedCollisionData[name2][name1]);
        let timeToCollision = particlePairCollisionSystem.calculatedCollisionData[name1][name2].timeUntilCollision;
        expect(timeToCollision).to.equal(4);

        expect(particlePairCollisionSystem.calculatedCollisionData[name3][name4]).to.not.exist;

        particlePairCollisionSystem.recalculateAll();

        expect(particlePairCollisionSystem.calculatedCollisionData[name3][name4]).to.exist;
        timeToCollision = particlePairCollisionSystem.calculatedCollisionData[name3][name4].timeUntilCollision;
        expect(timeToCollision).to.equal(5);
    });


    it('should compute the time of the next collision in the system', () => {
        
        let particleRegistry = ParticleRegistry.getInstance();
        particleRegistry.clear();
        let particlePairCollisionSystem = new ParticlePairCollisionSystem();
        particlePairCollisionSystem.clear();

        particlePairCollisionSystem.addNewParticle(particleRegistry.registerParticle(new Particle(0, 0, 1, 1, 0)));
        particlePairCollisionSystem.addNewParticle(particleRegistry.registerParticle(new Particle(9, 0, 1, -1, 0)));
        particlePairCollisionSystem.addNewParticle(particleRegistry.registerParticle(new Particle(0, 3, 1, 1, 0)));
        particlePairCollisionSystem.addNewParticle(particleRegistry.registerParticle(new Particle(12, 3, 1, -1, 0)));

        particlePairCollisionSystem.recalculateAll();

        let nextCollisions = particlePairCollisionSystem.getNextCollision();
        expect(nextCollisions.length).to.equal(1);
        const firstCollision = nextCollisions[0];
        expect(firstCollision.timeUntilCollision).to.equal(3.5);
        expect(particlePairCollisionSystem.nextCollisions[0].timeUntilCollision).to.equal(3.5);
    });

});
