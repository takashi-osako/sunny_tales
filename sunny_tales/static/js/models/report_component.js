ReportComponent = Backbone.Model.extend({
    initialize : function(mode, styles) {
        var commonStyle = styles.commonStyle;
        var styleOfTool = styles.styleOfTool;
        this._css_data_store = {};

        this.bind("change", function(event) {
            console.debug(event.changed);
        });

        _.map(styles, function(val, key) {
            _.each(val, function(style) {
                var list_css = style.css;
                _.each(list_css, function(css) {
                    var css_name = css.name;
                    var css_defaults = css.defaults;
                    this._css_data_store[css_name] = $.extend(true, {}, css);
                    //initialize css value
                    this.css_set(css_name);
                }, this);
            }, this);
        }, this);
    },
    css_set : function(name, value) {
        // if value is null or undefined,
        // then set defaults
        var mycss = this._css_data_store[name];
        if (mycss) {
            if (value === null || value === undefined) {
                value = mycss.defaults;
                if (value === undefined) {
                    value = ""
                }
            }
            var format = mycss.format;
            if (format) {
                if (mycss.data_type == "int") 
                    value = parseInt(value)
                value = sprintf(format, value);
            }
            var unit = mycss.unit;
            var with_unit = value;
            if (unit) {
                with_unit = with_unit + unit;
            }
            mycss["value"] = value
            this.set(name, with_unit)
        }
    },
    css_get : function(name) {
        var mycss = this._css_data_store[name];
        if (mycss) {
            return mycss["value"];
        }
        return;
    },
    css_all : function() {
        return $.extend(true, {}, this._css_data_store)
    },
    css_unit : function(name) {
        var value = this.css_get(name);
        if (value !== undefined) {
            var mycss = this._css_data_store[name];
            var unit = mycss.unit;
            if (unit) {
                value = value + unit;
            }
        }
        return value;
    }
});
