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
        var unitA = MinMaxPosCalculator.unit(a) || 'px';
        var unitB  = MinMaxPosCalculator.unit(b) || 'px';

        if (unitA !== unitB) {
            if (unitA === '%') {
                a = this.convertPercentToPx(a);
            }
            if (unitB === '%') {
                b = this.convertPercentToPx(b);
            }
        }

        return {
            a: parseInt(a),
            b: parseInt(b),
            unit: unitA
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
