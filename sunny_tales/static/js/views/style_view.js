StyleView = Backbone.View.extend({
    el : $("#style"),
    template : Handlebars.templates['style.template'],
    select_template : Handlebars.templates['style.select.template'],
    checkbox_template : Handlebars.templates['style.checkbox.template'],
    text_template : Handlebars.templates['style.text.template'],
    render : function(b_styleModel) {
        // Template
        var template_html = this.template(b_styleModel.toJSON());
        var j_style = $("#style");
        j_style.append(template_html);
        var b_styles = b_styleModel.get("styles");
        _.each(b_styles, function(b_style) {

            var targetCSS = b_style.css;
            if (targetCSS !== undefined && targetCSS.length > 0) {
                _.each(targetCSS, function(css) {
                    var css_name = css.name;
                    var defaults = css.defaults;
                    var value = this.b_styleModel.b_myModel.css(css_name);
                    var elementId = this.b_styleModel.get("elementId");
                    var updatingId = this.b_style.id;
                    if (value) {
                        $("#style #" + elementId + " #" + updatingId).val(value);
                        //firebox bug? I could not use method data()
                        $("#style #" + elementId + " #" + updatingId).attr("data-css-name", css_name);
                    } else if (defaults) {
                        $("#style #" + elementId + " #" + updatingId).val(defaults);
                        $("#style #" + elementId + " #" + updatingId).attr("data-css-name", css_name);
                    }
                }, {
                    "b_styleModel" : this.b_styleModel,
                    "b_style" : b_style
                });
            }
        }, {
            "b_styleModel" : b_styleModel
        });

        // Set the textbox value if we have a textbox
        if ($(this.el).find("#text").length) {
            $(this.el).find("#text").val(b_styleModel.b_myModel.get("value"));
        }
        return this;
    },
    initialize : function(b_styleCollection) {
        this.b_styleCollection = b_styleCollection;
        this.b_styleCollection.bind("add", this.render, this);
        this.b_styleCollection.bind("reset", this.clear, this);
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
        "change #underline" : "setStyle",
        "change #bold" : "setStyle",
        "change #italic" : "setStyle",
        "change #text_align" : "setStyle"
    },
    setStyle : function(e) {
        var b_myModel = this.b_styleCollection.at(0).b_myModel;
        var target_id = $(e.currentTarget).closest("table").data("target_id");
        var css_name = $(e.currentTarget).data('css-name');
        var value = $(e.currentTarget).val();
        b_myModel.set(css_name, value);
    },
    setTextValue : function(e) {
        var b_myModel = this.b_styleCollection.at(0).b_myModel;
        var newValue = $(e.currentTarget).val();
        b_myModel.set("value", $(e.currentTarget).val());

        // Do we even care what is the value of html
        // This is not necessary but it's good to see the value is consistent
        j_html = $(b_myModel.get("html"));
        $(j_html).find('#value').text(newValue);
        modifiedHtml = $('<div>').append($(j_html).clone()).html();
        b_myModel.set("html", modifiedHtml);

        // Sets the new text
        $('#' + b_myModel.cid + ' #value').text(newValue);
    }
});
