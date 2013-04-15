define([
	"jquery", 
	"underscore", 
	"backbone",
	"models/tool"
], function($, _, Backbone, Tool) {
	Tools = Backbone.Collection.extend({
		model: Tool,
		url: "/api/v0/toolbox",
	    parse: function (response) {
	        return response.elements;
	    }
	});

	return Tools;
});