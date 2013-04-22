Tool = Backbone.Model.extend({
    defaults : {
        name : 'element name',
        type : 'element_type',
        value : '',
        resizable : false,
        style : []
    },
    //use "type" as Tool's id
    idAttribute : "type",
    initialize : function() {
        // Mustache is easier than handlebar for simple tasks
        var data = {value : this.get("value")};
        var html = Mustache.render(this.get("html"), data);
        this.set("html", html);
    }
});
