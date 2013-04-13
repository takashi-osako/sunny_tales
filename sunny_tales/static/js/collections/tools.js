ToolsCollection = Backbone.Collection.extend({
    model : Tool,
    url : '/api/v0/toolbox',

    parse : function(response) {
        if (response) {
            var listSource = new Array();
            _.each(response.elements, function(element, index, list) {
                listSource.push(new Tool({
                    "name": element.name,
                    "html": element.html,
                    "type": element.type,
                    "resizable": element.reizable,
                    "style": element.style
                }));
            });
            return listSource;
        }
    }
});
