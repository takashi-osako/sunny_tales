CanvasView = Backbone.View.extend({
    el : $("#canvas"),
    initialize : function(b_model_toolMenu, b_model_template, b_styleCollection) {
        this.b_model_toolMenu = b_model_toolMenu;
        this.b_template = b_model_template;
        this.b_styleCollection = b_styleCollection;

        this.b_components = this.b_template.get("components");
        var b_components = this.b_components;
        this.b_components.bind("add", this.renderCanvas, this);

        this.listenTo(this.b_components, 'change', this.render, this);
        $("#canvas").droppable({
            activeClass : "ui-state-default",
            hoverClass : "ui-state-hover",
            drop : function(event, ui) {
                var component_id = ui.draggable.attr("id");
                //check if dragged component is already created and saved in collection of components
                var j_existing_component = b_components.get(component_id);
                if (j_existing_component === undefined) {
                    //a user is dragged from tools layout.
                    //create new component for the canvas
                    //get b_tool by id(type)
                    var b_tool = b_model_toolMenu.get("tools").get(component_id);
                    var value = b_tool.get("value");
                    var b_styleOfTool = b_tool.get("style");
                    var b_commonStyle = b_model_toolMenu.get("common_style");
                    //set component position by mouse position
                    var b_new_component = new ReportComponent(null, {
                        "b_commonStyle" : b_commonStyle,
                        "b_styleOfTool" : b_styleOfTool
                    });
                    b_new_component.set("type", b_tool.get("type"));
                    b_new_component.set("value", value);
                    b_new_component.set("html", b_tool.get("html"));

                    b_new_component.css_set("top", 0.75 * (ui.offset.top - this.offsetTop));
                    b_new_component.css_set("left", 0.75 * (ui.offset.left - this.offsetLeft));
                    //add to component collections.
                    //also renderCanvas will be called.
                    b_components.add(b_new_component);
                } else {
                    // this component has already created.
                    //make it draggable again
                    $(component_id).draggable();

                    // Update top and left
                    j_existing_component.css_set("left", (0.75 * parseInt($('#' + component_id).css("left"), 10)));
                    j_existing_component.css_set("top", (0.75 * parseInt($('#' + component_id).css("top"), 10)));
                }
            }
        });
    },
    events : {
        "click .report-component" : "updateStyleView",
        "resize .report-component" : "resize"
    },
    updateStyleView : function(e) {
        this.b_styleCollection.reset();
        var b_myModel = this.b_components.get(e.currentTarget.id);
        // For the case of deletes
        if (b_myModel) {
            // Get the style of the tool
            var b_commonStyle = this.b_model_toolMenu.get("common_style");
            var b_commonStyleModel = new StyleModel(b_myModel, b_commonStyle);
            b_commonStyleModel.set("targetId", $(e.currentTarget).attr("id"));
            b_commonStyleModel.set("elementId", "commonStyle");
            this.b_styleCollection.add(b_commonStyleModel);

            var b_styleOfTool = this.b_model_toolMenu.get("tools").get($(e.currentTarget).data("id")).get("style");
            var b_styleModel = new StyleModel(b_myModel, b_styleOfTool);
            b_styleModel.set("targetId", $(e.currentTarget).attr("id"));
            b_styleModel.set("elementId", "styleOfTool");
            this.b_styleCollection.add(b_styleModel);
        }
    },
    renderCanvas : function(b_model_report_component) {
        //rerender canvas when new tool is dragged from toolbox layout
        j_new_component = $(b_model_report_component.get("html"));
        j_new_component.attr("id", b_model_report_component.cid);
        j_new_component.data("id", b_model_report_component.get("type"));
        _.map(b_model_report_component.css_all(), function(val, key) {
            this.j_new_component.css(key, this.b_model_report_component.css_unit(key));
        }, {
            "j_new_component" : j_new_component,
            "b_model_report_component" : b_model_report_component
        });
        // Chrome issue, we must set position, else it sets it to relative
        j_new_component.css("position", "absolute")
        j_new_component.addClass("report-component");
        j_new_component.draggable();
        j_new_component.resizable();
        j_new_component.appendTo($("#canvas"));
    },
    render : function(b_model, options) {
        var j_model_html = $('#' + b_model.cid);
        // We know that one thing changed, so get the first element from the array
        attributeName = _.keys(b_model.changedAttributes())[0];
        attributeValue = _.values(b_model.changedAttributes())[0];
        j_model_html.css(attributeName, attributeValue);
    },
    close : function(event) {
        // Currently not used
        // Delete the item from components
        this.b_template.get("components").remove(event.target.parentNode.id)
        $("#" + event.target.parentNode.id + ".alert").alert('close');
        // TODO: Is there more cleanup?
    },
    resize : function(event) {
        // A report component was resized
        var width = 0.75 * parseInt($(event.currentTarget).css("width"), 10);
        var height = 0.75 * parseInt($(event.currentTarget).css("height"), 10);
        var b_myModel = this.b_components.get(event.currentTarget.id);
        b_myModel.css_set("width", width);
        b_myModel.css_set("height", height);
    }
});
