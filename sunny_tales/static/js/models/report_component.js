ReportComponent = Backbone.Model.extend({
    initialize : function(mode, styles) {
        var commonStyle = styles.commonStyle;
        var styleOfTool = styles.styleOfTool;

        this.bind("change", function(event) {
            console.debug(event.changed);
        });

        _.map(styles, function(val, key) {
            _.each(val, function(style) {
                var list_css = style.css;
                _.each(list_css, function(css) {
                    var css_name = css.name;
                    var css_defaults = css.defaults;
                    var css_data_store = $.extend(true, {}, css);
                    css_data_store["css_attribute"] = true;
                    this.set(css_name, css_data_store);
                    //initialize css value
                    this.css_set(css_name);
                }, this);
            }, this);
        }, this);
    },
    css_set : function(name, value) {
        // if value is null or undefined,
        // then set defaults
        var mycss = $.extend(true, {}, this.get(name));
        if (mycss && mycss.css_attribute) {
            if (value === null || value === undefined) {
                value = mycss.defaults;
                if (value === undefined) {
                    value = ""
                }
            }
            var format = mycss.format;
            if (format) {
                var data_type = mycss.data_type;
                if (data_type !== typeof (value)) {
                    if (data_type === "number") {
                        value = Number(value);
                    } else if (data_type === "string") {
                        value = String(value);
                    } else if (data_type === "boolean") {
                        value = Boolean(value);
                    }
                }
                mycss["value"] = sprintf(format, value);
            } else {
                mycss["value"] = value;
            }
            this.set(name, mycss);
        }
    },
    css_get : function(name) {
        var mycss = this.get(name);
        if (mycss) {
            return mycss["value"];
        }
        return;
    },
    css_all : function() {
        var attributes = [];
        _.map(this.attributes, function(value, key) {
            if (value.css_attribute) {
                this.push(key);
            }
        }, attributes)
        return attributes;
    },
    css_unit : function(name) {
        var value = this.css_get(name);
        if (value !== undefined) {
            var mycss = this.get(name);
            var unit = mycss.unit;
            if (unit) {
                value = value + unit;
            }
        }
        return value;
    }
});
