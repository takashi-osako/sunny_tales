ReportComponent = Backbone.Model.extend({
	initialize : function(mode, tool) {
		this.set("tool", tool);
		this.set("value", $(tool.get("html")).html());
		this.set("height", 50);
		this.set("width", 150);
		this.set("top", 0);
		this.set("left", 0);
		this.set("type", tool.get("type"))
	}
});
