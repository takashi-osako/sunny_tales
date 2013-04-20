StyleView = Backbone.View.extend({
    el : $("#style"),
    renderStyle : function(array_style) {
        var html_element = $(this.el);
        html_element.empty();
        html_element.html("<table class='table'></table>");
        html_element.append("<tr><td>Property</td><td>Value</td></tr>");
        _.each(array_style, function(style) {
            var input_type = 'style.' + style.input_type + '.template';
            var template = Handlebars.templates[input_type];
            var html = template(style);
            var line = "<tr><td>"+style.name+"</td><td>"+html+"</td><tr>";
            this.append(line);
        }, html_element);
    }
});
