export default class ParticleCollisionManager {
    constructor(particle) {
        this.particle = particle;
        this.collisionDetectors = [];
        this.time = 0;
        this.timeToNextCollision = Infinity;
    }

    addCollisionDetector(collisionDetector) {
        this.collisionDetectors.push(collisionDetector);
        this.evaluateCollisionDetector(collisionDetector);
    }

    evaluateCollisionDetector(collisionDetector) {
        let collisionData = collisionDetector.recalculate();
        let timeToNextCollisionForDectector = collisionData.timeUntilCollision;
        if (timeToNextCollisionForDectector < this.timeToNextCollision) {
            this.timeToNextCollision = timeToNextCollisionForDectector;
            this.nextCollision = collisionData;
        }
    }

    evaluateCollisionDetectors() {
        this.timeToNextCollision = Infinity;
        this.collisionDetectors.forEach(collisionDetector => 
            this.evaluateCollisionDetector(collisionDetector)
        );
    }

    // /**
    //  * Updates the particle's path over a particular step time.
    //  * If the stepTime is 1, the particle (if it's velocity does not change 
    //  * over the course of the update) moves a single velocity unit during the 
    //  * update, resulting in it emerging from the update with the same velocity 
    //  * and with an updated position (equal to the previous position + a single 
    //  * velocity unit).
    //  * 
    //  * If one or more collisions occur during the update the particle will 
    //  * generally emerge with updated velocity and position.
    //  * @param {} stepTime 
    //  */
    // update(stepTime=1) {
    //     if (stepTime > this.timeToNextCollision) {
    //         let timeRemaining = stepTime - this.timeToNextCollision;
    //         let collisionType = this.nextCollision[1];
    //         // console.log(this.nextCollision);
    //         if (collisionType === 'particle') {
    //             this.particle.update(this.timeToNextCollision);
    //             let vectorUpdateCallback = this.nextCollision[3];
    //             vectorUpdateCallback();
    //             timeRemaining = stepTime;
    //         }
    //         else {
    //             this.particle.update(this.timeToNextCollision);
    //             let vectorUpdateCallback = this.nextCollision[3];
    //             vectorUpdateCallback();
    //         }
    //         this.evaluateCollisionDetectors();
    //         this.update(timeRemaining);
    //     }
    //     else {
    //         this.timeToNextCollision -= stepTime;
    //         this.particle.update(stepTime);
    //     }
    // }
}
