'use strict';

import {MinMaxPosCalculator} from '../src/MinMaxPosCalculator';

describe('MinMaxPosCalculator', () => {
    var calc;

    beforeEach(() => {
        calc = new MinMaxPosCalculator('500px');
    });

    describe('min', () => {
        it('should return minimum of two px values', () => {
            expect(calc.min('100px', '50px')).toBe('50px');
        });

        it('should return minimum of two % values', () => {
            expect(calc.min('20%', '30%')).toBe('20%');
        });

        it('should return minimum of a % and px value', () => {
            expect(calc.min('100px', '10%')).toBe('50px');
            expect(calc.min('30px', '10%')).toBe('30px');
        });
    });

    describe('max', function () {
        it('should return maximum of two px values', () => {
            expect(calc.max('100px', '50px')).toBe('100px');
        });

        it('should return maximum of two % values', () => {
            expect(calc.max('20%', '30%')).toBe('30%');
        });

        it('should return maximum of a % and px value', () => {
            expect(calc.max('100px', '10%')).toBe('100px');
            expect(calc.max('30px', '10%')).toBe('50px');
        });
    });
});
