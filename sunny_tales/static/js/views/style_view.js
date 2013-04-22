StyleView = Backbone.View.extend({
    el : $("#style"),
    template : Handlebars.templates['style.template'],
    select_template : Handlebars.templates['style.select.template'],
    checkbox_template : Handlebars.templates['style.checkbox.template'],
    text_template : Handlebars.templates['style.text.template'],
    render : function(styleModel) {
        // Template the common style table first
        var template_html = this.template(styleModel.toJSON());
        var style = $("#style");
        style.append(template_html);
        var styles = styleModel.get("styles");
        _.each(styles, function(style) {

            var targetCSS = style.css;
            if (targetCSS !== undefined && targetCSS.length > 0) {
                _.each(targetCSS, function(css) {
                    var key = css.key;
                    var defaults = css.defaults;
                    var value = this.styleModel.myModel.get(key);
                    var elementId = this.styleModel.get("elementId");
                    var updatingId = this.style.id;
                    if (value) {
                        $("#style #" + elementId + " #" + updatingId).val(value);
                        //firebox bug? I could not use method data()
                        $("#style #" + elementId + " #" + updatingId).attr("data-css", key);
                    } else if (defaults) {
                        $("#style #" + elementId + " #" + updatingId).val(defaults);
                        $("#style #" + elementId + " #" + updatingId).attr("data-css", key);
                    }
                }, {
                    "styleModel" : this.styleModel,
                    "style" : style
                });
            }
        }, {
            "styleModel" : styleModel
        });

        // Template for style specific to the tool
        //data['styles'] = this.styles
        //$(this.el).append(this.template(data));

        return this;
    },
    initialize : function(styleCollection) {
        this.styleCollection = styleCollection;
        this.styleCollection.bind("add", this.render, this);
        this.styleCollection.bind("reset", this.clear, this);
        // Register all the supported styles
        Handlebars.registerPartial('style.select.template', this.select_template);
        Handlebars.registerPartial('style.checkbox.template', this.checkbox_template);
        Handlebars.registerPartial('style.text.template', this.text_template);
    },
    clear : function() {
        $("#style").empty()
    },
    events : {
        "change #style_top" : "setStyleFloat",
        "change #style_left" : "setStyleFloat",
        "change #style_width" : "setStyleFloat",
        "change #style_height" : "setStyleFloat",
        "change #style_border-width" : "setStyleFloat",
        "change #style_border-style" : "setStyleText"
    },
    setStyleFloat : function(e) {
        var myModel = this.styleCollection.at(0).myModel;
        var target_id = $(e.currentTarget).closest("table").data("target_id");
        var css = $(e.currentTarget).data('css');
        var value = $(e.currentTarget).val();
        myModel.set(css, value);
        //i = e.target.id.indexOf('_')
        //key = e.target.id.substring(i + 1, e.target.id.length)
        //this.model.set(key, parseFloat($('#' + e.target.id).val()));
    },
    setStyleText : function(e) {
        i = e.target.id.indexOf('_')
        key = e.target.id.substring(i + 1, e.target.id.length)
        this.model.set(key, $('#' + e.target.id).val());
    }
});
