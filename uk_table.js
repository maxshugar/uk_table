/* 	Lightweight javascript library for generating a datatable using UIKIT. Handles action callbacks and row selection.
*
* 	Author: Max Rochefort-Shugar
* 	Dependencies: UIKit
*	Options: title, headers, actions
* 	Date: 13/09/19
*
*/

var uk_table = function(options){
	
	if(options.title === 'undefined')
		return console.log('Table title required.');
	if(options.headers === 'undefined')
		return console.log('Table headers required.');
	
	this.selected_rows = {};
	
	//Return table with title, headers, buttons, callbacks
	this.init = function(){
		
		var container = el_factory('div', {class: 'uk-container', style: 'margin-bottom: 20px;'});
		var container_inner = el_factory('div', {class: 'uk-container', style: 'overflow-y: scroll; max-height: 500px;'});
		var _this = this;
		
		//Generate title
		var heading_divider = el_factory('h3', {class: 'uk-heading-divider'}, options.title);
		
		//Generate action buttons
		for(var i = 0; i < options.actions.length; i++){
			(function(){
				var action_style_modifier = options.actions[i].style_modifier;
				var action_name = options.actions[i].name;
				var callback = options.actions[i].callback;
				var action_btn = el_factory('button', {class: 'uk-button ' + action_style_modifier + ' uk-button-small uk-align-right', style: 'margin-left: 10px;'}, action_name);
				action_btn.onclick = function(){ callback(_this) };
				heading_divider.appendChild(action_btn);
			}());
		}
		container.appendChild(heading_divider);
		
		var table = el_factory('table', {class: 'uk-table uk-table-striped uk-table-small uk-table-hover', style: 'border: calc(.2px + .05em) solid #e5e5e5;'});
		
		//Build table header
		var table_head = el_factory('thead');
		var table_row = el_factory('tr');
		var table_head_row = el_factory('th', {class: 'uk-width-auto'}, "");
		table_row.appendChild(table_head_row);
		for(var i = 0; i < options.headers.length; i++){
			var table_head_row = el_factory('th', {class: 'uk-width-auto'}, options.headers[i]);
			table_row.appendChild(table_head_row);
		}
		table_head.appendChild(table_row);
		table.appendChild(table_head);
		
		//Build table body
		var table_body = el_factory('tbody');
		table.appendChild(table_body);
		
		container_inner.appendChild(table);
		
		container.appendChild(container_inner);
		
		return container;
		
	}
	
	//Public method for adding row object to table body
	this.add_row = function(row_obj){
		
		var table_row = el_factory('tr');
		var checkbox = el_factory('td', {}, [el_factory('input', {class: 'uk-checkbox uk-align-center', type: 'checkbox', style: 'margin: auto;'})]);
		checkbox.addEventListener('change', (event) => {
		  if (event.target.checked) {
			this.selected_rows[event.target.parentElement.parentElement.rowIndex] = event.target.parentElement.parentElement;
		  } else {
			delete this.selected_rows[event.target.parentElement.parentElement.rowIndex];
		  }
		});
		table_row.appendChild(checkbox);
		for(var i = 0; i < options.headers.length; i++){
			if(row_obj[options.headers[i]] == null)
				row_obj[options.headers[i]] = "";
			var table_body_data = el_factory('td', {}, row_obj[options.headers[i]].toString() );
			table_row.appendChild(table_body_data);
		}
		this.container.children[1].children[0].children[1].appendChild(table_row);
		
	}
	
	this.delete_row = function(index){
		this.container.children[1].children[0].children[1].children[index].remove();
		
	}
	
	//Public method for adding multiple rows to table body
	this.add_rows = function(rows){
		
		//Generate table body
		for(var i = 0; i < rows.length; i++){
			this.add_row(rows[i]);
		}
		
	}
	
	this.container = this.init();
	
	return this;
	
}



