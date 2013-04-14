CanvasView = Backbone.View.extend({
	el : $("#canvas"),
	initialize : function(model_toolMenu, collection_components) {
		this.components = collection_components;
		var _components = this.components;
		this.components.bind("add", this.renderCanvas)
		$("#canvas").droppable({
			activeClass : "ui-state-default",
			hoverClass : "ui-state-hover",
			drop : function(event, ui) {
				var component_id = ui.draggable.attr("id");
				//check if dragged component is already created and saved in collection of components
				var existing_component = _components.get(component_id);
				if (existing_component === undefined) {
					//a user is dragged from tools layout.
					//create new component for the canvas
					//get tool by id(type)
					var tool = model_toolMenu.get("tools").get(component_id);
					//set component position by mouse position
					var new_component = new ReportComponent(null, tool);
					new_component.set("top", event.pageY - this.offsetTop);
					new_component.set("left", event.pageX - this.offsetLeft);
					//add to component collections.
					//also renderCanvas will be called.
					_components.add(new_component);
				} else {
					// this component has already created.
					//make it draggable again
					$(component_id).draggable();
				}
			}
		});
	},
	renderCanvas : function(model_report_component) {
		//rerender canvas when new tool is dragged from toolbox layout
		new_component = $(model_report_component.get("html"));
		new_component.attr("id", model_report_component.cid);
		new_component.css("top", (model_report_component.get("top") + "px"));
		new_component.css("left", model_report_component.get("left") + "px");
		new_component.css("position", "absolute");
		new_component.draggable();
		new_component.appendTo($("#canvas"));
	}
});
