require({
    paths : {
        jquery : '3p/jquery-1.9.1.min',
        jqueryui : '3p/jquery-ui.min',
        jqueryLayout : '3p/jquery.layout-latest.min',
        bootstrap : '3p/bootstrap.min',
        backbone : '3p/backbone-min',
        mustache : '3p/mustache',
        underscore : '3p/underscore-min',
        templates : '../templates',
        application : 'application',

        // Collections
        reportComponentsCollection : 'collections/report_components',
        toolsCollection : 'collections/tools',

        // Models
        reportComponentsModel : 'models/report_components',
        styleModel : 'models/style',
        toolModel : 'models/tool',

        // Views
        canvasView : 'views/canvas',
        toolboxView : 'views/toolbox'
    },
    shim : {
        jqueryLayout : {
            deps : ['jqueryui']
        },
        jqueryui : {
            exports : "$",
            deps : ['jquery']
        },
        underscore : {
            exports : "_"
        },
        backbone : {
            exports : "Backbone",
            deps : ["underscore", "jquery"]
        },
        bootstrap : ['jquery']
    }
});

// require(['application'], function(App) {
    // App.initialize();
// }); 

