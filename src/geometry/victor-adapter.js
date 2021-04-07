import Victor from 'victor';

export default class VictorAdapter extends Victor {
    constructor(x, y) {
        super(x, y);
    }

    add(vector) {
        return this.clone().add(vector);

    }

    subtract(vector) {
        return this.clone().subtract(vector);
    }
}
