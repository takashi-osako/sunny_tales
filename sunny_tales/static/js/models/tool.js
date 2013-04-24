Tool = Backbone.Model.extend({
    defaults : {
        name : 'element name',
        type : 'element_type',
        value : '',
        resizable : false,
        style : []
    },
    //use "type" as Tool's id
    idAttribute : "type",
    initialize : function() {
        if (this.get("type") !== "LINE") {
            html = this.get("html")
            htmlObject = $(html)
            // Add id to identify where we should replace the text
            htmlObject.attr("id", "value")
            // Set the text
            htmlObject.text(this.get("value"))

            // Add relevant classes
            wrapper = $("<div class='ui-widget-content resizable draggable alert'><a class='close'>×</a></div>")
            // Wrap around the html from config and convert to html string
            $(htmlObject).appendTo(wrapper)
            modifiedHtml = $('<div>').append($(wrapper).clone()).html();
            this.set("html", modifiedHtml);
        }
    }
});
