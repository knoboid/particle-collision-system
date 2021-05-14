class ParticleRegistry {
    constructor() {
        this.clear();
    }

    clear() {
        this.counter = 1;
        this.particleLookupByName = {};   
    }

    static getInstance(p5) {
        return ParticleRegistry.instance;
    }

    nameExists(name) {
        return Object.keys(this.particleLookupByName).includes(name);
    }

    makeNewName() {
        while(this.nameExists(this.counter.toString())) {
            this.counter++;
        }
        return this.counter.toString();
    }

    registerParticle(particle, name) {
        if (typeof(name) === 'undefined') {
            name = this.makeNewName();
        }
        else {
            if (this.nameExists(name)) {
                name = this.makeNewName();
            }
        }
        this.particleLookupByName[name] = particle;
        return name;
    }

    getParticle(name) {
        return this.particleLookupByName[name];
    }

    getName(particle) {
        let values = Object.values(this.particleLookupByName);
        let index = values.indexOf(particle);
        if (index !== -1) {
            return Object.keys(this.particleLookupByName)[index];
        }
    }

}

ParticleRegistry.instance = new ParticleRegistry();

export default ParticleRegistry;
