Handlebars.registerHelper('function_isSelected', function(currentValue, defaultValue) {
    return currentValue === defaultValue ? "selected" : "";
});