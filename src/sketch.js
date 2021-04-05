import p5 from 'p5';

const sketch = (s) => {

    s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight);
    };

    s.draw = () => {
        s.background(26);
        s.fill(255);
    };

    s.mouseClicked = (event) => {
        console.log(event);
    };

    s.keyPressed = (event) => {
        console.log(event.code);
    };
};

const sketchInstance = new p5(sketch);
