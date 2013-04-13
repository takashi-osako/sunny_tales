define(['underscore', 'backbone'], function(_, Backbone) {
    Style = Backbone.Model.extend({
        defaults : {
            name : "",
            input_type : "",
            editable : false,
            selection : [],
            css : "",
            defaults : "",
            html : ""
        }
    });
}); 