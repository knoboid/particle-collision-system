import { expect } from 'chai';

import ParticleRegistry from '../../src/particle-collision-system/particle-registry';
import Particle from '../../src/particle-collision-system/particle';


describe('Tests for ParticleRegistry class', () => {

    it('test whether singleton', () => {
        let p1 = new Particle();
        let p2 = new Particle();
        expect(p1 === p2).to.equal(false);

        let r1 = ParticleRegistry.getInstance();
        let r2 = ParticleRegistry.getInstance();
        expect(r1 === r2).to.equal(true);
    });

    it('test makeNewName', () => {
        let registry = ParticleRegistry.getInstance();
        let n1 = registry.makeNewName();
        expect(n1).to.equal('1');
        let n2 = registry.makeNewName();
        expect(n2).to.equal('1');
    });

    it('test registerParticle', () => {
        let registry = ParticleRegistry.getInstance();
        let particle = new Particle(2, 2, 2);
        let name = registry.registerParticle(particle);
        expect(name).to.equal('1');
    });

    it('test getParticle', () => {
        let registry = ParticleRegistry.getInstance();

        let p1 = new Particle(2, 2, 2);
        let p1Name = registry.registerParticle(p1);

        let p2 = new Particle(2, 2, 2);
        let p2Name = registry.registerParticle(p2);

        expect(registry.getParticle(p1Name) === p1).to.equal(true);
        expect(registry.getParticle(p2Name) === p2).to.equal(true);
        expect(registry.getParticle(p2Name) === p1).to.equal(false);
        expect(registry.getParticle(p1Name) === p2).to.equal(false);
    });

    it('test getName', () => {
        let registry = ParticleRegistry.getInstance();
        registry.clear();

        let p1 = new Particle(2, 2, 1);
        let p1Name = registry.registerParticle(p1);

        let p2 = new Particle(2, 2, 2);
        let p2Name = registry.registerParticle(p2);

        let p3 = new Particle(2, 2, 3);
        registry.registerParticle(p3, 'hello');

        expect(registry.getName(p1)).to.equal(p1Name);
        expect(registry.getName(p2)).to.equal(p2Name);
        expect(registry.getName(p3)).to.equal('hello');

        let p4 = new Particle(2, 2, 3);
        expect(registry.getName(p4)).to.equal(undefined);
    });

});
