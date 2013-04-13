Canvas = Backbone.View.extend({
	el : $("#canvas"),
	initialize : function(collection_tools) {
		this.components = new ReportComponents;
		$("#canvas").droppable({
			activeClass : "ui-state-default",
			hoverClass : "ui-state-hover",
			drop : function(event, ui) {
				var component_id = ui.draggable.attr("id");
				var tool = collection_tools.get(component_id);
				var new_component = new ReportComponent;
			}
		});
	},
	addComponent : function(model_component) {

	}
});
