export default class CollisionData {
    constructor(timeUntilCollision, callback, clientData, time=0) {
        this.timeUntilCollision = timeUntilCollision;
        this.callback = callback;
        this.clientData = clientData;
    }

    setParticleNames(particleNames) {
        this.particleNames = particleNames;
    }
}