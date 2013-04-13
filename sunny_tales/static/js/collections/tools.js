ToolsCollection = Backbone.Collection.extend({
	model : Tool,
	url : '/api/v0/toolbox',

	parse : function(response) {
		if (response) {
			var listSource = new Array();
			_.each(response.elements, function(element, index, list) {
				listSource.push(new Tool(element));
			});
			return listSource;
		}
	}
});
