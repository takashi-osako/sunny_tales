StyleView = Backbone.View.extend({

    el : $("#style"),
    render : function(styleModel) {

        /*
        // Set values for the textbox based on model's value
        this.commonStyle[0].value = this.model.get("left");
        this.commonStyle[1].value = this.model.get("top");
        this.commonStyle[2].value = this.model.get("width");
        this.commonStyle[3].value = this.model.get("height");
        this.commonStyle[4].value = this.model.get("border-style");
        this.commonStyle[5].value = this.model.get("border-width");
        

        var data = {
        "styles" : styleModel.toJSON(),
        "targetId" : this.targetId,
        "id" : "commonStyle"
        }
        */
        // Template the common style table first
        var template_html = Handlebars.templates['style.template'](styleModel.toJSON());
        $("#style").append(template_html);

        // Template for style specific to the tool
        //data['styles'] = this.styles
        //$(this.el).append(this.template(data));

        return this;
    },
    initialize : function(styleCollection) {
        this.styleCollection = styleCollection;
        this.styleCollection.bind("add", this.render);
        this.styleCollection.bind("reset", $(this.el).remove);
    }, /*
     initialize : function(myModel, styles, commonStyle, targetId) {
     this.model = myModel
     this.styles = styles
     this.commonStyle = commonStyle
     this.targetId = targetId
     this.listenTo(this.model, 'change', this.render);
     },*/
    events : {
        "change #style_top" : "setStyleFloat",
        "change #style_left" : "setStyleFloat",
        "change #style_width" : "setStyleFloat",
        "change #style_height" : "setStyleFloat",
        "change #style_border-width": "setStyleFloat",
        "change #style_border-style": "setStyleText"
    },
    setStyleFloat : function(e) {
        i = e.target.id.indexOf('_')
        key = e.target.id.substring(i + 1, e.target.id.length)
        this.model.set(key, parseFloat($('#' + e.target.id).val()));
    },
    setStyleText : function(e){
        i = e.target.id.indexOf('_')
        key = e.target.id.substring(i + 1, e.target.id.length)
        this.model.set(key, $('#' + e.target.id).val());
    }
});
