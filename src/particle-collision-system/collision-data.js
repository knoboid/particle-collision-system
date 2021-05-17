export default class CollisionData {
    constructor(timeOfCollision=Infinity, callback=()=>{}, clientData) {
        this.timeOfCollision = timeOfCollision;
        this.callback = callback;
        this.clientData = clientData;
    }

    setParticleNames(particleNames) {
        this.particleNames = particleNames;
    }
}
