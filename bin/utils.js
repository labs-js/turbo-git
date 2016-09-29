#!/usr/bin/env node
require('colors');

module.exports = (function () {
    'use strict';

    return {
        showError: showError
    };

    function showError(errorMessage) {
        var error = errorMessage || 'error';

        console.log(error.magenta);
    }
})();
