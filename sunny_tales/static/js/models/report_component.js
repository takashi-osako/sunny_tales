define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    ReportComponent = Backbone.Model.extend({
        initialize : function(mode, tool) {
            this.set("tool", tool);
            this.set("html", tool.get("html"));
            this.set("top", 0);
            this.set("left", 0);
        },
        top : null,
        left : null,
        tool : null,
        html : null
    });
});
