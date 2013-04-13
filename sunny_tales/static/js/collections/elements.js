Elements = Backbone.Collection.extend({
	initialize : function(modes, options) {
		this.bind("add", options.view.addElement);
	}
});
