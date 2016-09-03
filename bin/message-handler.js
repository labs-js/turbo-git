require('colors');

module.exports = (function () {
    'use strict';

    return {
        showError: showError
    };

    function showError(errorMessage) {
        console.log(errorMessage.magenta);
    }
})();