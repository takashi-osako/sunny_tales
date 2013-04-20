StyleView = Backbone.View.extend({
    el : $("#style"),
    renderStyle : function(target_id, array_style) {
        var template = Handlebars.templates['style.template'];
        data = {
            "styles" : array_style,
            "target_id" : target_id
        }
        $(this.el).html(template(data));
    }
});
