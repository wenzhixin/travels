'use strict';

/* Filters */

angular.module('filters', [])

    .filter('introductionFilter', function () {
        return function (input) {
            return subString(input, 100, true);
        };
    })

    .filter('htmlFilter', function () {
        return function (input) {
            if (input) {
                return input.replace(/\n/g, '<br />');
            }
            return input;
        };
    });

function subString(str, len, hasDot) {
    var newLength = 0;
    var newStr = '';
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = '';
    var strLength = str.replace(chineseRegex, '**').length;
    for (var i = 0; i < strLength; i++) {
        singleChar = str.charAt(i).toString();
        if (singleChar.match(chineseRegex) != null) {
            newLength += 2;
        }
        else {
            newLength++;
        }
        if (newLength > len) {
            break;
        }
        newStr += singleChar;
    }

    if (hasDot && strLength > len) {
        newStr += '……';
    }
    return newStr;
}