SaveTemplateView = Backbone.View.extend({
    el : $('#menu'),
    initialize : function(collection_components) {
        this.components = collection_components
    },
    events : {
        "click #save-template" : "saveTemplate",
    },
    saveTemplate : function() {
        jsonTemplate = JSON.stringify(this.components);
        //call RESTFul to store jsonTemplate
        this.components.sync('create', this.components, {
            success : function() {
            },
            error : function() {
            }
        });
    }
});
