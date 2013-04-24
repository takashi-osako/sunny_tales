ReportComponent = Backbone.Model.extend({
    initialize : function(mode, styles) {
        var commonStyle = styles.commonStyle;
        var styleOfTool = styles.styleOfTool;
        this._css_data_store = {};
        _.map(styles, function(val, key) {
            _.each(val, function(style) {
                var list_css = style.css;
                _.each(list_css, function(css) {
                    var css_name = css.name;
                    var css_defaults = css.defaults;
                    this._css_data_store[css_name] = $.extend(true, {}, css);
                    //initialize css value
                    this.css(css_name, null);
                }, this);
            }, this);
        }, this);

        this.bind("change", function(event) {
            console.debug(event.changed);
        });
    },
    css : function(name, value) {
        // if name is undefined,
        // return list of css
        if (name === undefined) {
            return this._css_data_store;
        }
        var mycss = this._css_data_store[name];
        if (mycss) {
            // if value is undefined, return css value
            if (value === undefined) {
                return mycss["value"];
            }

            //if value is null, set default value
            if (mycss) {
                var format = mycss.format;
                if (value === null) {
                    value = mycss.defaults;
                    if (value === undefined) {
                        value = "";
                    }
                }
                if (format) {
                    mycss["value"] = sprintf(format, value);
                } else {
                    mycss["value"] = value;
                }
            }
        }
        return;
    },
    cssWithUnit : function(name) {
        var mycss = this._css_data_store[name];
        if (mycss) {
            var value = this.css(name);
            if (value) {
                var unit = mycss.unit;
                if (unit) {
                    value = value + unit;
                }
                return value;
            }
        }
        return;
    }
});
