selection_id={}
$(function () {
	$('body').layout({
		applyDefaultStyles : true
	});
	load_document();
	/*
	$("#selections").accordion();
	$("#selections li").draggable({
		appendTo : "body",
		helper : "clone"
	});
	*/
	$("#canvas").droppable({
		activeClass : "ui-state-default",
		hoverClass : "ui-state-hover",
		drop : function(event, ui) {
			id = ui.draggable.attr("id");
			value = ui.draggable.attr("value");
			my_selection_id = get_selection_id(id);
			new_element = $(value);
			new_element.attr("id", my_selection_id);
			span_element = $('<span></span>');
			span_element.attr("id","span_" + my_selection_id);
			new_element.appendTo(span_element);
			span_element.appendTo(this);
			$("#" + my_selection_id).resizable();
			$("#" + my_selection_id).draggable();
		}
	});
	
	
});

function get_selection_id(id) {
	uid = selection_id[id];
	if (uid === undefined) {
		selection_id[id] = 0;
		uid = 0;
	}
	selection_id[id]++;
	return id + "_" + uid;
}

function load_document() {
	$.ajax({
		dataType: 'json',
		url: 'http://localhost:6543/api/v0/template/new',
		success: function(data) {
			id = data.id
			elements = data.elements
			load_template('elements.template', data, $("#selections"))
		}, error: function() {
			alart('error')
		}
	})
}

function load_template(template_name, data, render_area) {
	target = 'http://localhost:6543/templates/' + template_name
	$.ajax({
		dataType: 'html',
		url: target,
		success: function(template) {
			output = Mustache.render(template, data)
			render_area.append(output)
			for(var i=0; i<data.elements.length; i++)
				make_draggable($("#" + data.elements[i].type))
		}, error: function() {
			alart('error')
		}
	})
}

function make_draggable(id) {
	id.draggable({
		appendTo : "body",
		helper : "clone"
	});
}
