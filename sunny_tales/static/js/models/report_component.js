ReportComponent = Backbone.Model.extend({
    initialize : function(mode, tool) {
        this.set("value", tool.get("value"));
        this.set("height", 50);
        this.set("width", 150);
        this.set("top", 0);
        this.set("left", 0);
        this.set("border-style", "solid");
        this.set("border-width", 1);
        this.set("type", tool.get("type"));
        this.bind("change", function(event) {
            console.debug(event.changed);
        });
    }
});
