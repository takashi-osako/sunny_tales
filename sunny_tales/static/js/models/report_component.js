ReportComponent = Backbone.Model.extend({
    initialize : function(mode, styles) {
        var commonStyle = styles.commonStyle;
        var styleOfTool = styles.styleOfTool;
        //TODO: refactor this. read from css array and populate dynamically
        _.map(styles, function(val, key) {
            _.each(val, function(style) {
                var list_css = style.css;
                _.each(list_css, function(css) {
                    var css_name = css.key;
                    var css_defaults = css.defaults;
                    if (css_defaults !== undefined) {
                        this.set(css_name, css_defaults);
                    }
                }, this);
            }, this);
        }, this);

        this.bind("change", function(event) {
            console.debug(event.changed);
        });
    }
});