/*
	function generate_table( headers, rows, index, body_id ){
		
		var table = el_factory('table', {class: 'uk-table uk-table-striped uk-table-small uk-table-hover', style: 'border: calc(.2px + .05em) solid #e5e5e5;'});
		
		//Build table header
		var table_head = el_factory('thead');
		var table_row = el_factory('tr');
		var table_head_row = el_factory('th', {class: 'uk-width-auto'}, "");
		table_row.appendChild(table_head_row);
		for(var i = 0; i < headers.length; i++){
			var table_head_row = el_factory('th', {class: 'uk-width-auto'}, headers[i]);
			table_row.appendChild(table_head_row);
		}
		table_head.appendChild(table_row);
		table.appendChild(table_head);
		
		//Build table body
		var table_body = el_factory('tbody', {id: body_id});
		for(var i = 0; i < rows.length; i++){
			var checkbox = el_factory('td', {}, [el_factory('input', {class: 'uk-checkbox uk-align-center', type: 'checkbox', style: 'margin: auto;'})]);
			var table_row = el_factory('tr');
			table_row.appendChild(checkbox);
			for(var j = 0; j < headers.length; j++){
				if(rows[i][headers[j]] == null)
					rows[i][headers[j]] = "";
				var table_body_data = el_factory('td', {'data-index': rows[i][index]}, rows[i][headers[j]].toString() );
				table_row.appendChild(table_body_data);
			}
			table_body.appendChild(table_row);
		}
		table.appendChild(table_body);
		
		return table;
	}
*/


