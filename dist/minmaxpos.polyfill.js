(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MinMaxPosCalculator = function () {
    function MinMaxPosCalculator(base) {
        _classCallCheck(this, MinMaxPosCalculator);

        this.base = base;
    }

    _createClass(MinMaxPosCalculator, [{
        key: 'convertPercentToPx',
        value: function convertPercentToPx(a) {
            return parseInt(this.base) / 100 * parseInt(a) + 'px';
        }
    }, {
        key: 'prepareValues',
        value: function prepareValues(a, b) {
            var unitA = MinMaxPosCalculator.unit(a) || 'px';
            var unitB = MinMaxPosCalculator.unit(b) || 'px';

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
            };
        }
    }, {
        key: 'min',
        value: function min(a, b) {
            var values = this.prepareValues(a, b);

            return Math.min(values.a, values.b) + values.unit;
        }
    }, {
        key: 'max',
        value: function max(a, b) {
            var values = this.prepareValues(a, b);

            return Math.max(values.a, values.b) + values.unit;
        }
    }], [{
        key: 'unit',
        value: function unit(value) {
            var re = /\d+(px|%)$/,
                matches = re.exec(value);

            return matches && matches[1] ? matches[1] : null;
        }
    }]);

    return MinMaxPosCalculator;
}();

exports.MinMaxPosCalculator = MinMaxPosCalculator;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MinMaxPosPolyfill = undefined;

var _MinMaxPosCalculator = require('./MinMaxPosCalculator');

function MinMaxPosPolyfill() {
    Polyfill({
        declarations: ['min-left:*', 'max-left:*', 'min-right:*', 'max-right:*', 'min-top:*', 'max-top:*', 'min-bottom:*', 'max-bottom:*']
    }).doMatched(doMatched).undoUnmatched(undoUnmatched);

    function doMatched(rules) {
        rules.each(function (rule) {
            var elements = document.querySelectorAll(rule.getSelectors());
            for (var i = 0; i < elements.length; i++) {
                applyRule(rule, elements[i], 'min-left');
                applyRule(rule, elements[i], 'max-left');
                applyRule(rule, elements[i], 'min-right');
                applyRule(rule, elements[i], 'max-right');
                applyRule(rule, elements[i], 'min-top');
                applyRule(rule, elements[i], 'max-top');
                applyRule(rule, elements[i], 'min-bottom');
                applyRule(rule, elements[i], 'max-bottom');
            }
        });
    }

    function undoUnmatched(rules) {}

    function applyRule(rule, element, property) {
        var calc,
            operation = property.match(/min/) ? 'max' : 'min',
            originalProperty = property.replace(/(min|max)-/, '');

        if (originalProperty === 'left' || originalProperty === 'right') {
            calc = new _MinMaxPosCalculator.MinMaxPosCalculator(element.parentElement.offsetWidth);
        } else if (originalProperty === 'top' || originalProperty === 'bottom') {
            calc = new _MinMaxPosCalculator.MinMaxPosCalculator(element.parentElement.offsetHeight);
        }

        if (rule.getDeclaration()[property]) {
            element.style[originalProperty] = calc[operation](offset(element, originalProperty), rule.getDeclaration()[property]);
        }
    }

    function offset(element, property) {
        var relative = element.parentElement.style.position === 'relative',
            parentWidth = relative ? window.innerWidth : element.parentElement.offsetWidth,
            parentHeight = relative ? window.innerHeight : element.parentElement.offsetHeight;

        if (property === 'left') {
            return element.offsetLeft;
        } else if (property === 'top') {
            return element.offsetTop;
        } else if (property === 'right') {
            return parentWidth - (element.offsetLeft + element.offsetWidth);
        } else if (property === 'bottom') {
            return parentHeight - (element.offsetTop + element.offsetHeight);
        }
    }
}

exports.MinMaxPosPolyfill = MinMaxPosPolyfill;

},{"./MinMaxPosCalculator":1}],3:[function(require,module,exports){
'use strict';

var _MinMaxPosPolyfill = require('./MinMaxPosPolyfill');

window.MinMaxPosPolyfill = _MinMaxPosPolyfill.MinMaxPosPolyfill;

},{"./MinMaxPosPolyfill":2}]},{},[3]);
