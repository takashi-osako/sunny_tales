Handlebars.registerHelper('function_isSelected', function(currentValue, defaultValue) {
    return currentValue === defaultValue ? "selected" : "";
});

Handlebars.registerHelper('displayStyle', function(type) {
    var template_name = "style." + type + ".template";
    template = Handlebars.partials[template_name];
    if (template)
        return template(this);
    else
        return '';
});