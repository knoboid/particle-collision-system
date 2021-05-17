export default class NextCollisions {
    constructor() {
        this.reset();
    }

    reset() {
        this.timeOfNextCollision = Infinity;
        this.nextCollisions = [];
    }

    evaluate(collisionData) {
        if (collisionData.timeOfCollision < this.timeOfNextCollision) {
            this.timeOfNextCollision = collisionData.timeOfCollision;
            this.nextCollisions = [ collisionData ];
        }
        else if(collisionData.timeOfCollision === this.timeOfNextCollision) {
            this.nextCollisions.push(collisionData);
        }
    }
}