/*
data = JSON.parse(data);
				
var super_class_id_select = "";

for(var i = 0; i < data.length; i++){
	super_class_id_select += "<option>" + data[i].node_id + "</option>";
}

var class_heading_divider = el_factory('h3', {class: 'uk-heading-divider'}, 'Vertex Classes');
var delete_vertex_class_button = el_factory('button', {class: 'uk-button uk-button-danger uk-button-small uk-align-right class-btn', id: 'delete_vertex_class'}, 'Delete');
delete_vertex_class_button.addEventListener("click", function(e){
	e.preventDefault();
	e.target.blur();
	UIkit.modal.confirm('UIkit confirm!').then(function () {
		console.log('Confirmed.')
	}, function () {
		console.log('Rejected.')
	});
});
var edit_vertex_class_button = el_factory('button', {class: 'uk-button uk-button-primary uk-button-small uk-align-right class-btn'}, 'Edit');
var add_vertex_class_button = el_factory('button', {class: 'uk-button uk-button-default uk-button-small uk-align-right class-btn'}, 'Add');
add_vertex_class_button.addEventListener("click", function(e){
	e.preventDefault();
	e.target.blur();
	UIkit.modal.dialog('<div class="uk-modal-body">\
		 <button class="uk-modal-close-default" type="button" id="add_vertex_class_modal_close" uk-close></button>\
		 <h3 class="uk-modal-title">Create new vertex class</h3>\
		<form class="uk-grid-small" uk-grid>\
			<div class="uk-width-1-1">\
				<input class="uk-input" type="text" id="add_vertex_class_modal_node_id" placeholder="Class name" required>\
			</div>\
			<div class="uk-width-2-3@s">\
				<label class="uk-form-label" for="form-stacked-select">Super class name</label>\
				<div class="uk-form-controls">\
					<select class="uk-select" id="add_vertex_class_modal_super_class_id"">' + super_class_id_select + '</select>\
				</div>\
			</div>\
			<div class="uk-width-1-3@s">\
				<label class="uk-form-label" for="form-stacked-select">Read only</label>\
				<div class="uk-form-controls">\
					<select class="uk-select" id="add_vertex_class_modal_read_only">\
						<option>False</option>\
						<option>True</option>\
					</select>\
				</div>\
			</div>\
		</form>\
		<button class="uk-button uk-button-default uk-button-small uk-align-right uk-margin-top class-btn uk-modal-close" style="margin-bottom: 0px;">Cancel</button>\
		<button class="uk-button uk-button-primary uk-button-small uk-align-right uk-margin-top class-btn" style="margin-bottom: 0px;" id="add_vertex_class_btn"">Add</button>\
		</div>');
	document.getElementById('add_vertex_class_btn').addEventListener("click", function(e){
	
	
		//console.log(document.body.children[4].children[0].children[0].children[0].id);
	
		document.getElementById('add_vertex_class_modal_close').click();
	
	return;
	
		var node_id = document.getElementById('add_vertex_class_modal_node_id');
		var super_class_id = document.getElementById('add_vertex_class_modal_super_class_id');
		var read_only = document.getElementById('add_vertex_class_modal_read_only');
		node_id = node_id.value;
		super_class_id= super_class_id.options[super_class_id.selectedIndex].text;
		read_only = read_only.options[read_only.selectedIndex].text;
		if(node_id == "")
			return $.notify("Vertex class name required.", "error");
		var body = {"node": { "node_id": node_id, "node_type": 'vertex_class', "read_only": read_only, "super_class_id": super_class_id, properties: {} }};
		http_client.post('http://43.210.9.35:8000/nodes', {"Content-Type": "application/json;charset=UTF-8"}, body, function(res, err){
			
			//validate response
			if(err){
				return $.notify(JSON.parse(err).error, "error");
			}

			//Add to table instead of re rendering..
			var body = document.getElementById('vertex_class_table_body');
			console.log(body);
			var table_row = el_factory('tr');
			var checkbox = el_factory('td', {}, [el_factory('input', {class: 'uk-checkbox uk-align-center', type: 'checkbox', style: 'margin: auto;'})]);
			table_row.appendChild(checkbox);
			var table_body_data = el_factory('td', {'data-index': node_id}, node_id );
			table_row.appendChild(table_body_data);
			var table_body_data = el_factory('td', {'data-index': node_id}, 'vertex_class' );
			table_row.appendChild(table_body_data);
			var table_body_data = el_factory('td', {'data-index': node_id}, read_only );
			table_row.appendChild(table_body_data);
			var table_body_data = el_factory('td', {'data-index': node_id}, super_class_id );
			table_row.appendChild(table_body_data);
			body.appendChild(table_row);
			
			//Close modal
			//document.getElementById('add_vertex_class_modal_close').click();
			
			return $.notify("Vertex class addedd successfully.", "success");
			
		});
	});
});
class_heading_divider.appendChild(delete_vertex_class_button);
class_heading_divider.appendChild(edit_vertex_class_button);
class_heading_divider.appendChild(add_vertex_class_button);
container.appendChild(class_heading_divider);
var class_table = generate_table( ['node_id', 'node_type', 'read_only', 'super_class_id'], data, 'node_id', 'vertex_class_table_body');
container.appendChild(class_table);

//Get edge classes
http_client.get('http://43.210.9.35:8000/nodes/edge_class', {}, function(data){
	
	data = JSON.parse(data);
	var class_heading_divider = el_factory('h3', {class: 'uk-heading-divider'}, 'Edge Classes');
	var delete_vertex_class_button = el_factory('button', {class: 'uk-button uk-button-danger uk-button-small uk-align-right class-btn'}, 'Delete');
	var edit_vertex_class_button = el_factory('button', {class: 'uk-button uk-button-primary uk-button-small uk-align-right class-btn'}, 'Edit');
	var add_vertex_class_button = el_factory('button', {class: 'uk-button uk-button-default uk-button-small uk-align-right class-btn'}, 'Add');
	class_heading_divider.appendChild(delete_vertex_class_button);
	class_heading_divider.appendChild(edit_vertex_class_button);
	class_heading_divider.appendChild(add_vertex_class_button);
	container.appendChild(class_heading_divider);
	var class_table = generate_table( ['node_id', 'node_type', 'read_only', 'super_class_id', 'bidirectional', 'description'], data, 'node_id', 'vertex_class_table_body');
	container.appendChild(class_table);
});
*/
