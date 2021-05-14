import p5 from 'p5';

import Rectangle from './particle-collision-system/boundary-particle-collisions/rectangle';
import Particle from './particle-collision-system/particle';
import RectangularBoundary from './particle-collision-system/boundary-particle-collisions/rectangular-boundary';
import ParticleSystem from './particle-collision-system/particle-system';

function drawRectangle(p5, r) {
    p5.rect(r.x, r.y, r.width, r.height);
}

function drawParticle(p5, p) {
    p5.circle(p.position.x, p.position.y, p.radius*2);
}

function drawParticles(p5, particleSystem) {
    particleSystem.particles.forEach(particle => drawParticle(p5, particle));
}

let rectangle;
let particleSystem;

const sketch = (s) => {

    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
        const width = 400, height = 400;
        rectangle = new Rectangle(0, 0, width, height);
        const boundary = new RectangularBoundary(rectangle);

        particleSystem = new ParticleSystem(boundary);

        const maxSpeed = 4;
        const step = 100;

        for (let i = 25; i < width; i = i + step) {
            for (let j = 25; j < height; j += step) {
                let r = Math.random();
                let r2 = Math.pow(r, 5);
                const mass = r2 * 10 + 10;
                let particle = new Particle(i, j, mass, 2 * maxSpeed * (Math.random() - 0.5), 2 * maxSpeed * (Math.random() - 0.5));
                particleSystem.addParticle(particle);
            }
        }

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
