import { expect } from 'chai';

let state;

function reset() {
    state = 0;
}

function incrementState() {
    state++;
}

function addState(number) {
    state = state + number;
}

describe('Tests for state changes', () => {

    it('test reset', () => {
        reset();
        expect(state).to.equal(0);
    });

    it('test incrementState', () => {
        reset();
        incrementState();
        expect(state).to.equal(1);
    });

    it('test addState', () => {
        reset();
        incrementState();
        addState(7);
        expect(state).to.equal(8);
    });

});