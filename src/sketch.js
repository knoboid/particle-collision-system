import p5 from 'p5';

import Rectangle from './geometry/rectangle';
import Particle from './geometry/particle';
import RectangularBoundary from './geometry/rectangular-boundary';
import ParticleSystem from './geometry/particle-system';

function drawRectangle(p5, r) {
    p5.rect(r.x, r.y, r.width, r.height);
}

function drawParticle(p5, p) {
    p5.circle(p.position.x, p.position.y, p.radius*2);
}

function drawParticles(p5, particleSystem) {
    Object.values(particleSystem.particles).forEach(particleData => drawParticle(p5, particleData.particle));
}

let rectangle;
let particleSystem;

const sketch = (s) => {

    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        rectangle = new Rectangle(0, 0, 400, 400);
        const boundary = new RectangularBoundary(rectangle);

        particleSystem = new ParticleSystem(boundary);

        const maxSpeed = 1;
        const step = 50;

        // for (let i = 25; i < 380; i = i + step) {
        //     for (let j = 25; j < 330; j += step) {
        //         let r = Math.random();
        //         let r2 = Math.pow(r, 7);
        //         const mass = r2 * 8 + 4;
        //         let particle = new Particle(i, j, mass, 2 * maxSpeed * (Math.random() - 0.5), 2 * maxSpeed * (Math.random() - 0.5));
        //         particleSystem.addParticle(particle);
        //     }
        // }

        let p1 = new Particle(100, 100, 10, 2 * maxSpeed * 1, 2 * maxSpeed * 0);
        particleSystem.addParticle(p1);

        let p2 = new Particle(300, 100, 10, 2 * maxSpeed * -1, 2 * maxSpeed * 0);
        particleSystem.addParticle(p2);

        let p3 = new Particle(100, 300, 10, 2 * maxSpeed * 1, 2 * maxSpeed * 0);
        particleSystem.addParticle(p3);

        let p4 = new Particle(300, 300, 10, 2 * maxSpeed * -1, 2 * maxSpeed * 0);
        particleSystem.addParticle(p4);

        let p5 = new Particle(100, 200, 10, 2 * maxSpeed * -1, 2 * maxSpeed * 0);
        particleSystem.addParticle(p5);

        let p6 = new Particle(300, 200, 10, 2 * maxSpeed * 1, 2 * maxSpeed * 0);
        particleSystem.addParticle(p6);

        particleSystem.start(); 
    };

    s.draw = () => {
        s.background(0);

        s.fill(0,63,0);
        drawRectangle(s, rectangle);

        s.fill(191, 255, 127);
        s.noStroke();

        particleSystem.update(1);

        drawParticles(s, particleSystem);
    };

    s.mouseClicked = (event) => {
        console.log(event);
    };

    s.keyPressed = (event) => {
        console.log(event.code);
    };
};

const sketchInstance = new p5(sketch);
