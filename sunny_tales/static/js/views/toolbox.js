/*
 * View for ToolBox Layout
 */
ToolBox = Backbone.View.extend({
	el : $('#toolbox'),
	initialize : function(collection_tools) {
		//initialize with Elements Collections
		//pass this toolbox referent to Elements Collection
		//so, when new Element Model is added to the collection,
		//the collection will call "addElement" to render new Element on the view.
		this.tools = collection_tools;
		this.tools.bind("add", this.addTool)
	},
	loadElementData : function(data) {
		// Element Data Loader
		// Each Element is added to Elements Collection.
		_.each(data, function(data_tool) {
			var tool = new Tool(data_tool);
			//this.add (aka elements.add) is binded to addElement
			this.add(tool);
		}, this.tools);
	},
	addTool : function(model_tool) {
		var new_tool = $("<div/>")
		new_tool.attr("id", model_tool.get("type"));
		new_tool.html(model_tool.get("name"));
		$("#toolbox").append(new_tool);
		new_tool.draggable({
			appendTo : "body",
			helper : "clone"
		});
		new_tool.css('cursor', 'move');
	}
});
