import { expect } from 'chai';

import ParticleRegistry from '../../src/geometry/particle-registry';
import Particle from '../../src/geometry/particle';


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
        name = registry.registerParticle(particle);
        expect(name).to.equal('2');
        name = registry.registerParticle(particle, '4');
        expect(name).to.equal('4');
        name = registry.registerParticle(particle);
        expect(name).to.equal('3');
        name = registry.registerParticle(particle);
        expect(name).to.equal('5');
    });

    it('test getParticle', () => {
        let registry = ParticleRegistry.getInstance();

        let p1 = new Particle(2, 2, 2);
        let p1Name = registry.registerParticle(p1);

        let p2 = new Particle(2, 2, 2);
        let p2Name = registry.registerParticle(p2);

        expect(registry.getParticele(p1Name) === p1).to.equal(true);
        expect(registry.getParticele(p2Name) === p2).to.equal(true);
        expect(registry.getParticele(p2Name) === p1).to.equal(false);
        expect(registry.getParticele(p1Name) === p2).to.equal(false);
    });


});
