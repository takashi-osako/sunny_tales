TemplateModel = Backbone.Model.extend({
	url : function() {
		var url = '/api/v0/templates/';
		return this.isNew() ? url : url + this.id;
	},
	initialize : function() {
		this.set("components", new ReportComponentsCollection)
	},
	idAttribute : "_id",
	components : null,
	parse : function(response, xhr) {
		if (response) {
			if (this.isNew()) {
				this.set("_id", response)
			}
			return {};
		}
	}
})