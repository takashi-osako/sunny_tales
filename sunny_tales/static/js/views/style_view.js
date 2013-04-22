StyleView = Backbone.View.extend({

    el : $("#style"),
    render : function(styleModel) {

        // Template the common style table first
        var template_html = Handlebars.templates['style.template'](styleModel.toJSON());
        var style = $("#style");
        $("#style").append(template_html);
        var styles = styleModel.get("styles");
        _.each(styles, function(style) {

            var targetCSS = style.css;
            if (targetCSS !== undefined) {
                var styleName = targetCSS.split(":")[0];
                var targetId = this.styleModel.get("targetId");
                var cssUnit = $("#" + targetId).cssUnit(styleName);
                var elementId = this.styleModel.get("elementId");
                var updatingId = style.id;
                if (cssUnit && cssUnit.length > 0) {
                    var cssValue = cssUnit[0];
                    if (cssUnit[1] === "px") {
                        cssValue = cssValue * 0.75;
                    }
                    $("#style #" + elementId + " #" + updatingId).val(cssValue);
                }
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
        this.styleCollection.bind("add", this.render);
        this.styleCollection.bind("reset", this.clear);
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
        i = e.target.id.indexOf('_')
        key = e.target.id.substring(i + 1, e.target.id.length)
        this.model.set(key, parseFloat($('#' + e.target.id).val()));
    },
    setStyleText : function(e) {
        i = e.target.id.indexOf('_')
        key = e.target.id.substring(i + 1, e.target.id.length)
        this.model.set(key, $('#' + e.target.id).val());
    }
});
