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
