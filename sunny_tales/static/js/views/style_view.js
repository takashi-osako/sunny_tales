StyleView = Backbone.View.extend({

    template : Handlebars.templates['style.template'],
    render : function() {

        // Set values for the textbox based on model's value
        this.commonStyle[0].value = this.model.get("left");
        this.commonStyle[1].value = this.model.get("top");
        this.commonStyle[2].value = this.model.get("width");
        this.commonStyle[3].value = this.model.get("height");

        data = {
            "styles" : this.commonStyle,
            "targetId" : this.targetId,
        }

        // Template the common style table first
        $(this.el).html(this.template(data));

        // Template for style specific to the tool
        data['styles'] = this.styles
        $(this.el).append(this.template(data));

        return this;
    },
    initialize : function(myModel, styles, commonStyle, targetId) {
        this.model = myModel
        this.styles = styles
        this.commonStyle = commonStyle
        this.targetId = targetId
        this.listenTo(this.model, 'change', this.render);
    },
    events : {
        "change #x_position" : "setPosition",
        "change #y_position" : "setPosition"
    },
    setPosition : function(e) {
        if (e.target.id == "y_position")
            this.model.set("top", parseInt($('#y_position').val()));
        else if (e.target.id == "x_position")
            this.model.set("left", parseInt($('#x_position').val()));
    }
});
