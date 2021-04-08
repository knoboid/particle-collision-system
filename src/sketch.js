import p5 from 'p5';

import Rectangle from './geometry/rectangle';
import distanceBetweenParticles from './geometry/particle';
import Particle from './geometry/particle';

function drawRectangle(p5, r) {
    p5.rect(r.x, r.y, r.width, r.height);
}

function drawParticle(p5, p) {
    p5.circle(p.position.x, p.position.y, p.radius*2);
}

function particleBounceDetect(p, r) {
    if (!r.isWithinRight(p.position.x, p.radius)) {
        p.velocity.x = -p.velocity.x;
    } else {
        if (!r.isWithinLeft(p.position.x, p.radius)) {
            p.velocity.x = -p.velocity.x;
        }
    }

    if (!r.isWithinTop(p.position.y, p.radius)) {
        p.velocity.y = -p.velocity.y;
    } else {
        if (!r.isWithinBottom(p.position.y, p.radius)) {
            p.velocity.y = -p.velocity.y;
        }
    }

}

let rectangle;
let p1, p2;

const sketch = (s) => {

    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        rectangle = new Rectangle(10, 10, 400, 600);
        p1 = new Particle(220, 300, 40, 2, 2.3);
        p2 = new Particle(170, 200, 40, -2, -1.5);
    };

    s.draw = () => {
        s.background(26);
        s.fill(255);
        drawRectangle(s, rectangle);
        p1.update();
        particleBounceDetect(p1, rectangle);
        drawParticle(s, p1);

        p2.update();
        particleBounceDetect(p2, rectangle);
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
