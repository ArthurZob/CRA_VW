// Configure the AMD module loader
require.config({

	// The path where your JavaScripts are located
	baseUrl: './js/',

	// Specify the paths of vendor libraries
	paths: {
		'jquery': 'vendor/jquery/jquery-1.10.2',
		'pubsub': 'vendor/jquery/jquery.ba-tiny-pubsub.min',
		'underscore': 'vendor/underscore/underscore-1.5.1',
		'backbone': 'vendor/backbone/backbone-1.0.0',
		'handlebars': 'vendor/handlebars/handlebars-1.0.0',
		'text': 'vendor/requirejs/text',
		'html5preloader': 'vendor/html5preloader/html5-preloader-0.60'
	},

	// Underscore and Backbone are not AMD-capable per default,
	// so we need to use the AMD wrapping of RequireJS
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		pubsub: {
			deps: ['jquery']
		},
		handlebars: {
			exports: 'Handlebars'
		}
	}

});

// Bootstrap the application
require([
	'backbone',
	'./core',
	'pubsub',
	'html5preloader',
	'handlebars',
	'localization/Localization'
], function(Backbone, Core, PubSub, Html5Preloader, Handlebars, Localization) {

	Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

	    switch (operator) {
	        case '==':
	            return (v1 == v2) ? options.fn(this) : options.inverse(this);
	        case '===':
	            return (v1 === v2) ? options.fn(this) : options.inverse(this);
	        case '<':
	            return (v1 < v2) ? options.fn(this) : options.inverse(this);
	        case '<=':
	            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
	        case '>':
	            return (v1 > v2) ? options.fn(this) : options.inverse(this);
	        case '>=':
	            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
	        default:
	            return options.inverse(this);
	    }
	});

	new Core;
});