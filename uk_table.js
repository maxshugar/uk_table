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