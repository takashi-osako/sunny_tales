define(['underscore', 'backbone'], function(_, Backbone) {
    Tool = Backbone.Model.extend({
        defaults : {
            name : 'element name',
            type : 'element_type',
            html : '<div/>',
            resizable : false,
            style : []
        },
        //use "type" as Tool's id
        idAttribute : "type"
    });
});
