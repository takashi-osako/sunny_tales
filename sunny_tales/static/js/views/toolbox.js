/*
 * View for ToolBox Layout
 */
ToolBoxView = Backbone.View.extend({
    el : $('#toolbox'),
    template : Handlebars.templates['toolbox.template'],
    initialize : function(b_model_toolMenu) {
        //initialize with Elements Collections
        //pass this toolbox referent to Elements Collection
        //so, when new Element Model is added to the collection,
        //the collection will call "addElement" to render new Element on the view.
        this.b_toolMenuModel = b_model_toolMenu
        this.b_toolMenuModel.get("tools").bind("add", this.addTool, this);
        // read from API
        this.b_toolMenuModel.fetch({
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
        }, this.b_toolMenuModel.get("tools"));
    },
    addTool : function(b_model_tool) {
        $(this.el).append(this.template(b_model_tool.attributes));
        $(".ui-draggable").draggable({
            appendTo : "body",
            helper : "clone"
        });
    }
});
