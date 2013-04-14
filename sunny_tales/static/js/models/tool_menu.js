ToolMenuModel = Backbone.Model.extend({
	initialize : function() {
		this.set("tools", new ToolsCollection)
	},
	tools : null,
	url : '/api/v0/toolbox',
	idAttribute: "_id",
	parse : function(response) {
		if (response) {
			var listSource = this.get("tools");
			_.each(response.elements, function(element, index, list) {
				listSource.add(new Tool(element));
			});
			return listSource;
		}
	}
})
