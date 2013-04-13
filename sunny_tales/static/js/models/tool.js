Tool = Backbone.Model.extend({
	defaults : {
		name : 'element name',
		type : 'element_type',
		html : '<div/>',
		resizable : false,
		style : []
	},
	idAttribute: "type"
});
