/*
 * View for ToolBox Layout
 */
ToolBox = Backbone.View.extend({
	el : $('#toolbox'),
	initialize : function(collection_elements) {
		//initialize with Elements Collections
		//pass this toolbox referent to Elements Collection
		//so, when new Element Model is added to the collection,
		//the collection will call "addElement" to render new Element on the view.
		this.elements = collection_elements;
		this.elements.bind("add", this.addElement)
	},
	loadElementData : function(data) {
		// Element Data Loader
		// Each Element is added to Elements Collection.
		_.each(data, function(data_element) {
			var element = new Element(data_element);
			//this.add (aka elements.add) is binded to addElement
			this.add(element);
		}, this.elements);
	},
	addElement : function(model_element) {
		var new_element = $("<div/>")
		new_element.attr("id", model_element.get("type"));
		new_element.html(model_element.get("name"));
		$("#toolbox").append(new_element);
		new_element.draggable({
			appendTo : "body",
			helper : "clone"
		});
		new_element.css('cursor', 'move');
	}
});
