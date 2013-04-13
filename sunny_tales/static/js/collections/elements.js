Elements = Backbone.Collection.extend({
	initialize : function(modes, options) {
		// bind "add" function to ToolBox.addElement
		this.bind("add", options.view.addElement);
	}
});
