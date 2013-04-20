StyleView = Backbone.View.extend({
    el : $("#style"),
    renderStyle : function(targetId, styles, commonStyle) {
        var template = Handlebars.templates['style.template'];
        data = {
            "styles" : commonStyle,
            "targetId" : targetId,
        }
        // Register all the supported styles
        Handlebars.registerPartial('style.select.template', Handlebars.templates['style.select.template']);
        Handlebars.registerPartial('style.checkbox.template', Handlebars.templates['style.checkbox.template']);
        Handlebars.registerPartial('style.text.template', Handlebars.templates['style.text.template']);
        
        // Template the common style table first
        $(this.el).html(template(data));
        
        // Template for style specific to the tool
        data['styles'] = styles
        $(this.el).append(template(data));
    }
});
