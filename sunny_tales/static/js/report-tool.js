selection_id={}
properties={}
$(function () {
	$('body').layout({
		applyDefaultStyles : true
	});
	load_document();

	$("#canvas").droppable({
		activeClass : "ui-state-default",
		hoverClass : "ui-state-hover",
		drop : function(event, ui) {
			element_id = ui.draggable.attr("element_id");
			my_selection_id = ui.draggable.attr("id");
			
			if (element_id===undefined) {
				element_id = my_selection_id;
				//this is first time dragging.  
				//make it unique and save original id to element_id
				ui.draggable.attr('element_id',element_id)
				my_selection_id = get_selection_id(element_id);
				value = ui.draggable.attr("value");
				new_element = $(value);
				new_element.attr("id", my_selection_id);
				new_element.attr("element_id", element_id);
				style = new_element.attr('style');
				if (style === undefined)
					style="";
				new_element.attr('style',style+'cursor:move;');
				new_element.appendTo(this);
				if(properties[element_id].resizable)
					$("#" + my_selection_id).resizable();
				$("#" + my_selection_id).draggable();
			}
			
			
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
		url: '/api/v0/template/new',
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
	target = '/templates/' + template_name
	$.ajax({
		dataType: 'html',
		url: target,
		success: function(template) {
			output = Mustache.render(template, data)
			render_area.append(output)
			for(var i=0; i<data.elements.length; i++) {
				id = "#" + data.elements[i].type
				properties[data.elements[i].type]=data.elements[i]
				make_draggable($(id))
			}
				
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

