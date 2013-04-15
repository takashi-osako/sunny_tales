Tool = Backbone.Model.extend({
	defaults : {
		name : 'element name',
		type : 'element_type',
		value : '',
		resizable : false,
		style : []
	},
	//use "type" as Tool's id
	idAttribute: "type"
});
