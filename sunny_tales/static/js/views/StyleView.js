StyleView = Backbone.View.extend({
    el : $("#style"),
    renderStyle : function(target_id, array_style) {
        var template = Handlebars.templates['style.template'];
        data = {
            "styles" : array_style,
            "target_id" : target_id
        }
        // Register all the supported styles
        Handlebars.registerPartial('style.select.template', Handlebars.templates['style.select.template'])
        Handlebars.registerPartial('style.checkbox.template', Handlebars.templates['style.checkbox.template'])
        Handlebars.registerPartial('style.text.template', Handlebars.templates['style.text.template'])

        $(this.el).html(template(data));
    }
});
