import p5 from 'p5';

import Rectangle from './geometry/rectangle';
import Particle from './geometry/particle';
import RectangularBoundary from './geometry/rectangular-boundary';
import RectangularBoundaryCollisionDetector from './geometry/rectangular-boundary-collision-detector';
import ParticleCollisionManager from './geometry/particle-collision-manager';

function drawRectangle(p5, r) {
    p5.rect(r.x, r.y, r.width, r.height);
}

function drawParticle(p5, p) {
    p5.circle(p.position.x, p.position.y, p.radius*2);
}

let rectangle;
let p1, p2;
let boundary;
let p1BCD, p2BCD;
let p1PCM, p2PCM;

const sketch = (s) => {

    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        rectangle = new Rectangle(10, 10, 400, 350);
        boundary = new RectangularBoundary(rectangle);

        let max = 2;
        p1 = new Particle(220, 300, 60, 2 * max * (Math.random() - 0.5), 2 * max * (Math.random() - 0.5));
        p2 = new Particle(170, 200, 60, 2 * max * (Math.random() - 0.5), 2 * max * (Math.random() - 0.5));
        
        p1PCM = new ParticleCollisionManager(p1);
        p2PCM = new ParticleCollisionManager(p2);
        
        p1BCD = new RectangularBoundaryCollisionDetector(p1, rectangle);
        p2BCD = new RectangularBoundaryCollisionDetector(p2, rectangle);

        p1PCM.addCollisionDetector(p1BCD);
        p2PCM.addCollisionDetector(p2BCD);
    };

    s.draw = () => {
        s.background(0);

        s.fill(0,255,0);
        drawRectangle(s, rectangle);

        s.fill(191, 255, 127);
        s.noStroke();

        p1PCM.update(1);
        drawParticle(s, p1);

        p2PCM.update(1);
        drawParticle(s, p2);
    };

    s.mouseClicked = (event) => {
        console.log(event);
    };

    s.keyPressed = (event) => {
        console.log(event.code);
    };
};

const sketchInstance = new p5(sketch);
