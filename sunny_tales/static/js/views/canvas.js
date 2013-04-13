Canvas = Backbone.View.extend({
	el : $("#canvas"),
	initialize : function(collection_tools) {
		this.components = new ReportComponents;
		var _components = this.components;
		this.components.bind("add", this.addReportComponent)
		$("#canvas").droppable({
			activeClass : "ui-state-default",
			hoverClass : "ui-state-hover",
			drop : function(event, ui) {
				var component_id = ui.draggable.attr("id");
				//get tool by id(type)
				var tool = collection_tools.get(component_id);
				var new_component = new ReportComponent(null, tool);
				_components.add(new_component);
			}
		});
	},
	addReportComponent : function(model_report_component) {
		//rerender canvas when new tool is dragged from toolbox layout
		new_component = $(model_report_component.get("html"));
		new_component.attr("id", model_report_component.cid);
		new_component.appendTo($("#canvas"));
	}
});
