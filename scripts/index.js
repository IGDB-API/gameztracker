'use strict';

//sticky header//


var app = app || {};

(function(module){

let productionApiUrl = 'http://www.gameztracker.com';
let developmentApiUrl = 'http://localhost:9000';

module.isProduction = /^(?!localhost|127)/.test(window.location.hostname);

module.ENV = {
    apiURL: module.isProduction ? productionApiUrl : developmentApiUrl
};

})(app);