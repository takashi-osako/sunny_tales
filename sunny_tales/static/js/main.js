require({
	paths: {
		jquery: '3p/jquery-1.9.1.min',
		jqueryUI: '3p/jquery-ui.min',
		jqueryLayout: '3p/jquery.layout-latest.min',
		bootstrap: '3p/bootstrap.min',
		backbone: '3p/backbone',
		underscore: '3p/underscore',
		text: '3p/text',
		mustache: '3p/mustache'
	},
	shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'bootstrap': {
        	deps: ['jquery'],
            exports: 'bootstrap'
        },
        'jqueryUI': {
        	deps: ['jquery'],
            exports: 'jqueryUI'
        },
        'jqueryLayout': {
        	deps: ['jquery', 'jqueryUI'],
            exports: 'jqueryLayout'
        },
        'mustache': {
            exports: 'mustache'
        }
   }
});


require([
  'application'
], function (App) {
  App.initialize();
});