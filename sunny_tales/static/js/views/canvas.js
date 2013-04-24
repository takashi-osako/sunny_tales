CanvasView = Backbone.View.extend({
    el : $("#canvas"),
    initialize : function(model_toolMenu, model_template, styleCollection) {
        this.model_toolMenu = model_toolMenu;
        this.template = model_template;
        this.styleCollection = styleCollection;

        this.components = this.template.get("components");
        var _components = this.components;
        this.components.bind("add", this.renderCanvas, this);

        this.listenTo(this.components, 'change', this.render, this);
        $("#canvas").droppable({
            activeClass : "ui-state-default",
            hoverClass : "ui-state-hover",
            drop : function(event, ui) {
                var component_id = ui.draggable.attr("id");
                //check if dragged component is already created and saved in collection of components
                var existing_component = _components.get(component_id);
                if (existing_component === undefined) {
                    //a user is dragged from tools layout.
                    //create new component for the canvas
                    //get tool by id(type)
                    var tool = model_toolMenu.get("tools").get(component_id);
                    var value = tool.get("value");
                    var styleOfTool = tool.get("style");
                    var commonStyle = model_toolMenu.get("common_style");
                    //set component position by mouse position
                    var new_component = new ReportComponent(null, {
                        "commonStyle" : commonStyle,
                        "styleOfTool" : styleOfTool
                    });
                    new_component.set("type", tool.get("type"));
                    new_component.set("value", value);
                    new_component.set("html", tool.get("html"));

                    new_component.css("top", 0.75 * (ui.offset.top - this.offsetTop));
                    new_component.css("left", 0.75 * (ui.offset.left - this.offsetLeft));
                    //add to component collections.
                    //also renderCanvas will be called.
                    _components.add(new_component);
                } else {
                    // this component has already created.
                    //make it draggable again
                    $(component_id).draggable();

                    // Update top and left
                    existing_component.css("left", (0.75 * parseInt($('#' + component_id).css("left"), 10)));
                    existing_component.css("top", (0.75 * parseInt($('#' + component_id).css("top"), 10)));
                }
            }
        });
    },
    events : {
        "click .styleRender" : "updateStyleView",
        "resize .styleRender" : "resize",
        "click .close" : "close"
    },
    updateStyleView : function(e) {
        this.styleCollection.reset();
        var myModel = this.components.get(e.currentTarget.id);
        // For the case of deletes
        if (myModel) {
            // Get the style of the tool
            var commonStyle = this.model_toolMenu.get("common_style");
            var commonStyleModel = new StyleModel(myModel, commonStyle);
            commonStyleModel.set("targetId", $(e.currentTarget).attr("id"));
            commonStyleModel.set("elementId", "commonStyle");
            this.styleCollection.add(commonStyleModel);

            var styleOfTool = this.model_toolMenu.get("tools").get($(e.currentTarget).data("id")).get("style");
            var styleModel = new StyleModel(myModel, styleOfTool);
            styleModel.set("targetId", $(e.currentTarget).attr("id"));
            styleModel.set("elementId", "styleOfTool");
            this.styleCollection.add(styleModel);
        }
    },
    renderCanvas : function(model_report_component) {
        //rerender canvas when new tool is dragged from toolbox layout
        new_component = $(model_report_component.get("html"));
        new_component.attr("id", model_report_component.cid);
        new_component.data("id", model_report_component.get("type"));
        _.map(model_report_component.css, function(val, key) {
        }, new_component);
        new_component.css("top", model_report_component.cssWithUnit("top"));
        new_component.css("left", model_report_component.cssWithUnit("left"));
        new_component.css("height", model_report_component.cssWithUnit("height"));
        new_component.css("width", model_report_component.cssWithUnit("width"));
        new_component.css("border-style", model_report_component.cssWithUnit("border-style"));
        new_component.css("border-width", model_report_component.cssWithUnit("border-width"));
        new_component.css("position", "absolute");
        new_component.css("overflow", "hidden");
        new_component.css("text-overflow", "ellipsis");
        new_component.addClass("styleRender");
        new_component.draggable();
        new_component.resizable();
        new_component.appendTo($("#canvas"));
    },
    render : function(model, options) {
        model_html = $('#' + model.cid);
        // We know that one thing changed, so get the first element from the array
        attributeName = _.keys(model.changedAttributes())[0];
        attributeValue = _.values(model.changedAttributes())[0];
        // TODO: We need to know the format of each css
        if (attributeName != "border-style" && attributeName != "font-family")
            attributeValue = attributeValue + "pt";
        model_html.css(attributeName, attributeValue);
    },
    close : function(event) {
        // Delete the item from components
        this.template.get("components").remove(event.target.parentNode.id)
        $("#" + event.target.parentNode.id + ".alert").alert('close');
        // TODO: Is there more cleanup?
    },
    resize : function(event) {
        // A report component was resized
        var width = 0.75 * parseInt($(event.currentTarget).css("width"), 10);
        var height = 0.75 * parseInt($(event.currentTarget).css("height"), 10);
        var myModel = this.components.get(event.currentTarget.id);
        myModel.css("width", width);
        myModel.css("height", height);
    }
});
