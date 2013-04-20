CanvasView = Backbone.View.extend({
    el : $("#canvas"),
    initialize : function(model_toolMenu, model_template) {
        this.model_toolMenu = model_toolMenu;
        this.template = model_template;
        this.components = this.template.get("components");
        var _components = this.components;
        this.components.bind("add", this.renderCanvas, this)
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
                    //set component position by mouse position
                    var new_component = new ReportComponent(null, tool);
                    new_component.set("top", event.pageY * 0.75 - this.offsetTop * 0.75);
                    new_component.set("left", event.pageX * 0.75 - this.offsetLeft * 0.75);
                    new_component.set("html", tool.get("html"));
                    //add to component collections.
                    //also renderCanvas will be called.
                    _components.add(new_component);
                } else {
                    // this component has already created.
                    //make it draggable again
                    $(component_id).draggable();
                }
            }
        });
    },
    events : {
        // add event. listen click on styleRender class.
        "click .styleRender" : "updateStyleView"
    },
    updateStyleView : function(e) {
        var id = $(e.currentTarget);
        var styleView = new StyleView;
        styleView.renderStyle(e.currentTarget.id, this.model_toolMenu.get("tools").get($(e.currentTarget).data("id")).get("style"));
        //(this.model_toolMenu.get("tools").get($(e.currentTarget).data("id")).get("style"));
    },
    renderCanvas : function(model_report_component) {
        //rerender canvas when new tool is dragged from toolbox layout
        new_component = $(model_report_component.get("html"));
        new_component.attr("id", model_report_component.cid);
        new_component.data("id", model_report_component.get("type"));
        new_component.css("top", model_report_component.get("top") + "pt");
        new_component.css("left", model_report_component.get("left") + "pt");
        new_component.css("height", model_report_component.get("height") + "pt");
        new_component.css("width", model_report_component.get("width") + "pt");
        new_component.css("position", "absolute");
        new_component.css("overflow", "hidden");
        new_component.css("text-overflow", "ellipsis");
        new_component.addClass("styleRender");
        new_component.draggable();
        new_component.resizable();
        new_component.appendTo($("#canvas"));
    }
});
