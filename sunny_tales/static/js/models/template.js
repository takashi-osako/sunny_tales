TemplateModel = Backbone.Model.extend({
    url : function() {
        var url = '/api/v0/templates';
        return this.isNew() ? url : url + "/" + this.id;
    },
    initialize : function() {
        this.set("components", new ReportComponentsCollection)
    },
    idAttribute : "_id",
    components : null,
    parse : function(response, xhr) {
        if (response) {
            return response;
        }
    },
    toJSON : function(options) {
        var attr = $.extend(true, {}, this.attributes);
        var components = attr.components;
        var keep_list = ["name", "value", "unit"];
        _.each(components.models, function(model) {
            _.each(model.attributes, function(css_component, key) {
                if (css_component.attribute === "css") {
                    // keep only "name", "value", and "unit"
                    model.attributes[key] = _.pick(css_component, this.keep_list);
                } else {
                    model.attributes[key] = css_component;
                }
            }, this);
        }, {
            "keep_list" : keep_list,
        });
        return attr;
    }
})
