import RectangularBoundaryCollisionDetector from './rectangular-boundary-collision-detector';

export default class RectangularBoundary {
    constructor(rectangle) {
        this.rectangle = rectangle;
    }

    newBoundaryCollisionDetector(particle) {
        return new RectangularBoundaryCollisionDetector(particle, this.rectangle);
    }

}
