export default class RectangularBoundaryCollisionDetector {
    constructor(p1, rectangle) {
        this.p1 = p1;
        this.rectangle = rectangle;
    }

    recalculate() {
        let timeToRight, timeToTop, timeToLeft, timeToBottom;
        let timeDifference, timeComparison;
        let xDirection = Math.sign(this.p1.velocity.x);
        let yDirection = Math.sign(this.p1.velocity.y);
        let code = 3 * yDirection + xDirection;

        switch (code) {
            case 0: // xDirection: 0, yDirection: 0 (stationary)
                return [0, 0, NaN, this.noOperation];

            case 1: // xDirection: 1, yDirection: 0 (right)
                return [1, 0, this.timeToRight(), () => this.toggleX()];

            case -1: // xDirection: -1, yDirection: 0 (left)
                return [-1, 0, this.timeToLeft(), () => this.toggleX()];
        
            case 3: // xDirection: 0, yDirection: 1 (down)
                return [0, 1, this.timeToBottom(), () => this.toggleY()];

            case -3: // xDirection: 0, yDirection: -1 (up)
                return [0, -1, this.timeToTop(), () => this.toggleY()];

            case 4: // xDirection: 1, yDirection: 1 (lower right)
                timeToRight = this.timeToRight();
                timeToBottom = this.timeToBottom();
                timeDifference = timeToRight - timeToBottom;
                timeComparison = Math.sign(timeDifference);
                switch (timeComparison) {
                    case -1:
                        return [1, 0, timeToRight, () => this.toggleX()];
                        
                    case 1:
                        return [0, 1, timeToBottom, () => this.toggleY()];

                    case 0:
                        return [1, 1, timeToRight, () => this.toggleX()];
                }

                break;

            case -2: // xDirection: 1, yDirection: -1 (upper right)
                timeToRight = this.timeToRight();
                timeToTop = this.timeToTop();
                timeDifference = timeToRight - timeToTop;
                timeComparison = Math.sign(timeDifference);
                switch (timeComparison) {
                    case -1:
                        return [1, 0, timeToRight, () => this.toggleX()];
                        
                    case 1:
                        return [0, -1, timeToTop, () => this.toggleY()];

                    case 0:
                        return [1, -1, timeToRight, () => this.toggleX()];
                }

                break;

            case -4: // xDirection: -1, yDirection: -1 (upper left)
                timeToLeft = this.timeToLeft();
                timeToTop = this.timeToTop();
                timeDifference = timeToLeft - timeToTop;
                timeComparison = Math.sign(timeDifference);
                switch (timeComparison) {
                    case -1: // left
                        return [-1, 0, timeToLeft, () => this.toggleX()];
                        
                    case 1: // up
                        return [0, -1, timeToTop, () => this.toggleY()];

                    case 0:
                        return [-1, -1, timeToLeft, () => this.toggleX()];
                }

                break;

            case 2: // xDirection: -1, yDirection: 1 (lower left)
                timeToLeft = this.timeToLeft();
                timeToBottom = this.timeToBottom();
                timeDifference = timeToLeft - timeToBottom;
                timeComparison = Math.sign(timeDifference);
                switch (timeComparison) {
                    case -1: // left
                        return [-1, 0, timeToLeft, () => this.toggleX()];
                        
                    case 1: // up
                        return [0, 1, timeToBottom, () => this.toggleY()];

                    case 0:
                        return [-1, 1, timeToLeft, () => this.toggleX()];
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

    noOperation() {

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
