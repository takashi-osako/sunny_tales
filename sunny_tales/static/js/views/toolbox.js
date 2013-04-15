define([
	"jquery", 
	"underscore", 
	"backbone",
	"collections/tools",
	"views/canvas",
	"models/template"
], function($, _, Backbone, Tools, CanvasView, template) {
	/*
	 * View for ToolBox Layout
	 */
	ToolBoxView = Backbone.View.extend({
		el : $('#toolbox'),

		render: function () {
			var tools = new Tools();
			var that = this;
			tools.fetch({
				success : function (data) {

	                 $.each(data.toJSON(), function (i, model) {
	                 	var new_tool = $("<div/>")
						new_tool.attr("id", model.type);
						new_tool.html(model.name);
						$("#toolbox").append(new_tool);
						new_tool.draggable({
							appendTo : "body",
							helper : "clone"
						});
						new_tool.css('cursor', 'move');
	                 });


					var canvasView = new CanvasView(tools, template);
           		 }
			})
		}
	});

	return ToolBoxView;
});
