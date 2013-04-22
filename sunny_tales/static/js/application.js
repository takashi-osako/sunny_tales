/*
 * This is main function for template editor
 */
$(function() {
    // display layouts
    $('body').layout({
        applyDefaultStyles : true
    });
    
    var toolMenu = new ToolMenuModel;
    var templateModel = new TemplateModel;
    var styleCollection =  new StyleCollection;
    // render toolbox view
    var toolboxView = new ToolBoxView(toolMenu);
    //toolboxView.loadElementData(data);
    var canvasView = new CanvasView(toolMenu, templateModel, styleCollection);
    var saveTemplateView = new SaveTemplateView(templateModel);
    var styleView = new StyleView(styleCollection);

});

//this is mock data
//TODO: refactor, read data from RESTful.
/*
 var data = [{
 "name" : "Static Text",
 "type" : "STATIC_TEXT",
 "html" : "<div class='ui-widget-content resizable draggable'>This is static text and click me</div>",
 "resizable" : true,
 "style" : [{
 "name" : "font face",
 "input_type" : "string",
 "editable" : false,
 "selection" : ["arial", "courier"],
 "css" : "font-family: %s;",
 "defaultss" : "courier"
 }, {
 "name" : "font size",
 "input_type" : "int",
 "editable" : true,
 "selection" : [6, 7, 8, 9, 10, 11, 12, 13, 14],
 "css" : "font-size: %dpt;",
 "defaults" : 12,
 "html" : "<input type='text'>"
 }, {
 "name" : "Italic",
 "input_type" : "bool",
 "editable" : true,
 "css" : "font-style:italic;",
 "defaults" : false
 }, {
 "name" : "Bold",
 "intput_type" : "bool",
 "editable" : true,
 "css" : "font-weight: bold;",
 "defaults" : false
 }, {
 "name" : "Underline",
 "input_type" : "bool",
 "editable" : true,
 "css" : "text-decoration:underline;",
 "defaults" : false
 }, {
 "name" : "text-align",
 "input_type" : "string",
 "editable" : false,
 "selection" : ["right", "center", "left", "justify"],
 "css" : "text-align:%s;",
 "defaults" : "left"
 }, {
 "name" : "text",
 "input_type" : "string",
 "editable" : true,
 "html" : "<textarea/>"
 }]
 }, {
 "name" : "Variable Text",
 "type" : "VARIABLE_TEXT",
 "html" : "<div class='ui-widget-content resizable draggable'>This is variable text and click me</div>",
 "resizable" : true,
 "style" : [{
 "name" : "font face",
 "input_type" : "string",
 "editable" : false,
 "selection" : ["arial", "courier"],
 "css" : "font-family: %s;",
 "defaults" : "courier"
 }, {
 "name" : "font size",
 "input_type" : "int",
 "editable" : true,
 "selection" : [6, 7, 8, 9, 10, 11, 12, 13, 14],
 "css" : "font-size: %dpt;",
 "defaults" : 12
 }, {
 "name" : "Italic",
 "input_type" : "bool",
 "editable" : true,
 "css" : "font-style:italic;",
 "defaults" : false
 }, {
 "name" : "Bold,",
 "intput_type" : "bool",
 "editable" : true,
 "css" : "font-weight: bold;",
 "defaults" : false
 }, {
 "name" : "Underline",
 "input_type" : "bool",
 "editable" : true,
 "css" : "text-decoration:underline;",
 "defaults" : false
 }, {
 "name" : "text-align",
 "input_type" : "string",
 "editable" : false,
 "selection" : ["right", "center", "left", "justify"],
 "css" : "text-align:%s;",
 "defaults" : "left"
 }]
 }, {
 "name" : "line",
 "type" : "LINE",
 "html" : "<div><hr/></div>",
 "resizable" : false,
 "style" : [{
 "name" : "line style",
 "input_type" : "string",
 "editable" : false,
 "selection" : ["solid", "dotted", "dashed"],
 "defaults" : "solid",
 "css" : "border-bottom-style:%s;"
 }, {
 "name" : "height",
 "input_type" : "int",
 "editable" : true,
 "defaults" : 1,
 "css" : "border-bottom-width:%dpx;"
 }, {
 "name" : "color",
 "input_type" : "string",
 "editable" : true,
 "defaults" : "#000000",
 "css" : "border-bottom-color:%s;"
 }]
 }, {
 "name" : "image",
 "type" : "IMAGE",
 "html" : "<div class='ui-widget-content resizable draggable'>where is an image, eh?</div>",
 "resizable" : true,
 "style" : [{
 "name" : "location",
 "input_type" : "string",
 "editable" : true,
 "defaults" : "../png/glyphicons_194_circle_question_mark.png",
 "css" : "background-image:url(%s);background-repeat:no-repeat;"
 }]
 }]
 */