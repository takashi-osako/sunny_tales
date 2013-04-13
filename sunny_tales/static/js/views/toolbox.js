/*
 * View for ToolBox Layout
 */
ToolBox = Backbone.View.extend({
	el : $('#toolbox'),
	initialize : function() {
		//initialize with Elements Collections
		//pass this toolbox referent to Elements Collection
		//so, when new Element Model is added to the collection,
		//the collection will call "addElement" to render new Element on the view.
		this.elements = new Elements(null, {
			view : this
		});
	},
	loadElementData: function(data) {
		// Element Data Loader
		// Each Element is added to Elements Collection.
		_.each(data, function(data_element){
			var element = new Element(data_element);
			//this.add (aka elements.add) is binded to addElement
			this.add(element);
		},this.elements);
	},
	addElement : function(model_element) {
		$("#toolbox").append("<p>" + model_element.get("name") + "</p>");
	}
});
