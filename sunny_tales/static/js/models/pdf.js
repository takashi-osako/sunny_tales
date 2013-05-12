PdfModel = Backbone.Model.extend({
    url : function() {
        var url = '/api/v0/createpdf';
        return url + "/" + this.id;
    },
    initialize : function() {
    },
    idAttribute : "_id",
    components : null,
    parse : function(response, xhr) {
        if (response) {
            return response;
        }
    }
});
