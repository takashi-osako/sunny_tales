define([
	"jquery", 
	"underscore", 
	"backbone", 
	"mustache",
	"jqueryUI", 
	"jqueryLayout",
	"models/tool",
	"collections/tools"
], function($, _, Backbone, mustache, jqueryUI, jqueryLayout, Tool, Tools) {
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
	return ReportComponent;
});
