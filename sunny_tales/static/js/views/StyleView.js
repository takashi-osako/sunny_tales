StyleView = Backbone.View.extend({
    el : $("#style"),
    renderStyle : function(array_style) {
        var html = "";
        _.each(array_style, function(style) {
            var input_type = 'style.' + style.input_type + '.template';
            var template = Handlebars.templates[input_type];
            var html = template(style);
            $("#style").append(html);
        });
    }
});
