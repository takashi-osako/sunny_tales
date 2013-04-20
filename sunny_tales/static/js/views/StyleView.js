StyleView = Backbone.View.extend({
    el : $("#style"),
    renderStyle : function(target_id, array_style) {
        var html_element = $(this.el);
        html_element.empty();
        var table=$("<table class='table'></table>");
        table.data("target_id", target_id);
        table.append("<tr><td>Property</td><td>Value</td></tr>");
        _.each(array_style, function(style) {
            var input_type = 'style.' + style.input_type + '.template';
            var template = Handlebars.templates[input_type];
            var html = template(style);
            var row = $("<tr><td>" + style.name + "</td><td>" + html + "</td><tr>");
            this.append(row);
        }, table);
        html_element.append(table);
    }
});
