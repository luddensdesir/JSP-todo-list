toDoList = ((undefined) => {
	var list = document.querySelector("#listContainer");
	var preRenderedComponents = []; //array of builtHtmlitems
	function initialize(items){
		var activeClass = '';
		var renderParts = {};
		for(var i = 0; i<items.length ; i++){
			if(i == 0){
				activeClass = ' active';
			} else {
				activeClass = '';
			}

			//get rid of active from everywhere, just make the first item active
			addNewTask(items[i].task, activeClass, i);
		}
	}

	function addNewTask(taskItem, activeClass, elID){
		var newID = elID;
		if(isNaN(newID) || newID < 0){
			newID = preRenderedComponents.length;
		}
		preRenderedComponents.push({task: taskItem, active: activeClass, id: newID});
		renderer.buildCompsToHtml(preRenderedComponents);
	}

	function makeItemActive(el){
		el.classList.add('active');
		deactivateInputExceptFor(el.id);
	}

	function deactivateInputExceptFor(keepActiveID){
		for(var i = 0; i < list.childNodes.length; i++){
			if(keepActiveID != undefined){
				if(!(list.childNodes[i].id == keepActiveID)){
					//list.childNodes[i].classList.remove('active');
					preRenderedComponents[i].active = ''
					renderer.buildComponentToHtml(preRenderedComponents[i]);
				} else {
				}
			} else {
//				list.childNodes[i].classList.remove('active');
				preRenderedComponents[i].active = ''
				renderer.buildComponentToHtml(preRenderedComponents[i]);
			}
		}
	}

	function removeItem(elID){
		preRenderedComponents.splice(splitID(elID),1);
		
		for(var i = 0; i < preRenderedComponents.length; i++){
			list.childNodes[i].id = 'toDo' + i;
			preRenderedComponents[i].id = i;
		}
		
		renderer.buildCompsToHtml(preRenderedComponents);
	}
	function splitID(id){
		var numID = id.split("toDo")[1];
		return numID;
	}
	function updateTextByComponent(id, newText){
		preRenderedComponents[splitID(id)].task = newText;
	}
	
	return {
		getPreRenderedComponents: function(){
			return preRenderedComponents;
		},
		updateRenderedText: function(id, text){
			updateTextByComponent(id, text)
		},
		getListContainer: function(){
			return list;
		},
		init: function(savedItems){
			initialize(savedItems);
		},
		completeTask: function(el){
			removeItem(el.parentElement.id);
			st.saveUpdatedList();
		},
		makeActive: function(element){
			makeItemActive(element);
		}, 
		addNewTaskItem: function( taskItem, activeClass, elID ){
			addNewTask( taskItem, activeClass, elID );
		},
		deactivateAllInput: function(){
			deactivateInputExceptFor();
		}
	}
})("undefined");
 
templates = (() => {
	function listItemHtml(){
		return function(taskDesc, active, index){
			return `<div id = "toDo`+ index +`" class = "todoitemContainer` + active +`">
  <div class ="toolShelf">
    <button class = "delTask">x</button>
  </div>
  <textarea class ="todoItem input"  oninput="toDoList.updateRenderedText(this.parentElement.id, this.value)" placeholder="insert item here">`+ taskDesc +`</textarea>
  <div class ='todoItem output'>`+ taskDesc +`</div>
  <input type = "submit" class = "updTask" value ="Update"/>
  <input type = "submit" class = "cmpTask" onClick = "toDoList.completeTask(this)" value = "Task Completed!"/>
</div>`
		}
	}
	return {
		buildListItem: function(todoText, firstItem, i){
			return listItemHtml(todoText, firstItem, i);
		}
	}
})();

renderer = (() => { 
	function render(completedHtml){ 
		toDoList.getListContainer().innerHTML = completedHtml;
	}
	function renderComponents(comps){
		var cattedHtml = "";
		for(var i = 0; i<comps.length;i++){
			cattedHtml += templates.buildListItem()(comps[i].task, comps[i].active, comps[i].id);
		}
		toDoList.getListContainer().innerHTML = cattedHtml;
	}
	function renderSingle(comp){
		var elID = '#toDo' + comp.id
		var updateComponent = document.querySelector(elID)
		
		updateComponent.outerHTML = templates.buildListItem()(comp.task, comp.active, comp.id); 
	}
	return {
		buildCompsToHtml: function(comps){
			return renderComponents(comps); 
		},
		buildComponentToHtml: function(comp){
			return renderSingle(comp); 
		},
		renderHtml: function(catedTemplates){
			return render(catedTemplates);
		}
	}
})();

st = (() => { 
	return {
		saveUpdatedList: function(){
			var xhr = new XMLHttpRequest();
			xhr.open("POST", '/testJspadventure/makeCookie.jsp', true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function(res) {
			    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			    }
			}
			xhr.send(JSON.stringify(toDoList.getPreRenderedComponents()).replace(/"/g, "'").replace(/ /g, "_").replace(/,/g, "-"));
		}
	}
})();

document.querySelector('form').addEventListener('submit', function(ev){
	st.saveUpdatedList();
	ev.stopPropagation();
	ev.preventDefault();
})

window.addEventListener('click', function(ev){
	var targ = ev.target
	var toDoItemClicked = targ.classList.contains("todoitemContainer");
	
	if( targ.classList.contains("todoitemContainer") ){	
		if( !targ.classList.contains("active") ){
			toDoList.makeActive(targ);
		}
	} else if( targ.parentElement.classList.contains("todoitemContainer") ){
		if( !targ.parentElement.classList.contains("active") ){
			toDoList.makeActive(targ.parentElement);
		}
	} else {
		toDoList.deactivateAllInput();
	}
})