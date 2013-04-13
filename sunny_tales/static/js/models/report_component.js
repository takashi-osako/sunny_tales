ReportComponent = Backbone.Model.extend({
	initialize: function(tool) {
		this.tool=tool;
		this.set("html",tool.get("html"))
	},
	top: 0,
	left: 0,
	tool: null,
	html: null
});
