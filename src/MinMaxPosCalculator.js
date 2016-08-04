'use strict';

class MinMaxPosCalculator {
    constructor(base) {
        this.base = base;
    }

    static unit(value) {
        var re      = /\d+(px|%)$/,
            matches = re.exec(value);

        return matches && matches[1] ? matches[1] : null;
    }

    convertPercentToPx(a) {
        return ((parseInt(this.base) / 100) * parseInt(a)) + 'px';
    }

    prepareValues(a, b) {
        if (MinMaxPosCalculator.unit(a) !== MinMaxPosCalculator.unit(b)) {
            if (MinMaxPosCalculator.unit(a) === '%') {
                a = this.convertPercentToPx(a);
            }
            if (MinMaxPosCalculator.unit(b) === '%') {
                b = this.convertPercentToPx(b);
            }
        }

        return {
            a: parseInt(a),
            b: parseInt(b),
            unit: MinMaxPosCalculator.unit(a)
        }
    }

    min(a, b) {
        var values = this.prepareValues(a, b);

        return Math.min(values.a, values.b) + values.unit;
    }

    max(a, b) {
        var values = this.prepareValues(a, b);

        return Math.max(values.a, values.b) + values.unit;
    }
}

export { MinMaxPosCalculator }
