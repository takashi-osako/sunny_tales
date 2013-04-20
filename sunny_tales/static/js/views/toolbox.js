/*
 * View for ToolBox Layout
 */
ToolBoxView = Backbone.View.extend({
    el : $('#toolbox'),
    initialize : function(model_toolMenu) {
        //initialize with Elements Collections
        //pass this toolbox referent to Elements Collection
        //so, when new Element Model is added to the collection,
        //the collection will call "addElement" to render new Element on the view.
        this.toolMenuModel = model_toolMenu
        this.toolMenuModel.get("tools").bind("add", this.addTool, this);
        // read from API
        this.toolMenuModel.fetch({
            success : function(model, response, options) {
                console.log(response)
            }
        });

    },
    loadElementData : function(data) {
        // Element Data Loader
        // Each Element is added to Elements Collection.
        _.each(data, function(data_tool) {
            var tool = new Tool(data_tool);
            //this.add (aka elements.add) is binded to addElement
            this.add(tool);
        }, this.toolMenuModel.get("tools"));
    },
    addTool : function(model_tool) {
        var template = Handlebars.templates['toolbox.template'];
        $(this.el).append(template(model_tool.attributes));
        $(".ui-draggable").draggable({
            appendTo : "body",
            helper : "clone"
        });
        // TODO: move css part into .css (look at toolbox.template)
    }
});
