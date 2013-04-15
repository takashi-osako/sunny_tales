define([
    "jquery", 
    "underscore", 
    "backbone", 
    "mustache",
    "jqueryUI", 
    "jqueryLayout",
    "models/tool",
    "models/tool_menu",
    "models/template",
    "models/report_component",
    "models/style",
    "collections/report_components",
    "collections/tools",
    "views/toolbox",
    "views/canvas"
], function($, _, Backbone, mustache, jqueryUI, jqueryLayout, ToolModel, TemplateModel, reportComponentModel, Tools, ToolBoxView, CanvasView ) {
    SaveTemplateView = Backbone.View.extend({
        el : $('#menu'),
        initialize : function(model_template) {
            this.template = model_template
        },
        events : {
            "click #save-template" : "saveTemplate",
        },
        saveTemplate : function() {
            //call RESTFul to store jsonTemplate
            this.template.save();
        }
    });

    return SaveTemplateView;
});
