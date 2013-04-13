/*
 * This is main function for template editor
 */

// Need some help on using this :(
requirejs.config({
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
            exports: "layout",
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

requirejs(['jqueryui', 'jqueryLayout', 'underscore', 'backbone', 'collections/tools', 'views/toolbox', 'views/canvas'], function($, layout, _, Backbone, Tool, ToolBoxs, Canvass) {
    // display layouts
    $('body').layout({
        applyDefaultStyles : true
    });
    var tools = new ToolsCollection;
    var components = new ReportComponentsCollection;
    // render toolbox view
    var toolboxView = new ToolBoxView(tools);
    toolboxView.loadElementData(data);
    var canvasView = new CanvasView(tools, components);
    var saveTemplateView = new SaveTemplateView(components)
});

//this is mock data
    //TODO: refactor, read data from RESTful.
    var data = [{
        "name" : "Static Text",
        "type" : "STATIC_TEXT",
        "html" : "<div class='ui-widget-content resizable draggable'>This is static text and click me</div>",
        "resizable" : true,
        "style" : [{
            "name" : "font face",
            "input_type" : "string",
            "editable" : false,
            "selection" : ["arial", "courier"],
            "css" : "font-family: %s;",
            "defaultss" : "courier"
        }, {
            "name" : "font size",
            "input_type" : "int",
            "editable" : true,
            "selection" : [6, 7, 8, 9, 10, 11, 12, 13, 14],
            "css" : "font-size: %dpt;",
            "defaults" : 12,
            "html" : "<input type='text'>"
        }, {
            "name" : "Italic",
            "input_type" : "bool",
            "editable" : true,
            "css" : "font-style:italic;",
            "defaults" : false
        }, {
            "name" : "Bold",
            "intput_type" : "bool",
            "editable" : true,
            "css" : "font-weight: bold;",
            "defaults" : false
        }, {
            "name" : "Underline",
            "input_type" : "bool",
            "editable" : true,
            "css" : "text-decoration:underline;",
            "defaults" : false
        }, {
            "name" : "text-align",
            "input_type" : "string",
            "editable" : false,
            "selection" : ["right", "center", "left", "justify"],
            "css" : "text-align:%s;",
            "defaults" : "left"
        }, {
            "name" : "text",
            "input_type" : "string",
            "editable" : true,
            "html" : "<textarea/>"
        }]
    }, {
        "name" : "Variable Text",
        "type" : "VARIABLE_TEXT",
        "html" : "<div class='ui-widget-content resizable draggable'>This is variable text and click me</div>",
        "resizable" : true,
        "style" : [{
            "name" : "font face",
            "input_type" : "string",
            "editable" : false,
            "selection" : ["arial", "courier"],
            "css" : "font-family: %s;",
            "defaults" : "courier"
        }, {
            "name" : "font size",
            "input_type" : "int",
            "editable" : true,
            "selection" : [6, 7, 8, 9, 10, 11, 12, 13, 14],
            "css" : "font-size: %dpt;",
            "defaults" : 12
        }, {
            "name" : "Italic",
            "input_type" : "bool",
            "editable" : true,
            "css" : "font-style:italic;",
            "defaults" : false
        }, {
            "name" : "Bold,",
            "intput_type" : "bool",
            "editable" : true,
            "css" : "font-weight: bold;",
            "defaults" : false
        }, {
            "name" : "Underline",
            "input_type" : "bool",
            "editable" : true,
            "css" : "text-decoration:underline;",
            "defaults" : false
        }, {
            "name" : "text-align",
            "input_type" : "string",
            "editable" : false,
            "selection" : ["right", "center", "left", "justify"],
            "css" : "text-align:%s;",
            "defaults" : "left"
        }]
    }, {
        "name" : "line",
        "type" : "LINE",
        "html" : "<div><hr/></div>",
        "resizable" : false,
        "style" : [{
            "name" : "line style",
            "input_type" : "string",
            "editable" : false,
            "selection" : ["solid", "dotted", "dashed"],
            "defaults" : "solid",
            "css" : "border-bottom-style:%s;"
        }, {
            "name" : "height",
            "input_type" : "int",
            "editable" : true,
            "defaults" : 1,
            "css" : "border-bottom-width:%dpx;"
        }, {
            "name" : "color",
            "input_type" : "string",
            "editable" : true,
            "defaults" : "#000000",
            "css" : "border-bottom-color:%s;"
        }]
    }, {
        "name" : "image",
        "type" : "IMAGE",
        "html" : "<div class='ui-widget-content resizable draggable'>where is an image, eh?</div>",
        "resizable" : true,
        "style" : [{
            "name" : "location",
            "input_type" : "string",
            "editable" : true,
            "defaults" : "../png/glyphicons_194_circle_question_mark.png",
            "css" : "background-image:url(%s);background-repeat:no-repeat;"
        }]
    }]
