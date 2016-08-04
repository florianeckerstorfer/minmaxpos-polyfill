'use strict';

import {MinMaxPosCalculator} from './MinMaxPosCalculator';

function MinMaxPosPolyfill() {
    Polyfill({
        declarations: [
            'min-left:*',
            'max-left:*',
            'min-right:*',
            'max-right:*',
            'min-top:*',
            'max-top:*',
            'min-bottom:*',
            'max-bottom:*'
        ]
    })
        .doMatched(doMatched)
        .undoUnmatched(undoUnmatched);

    function doMatched(rules) {
        rules.each((rule) => {
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

    function undoUnmatched(rules) {
    }

    function applyRule(rule, element, property) {
        var calc,
            operation        = property.match(/min/) ? 'max' : 'min',
            originalProperty = property.replace(/(min|max)-/, '');

        if (originalProperty === 'left' || originalProperty === 'right') {
            calc = new MinMaxPosCalculator(element.parentElement.offsetWidth);
        } else if (originalProperty === 'top' || originalProperty === 'bottom') {
            calc = new MinMaxPosCalculator(element.parentElement.offsetHeight);
        }

        if (rule.getDeclaration()[property]) {
            element.style[originalProperty] = calc[operation](
                offset(element, originalProperty),
                rule.getDeclaration()[property]
            );
        }
    }

    function offset(element, property) {
        var relative     = element.parentElement.style.position === 'relative',
            parentWidth  = relative ? window.innerWidth : element.parentElement.offsetWidth,
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

export {MinMaxPosPolyfill}
