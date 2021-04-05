import Victor from 'victor';

export default class VictorAdapter extends Victor {
    constructor(x, y) {
        super(x, y);
    }

    add(vector) {
        let result = this.clone().add(vector);
        return new Victor(result.x, result.y);
    }
}
