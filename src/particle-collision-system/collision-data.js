export default class CollisionData {
    constructor(timeOfCollision, callback, clientData, time=0) {
        this.timeOfCollision = timeOfCollision;
        this.callback = callback;
        this.clientData = clientData;
    }

    setParticleNames(particleNames) {
        this.particleNames = particleNames;
    }
}