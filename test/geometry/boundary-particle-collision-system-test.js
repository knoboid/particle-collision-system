import { expect } from 'chai';

import BoundaryParticleCollisionSystem from '../../src/geometry/boundary-particle-collisions/boundary-particle-collision-system';
import Particle from '../../src/geometry/particle';
import ParticleRegistry from '../../src/geometry/particle-registry';
import Rectangle from '../../src/geometry/boundary-particle-collisions/rectangle';

import RectangularBoundary from '../../src/geometry/boundary-particle-collisions/rectangular-boundary';


describe('Tests for BoundaryParticleCollisionSystem', () => {

    it('should create and store the CollisionDetectors as particles are added', () => {
        
        let particleRegistry = ParticleRegistry.getInstance();
        particleRegistry.clear();

        const rectangle = new Rectangle(0, 0, 10, 10);
        const boundary = new RectangularBoundary(rectangle);

        const boundaryParticleCollisionSystem = new BoundaryParticleCollisionSystem(boundary);

        const particle = new Particle(6, 8, 1, 0, 0);
        const particleName = particleRegistry.registerParticle(particle);

        boundaryParticleCollisionSystem.addNewParticle(particleName);

        expect(boundaryParticleCollisionSystem.getCollisionDetectors().length).to.eql(1);

        const particle2 = new Particle(6, 8, 1, 0, 0);
        const particleName2 = particleRegistry.registerParticle(particle2);

        boundaryParticleCollisionSystem.addNewParticle(particleName2);

        expect(boundaryParticleCollisionSystem.getCollisionDetectors().length).to.eql(2);

        expect(0).to.equal(0);
    });

});
