StyleView = Backbone.View.extend({
    el : $("#style"),
    template : Handlebars.templates['style.template'],
    select_template : Handlebars.templates['style.select.template'],
    checkbox_template : Handlebars.templates['style.checkbox.template'],
    text_template : Handlebars.templates['style.text.template'],
    render : function(styleModel) {
        // Template
        var template_html = this.template(styleModel.toJSON());
        var style = $("#style");
        style.append(template_html);
        var styles = styleModel.get("styles");
        _.each(styles, function(style) {

            var targetCSS = style.css;
            if (targetCSS !== undefined && targetCSS.length > 0) {
                _.each(targetCSS, function(css) {
                    var css_name = css.name;
                    var defaults = css.defaults;
                    var value = this.styleModel.myModel.css(css_name);
                    var elementId = this.styleModel.get("elementId");
                    var updatingId = this.style.id;
                    if (value) {
                        $("#style #" + elementId + " #" + updatingId).val(value);
                        //firebox bug? I could not use method data()
                        $("#style #" + elementId + " #" + updatingId).attr("data-css-name", css_name);
                    } else if (defaults) {
                        $("#style #" + elementId + " #" + updatingId).val(defaults);
                        $("#style #" + elementId + " #" + updatingId).attr("data-css-name", css_name);
                    }
                }, {
                    "styleModel" : this.styleModel,
                    "style" : style
                });
            }
        }, {
            "styleModel" : styleModel
        });

        // Set the textbox value if we have a textbox
        if ($(this.el).find("#text").length) {
            $(this.el).find("#text").val(styleModel.myModel.get("value"));
        }
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
        "change #text" : "setTextValue",
        "change #style_top" : "setStyle",
        "change #style_left" : "setStyle",
        "change #style_width" : "setStyle",
        "change #style_height" : "setStyle",
        "change #style_border-width" : "setStyle",
        "change #style_border-style" : "setStyle",
        "change #font_family" : "setStyle",
        "change #font_size" : "setStyle",
        "change #text_align" : "setStyle",
        "change #underline": "setStyle",
        "change #bold": "setStyle",
        "change #italic": "setStyle",
        "change #text_align": "setStyle"
    },
    setStyle : function(e) {
        var myModel = this.styleCollection.at(0).myModel;
        var target_id = $(e.currentTarget).closest("table").data("target_id");
        var css_name = $(e.currentTarget).data('css-name');
        var value = $(e.currentTarget).val();
        myModel.set(css_name, value);
    },
    setTextValue : function(e) {
        var myModel = this.styleCollection.at(0).myModel;
        var newValue = $(e.currentTarget).val();
        myModel.set("value", $(e.currentTarget).val());

        // Do we even care what is the value of html
        // This is not necessary but it's good to see the value is consistent
        html = $(myModel.get("html"));
        $(html).find('#value').text(newValue);
        modifiedHtml = $('<div>').append($(html).clone()).html();
        myModel.set("html", modifiedHtml);

        // Sets the new text
        $('#' + myModel.cid + ' #value').text(newValue);
    }
});
