import p5 from 'p5';

import Rectangle from './particle-collision-system/boundary-particle-collisions/rectangle';
import Particle from './particle-collision-system/particle';
import RectangularBoundary from './particle-collision-system/boundary-particle-collisions/rectangular-boundary';
import ParticleSystem from './particle-collision-system/particle-system';
import ParticlePairCollisionSystem from './particle-collision-system/particle-pair-collisions/particle-pair-collision-system';
import BoundaryParticleCollisionSystem from './particle-collision-system/boundary-particle-collisions/boundary-particle-collision-system';

const SPEED_FACTOR = 1;   // A Number greater than 0
const SIZE_VARIABILITY = 0.7; // Vary between 0 and 0.999999999!
const BIAS_TOWARDS_SMALLER_PARTICLES = 2; // A number between 0 and Infinity. 
    // BIAS_TOWARDS_SMALLER_PARTICLES = 1 gives a linear fall-off.
const SCALE = 0.08;   // A Number between 0 and 1. Particle size relative to display.
const DENSITY = 0.45;  // A Number between 0 and 1. The tightness of particle packing.

const BACKGROUND_COLOURS = [
    '#ff0000',
    '#ffa500',
    '#ffff00',
    '#008000',
    '#0000ff',
    '#4b0082',
    '#ee82ee',    
];

function drawParticle(p5, particle) {
    p5.circle(particle.position.x, particle.position.y, particle.radius*2);
}

function drawParticles(p5, particleSystem) {
    particleSystem.particles.forEach(colouredParticle => {
        p5.fill(...colouredParticle.fillArguments(), 155);
        drawParticle(p5, colouredParticle);
    });
}

function drawBackground(p5, colourArray, windowWidth, windowHeight) {
    const colourCount = colourArray.length;
    const stripeWidth = windowWidth / colourCount;
    for (let i = 0; i < colourCount; i++) {
        p5.fill(colourArray[i]);
        p5.rect(stripeWidth * i, 0, stripeWidth + 1, windowHeight);
    }
}

let rectangle;
const particleSystem = new ParticleSystem();
let colourArray;
const sketch = (s) => {

    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);

        const width = s.width, height = s.height;
        rectangle = new Rectangle(0, 0, width, height);
        const boundary = new RectangularBoundary(rectangle);

        const particlePairSystem = new ParticlePairCollisionSystem();
        const boundaryParticleSystem = new BoundaryParticleCollisionSystem(boundary);

        particleSystem.addCollisionSystem(particlePairSystem);
        particleSystem.addCollisionSystem(boundaryParticleSystem);

        const maxParticleSize = Math.min(s.windowWidth, s.windowHeight) * SCALE / 2;
        const step = maxParticleSize * 2 / DENSITY;        
        const maxSpeed = SPEED_FACTOR * maxParticleSize / (20 * DENSITY);
        const minParticleSize = maxParticleSize * (1 - SIZE_VARIABILITY);

        for (let i = step/2; i < width - maxParticleSize; i += step) {
            for (let j = step/2; j < height - maxParticleSize; j += step) {
                let randomFactor = Math.pow(Math.random(), BIAS_TOWARDS_SMALLER_PARTICLES);
                const mass = randomFactor * (maxParticleSize - minParticleSize) + minParticleSize;
                let particle = new ColouredParticle(i, j, mass, 2 * maxSpeed * (Math.random() - 0.5), 2 * maxSpeed * (Math.random() - 0.5));
                particleSystem.addParticle(particle);
            }
        }

        particleSystem.start();

        colourArray = makeColourArrayThatLooksOkayWithTheCurrentScreenWidth(BACKGROUND_COLOURS, s.windowWidth); // BACKGROUND_COLOURS;
    };

    s.draw = () => {
        s.noStroke();
        drawBackground(s, colourArray, s.windowWidth, s.windowHeight);

        particleSystem.update(1);
        s.stroke(31);
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

class ColouredParticle extends Particle {
    constructor(x, y, r, xVelocity, yVelocity) {
        super(x, y, r, xVelocity, yVelocity);
        const yellowColour = randomColour([230, 25], [190, 50], [0, 70]);
        const blueColour = randomColour([30, 90], [130, 90], [230, 25]);
        const redColour = randomColour([200, 40], [30, 90], [100, 25]);
        const greenColour = randomColour([130, 25], [230, 25], [130, 25]);
        r = Math.random();
        this.colour = r < 0.3 ? yellowColour : r < 0.6 ? blueColour : r < 0.9 ? redColour: greenColour;
    }
    
    fillArguments() {
        return [this.colour.red, this.colour.green, this.colour.blue];
    }
}

function colourRange(lowerLimit,spread) {
    return lowerLimit + Math.floor(spread * Math.random());
}

function randomColour(redRange, greenRange, blueRange) {
    return {
        red: colourRange(...redRange), 
        green: colourRange(...greenRange),
        blue: colourRange(...blueRange)
    }; 
}

function makeColourArrayThatLooksOkayWithTheCurrentScreenWidth(colourArray, screenWidth) {
    const unitWidth = 800;
    const repeats = Math.floor(screenWidth / unitWidth);
    
    let result = [];
    for(let i = 0; i < repeats; i++) {
        result = result.concat(colourArray);
    }

    return repeats ===0 ? colourArray : result;
}
