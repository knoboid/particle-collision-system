import CollisionData from '../collision-data';

export default class RectangularBoundaryCollisionDetector {
    constructor(p1, rectangle) {
        this.p1 = p1;
        this.rectangle = rectangle;
    }

    recalculate(currentTime) {
        let timeToRight, timeToTop, timeToLeft, timeToBottom;
        let timeDifference, timeComparison;
        let xDirection = Math.sign(this.p1.velocity.x);
        let yDirection = Math.sign(this.p1.velocity.y);
        let code = 3 * yDirection + xDirection;

        switch (code) {
            case 0: // xDirection: 0, yDirection: 0 (stationary)
                return new CollisionData(
                    Infinity,
                    RectangularBoundaryCollisionDetector.noOperation,
                    { h: 0, v: 0 }
                );

            case 1: // xDirection: 1, yDirection: 0 (right)
                return new CollisionData(
                    currentTime + this.timeToRight(),
                    () => this.toggleX(),
                    { h: 1, v: 0 }
                );

            case -1: // xDirection: -1, yDirection: 0 (left)
                return new CollisionData(
                    currentTime + this.timeToLeft(),
                    () => this.toggleX(),
                    { h: -1, v: 0 }
                );
        
            case 3: // xDirection: 0, yDirection: 1 (down)
                return new CollisionData(
                    currentTime + this.timeToBottom(),
                    () => this.toggleY(),
                    { h: 0, v: 1 }
                );

            case -3: // xDirection: 0, yDirection: -1 (up)
                return new CollisionData(
                    currentTime + this.timeToTop(),
                    () => this.toggleY(),
                    { h: 0, v: -1 }
                );

            case 4: // xDirection: 1, yDirection: 1 (lower right)
                timeToRight = this.timeToRight();
                timeToBottom = this.timeToBottom();
                timeDifference = timeToRight - timeToBottom;
                timeComparison = Math.sign(timeDifference);
                switch (timeComparison) {
                    case -1:
                        return new CollisionData(
                            currentTime + timeToRight,
                            () => this.toggleX(),
                            { h: 1, v: 0 }
                        );
                        
                    case 1:
                        return new CollisionData(
                            currentTime + timeToBottom,
                            () => this.toggleY(),
                            { h: 0, v: 1 }
                        );

                    case 0:
                        return new CollisionData(
                            currentTime + timeToRight,
                            () => this.toggleXY(),
                            { h: 1, v: 1 }
                        );
                }

                break;

            case -2: // xDirection: 1, yDirection: -1 (upper right)
                timeToRight = this.timeToRight();
                timeToTop = this.timeToTop();
                timeDifference = timeToRight - timeToTop;
                timeComparison = Math.sign(timeDifference);
                switch (timeComparison) {
                    case -1:
                        return new CollisionData(
                            currentTime + timeToRight,
                            () => this.toggleX(),
                            { h: 1, v: 0 }
                        );
                        
                    case 1:
                        return new CollisionData(
                            currentTime + timeToTop,
                            () => this.toggleY(),
                            { h: 0, v: -1 }
                        );

                    case 0:
                        return new CollisionData(
                            currentTime + timeToRight,
                            () => this.toggleXY(),
                            { h: 1, v: -1 }
                        );
                }

                break;

            case -4: // xDirection: -1, yDirection: -1 (upper left)
                timeToLeft = this.timeToLeft();
                timeToTop = this.timeToTop();
                timeDifference = timeToLeft - timeToTop;
                timeComparison = Math.sign(timeDifference);
                switch (timeComparison) {
                    case -1: // left
                        return new CollisionData(
                            currentTime + timeToLeft,
                            () => this.toggleX(),
                            { h: -1, v: 0 }
                        );
                        
                    case 1: // up
                        return new CollisionData(
                            currentTime + timeToTop,
                            () => this.toggleY(),
                            { h: 0, v: -1 }
                        );

                    case 0:
                        return new CollisionData(
                            currentTime + timeToLeft,
                            () => this.toggleXY(),
                            { h: -1, v: -1 }
                        );
                }

                break;

            case 2: // xDirection: -1, yDirection: 1 (lower left)
                timeToLeft = this.timeToLeft();
                timeToBottom = this.timeToBottom();
                timeDifference = timeToLeft - timeToBottom;
                timeComparison = Math.sign(timeDifference);

                switch (timeComparison) {
                    case -1: // left
                        return new CollisionData(
                            currentTime + timeToLeft,
                            () => this.toggleX(),
                            { h: -1, v: 0 }
                        );
                        
                    case 1: // down
                        return new CollisionData(
                            currentTime + timeToBottom,
                            () => this.toggleY(),
                            { h: 0, v: 1 }
                        );

                    case 0:
                        return new CollisionData(
                            currentTime + timeToLeft,
                            () => this.toggleXY(),
                            { h: -1, v: 1 }
                        );
                }
        }
    }

    distanceToRight() {
        return this.rectangle.xRight() - this.p1.position.x - this.p1.radius;
    }

    distanceToLeft() {
        return this.p1.position.x - this.rectangle.xLeft() - this.p1.radius;
    }

    distanceToTop() {
        return this.p1.position.y - this.rectangle.yTop() - this.p1.radius;
    }

    distanceToBottom() {
        return this.rectangle.yBottom() - this.p1.position.y - this.p1.radius;
    }

    timeToLeft() {
        return -this.distanceToLeft()/this.p1.velocity.x;
    }

    timeToRight() {
        return this.distanceToRight()/this.p1.velocity.x;
    }

    timeToTop() {
        return -this.distanceToTop()/this.p1.velocity.y;
    }

    timeToBottom() {
        return this.distanceToBottom()/this.p1.velocity.y;
    }

    static noOperation() {

    }

    toggleX() {
        this.p1.velocity.x = -this.p1.velocity.x;
    }

    toggleY() {
        this.p1.velocity.y = -this.p1.velocity.y;
    }

    toggleXY() {
        this.toggleX();
        this.toggleY();
    }
}
