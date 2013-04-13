var ToolBox = Backbone.View.extend({
	el : $('#toolbox'),
	initialize : function() {
		this.elements = new Elements(null, {
			view : this
		});
	},
	loadData: function(data) {
		_.each(data, function(data_element){
			var element = new Element(data_element);
			this.add(element);
		},this.elements);
	},
	addElement : function(model_element) {
		$("#toolbox").append("<p>" + model_element.get("name") + "</p>");
	}
});
