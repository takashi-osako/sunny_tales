StyleModel = Backbone.Model.extend({
    initialize : function(myModel, styles) {
        this.set("styles", styles);
        this.myModel = myModel;
    },
    styles : null,
    targetId: null,
    elementId: null
});
