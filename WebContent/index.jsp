<jsp:include page="header.html"/>
<head>
	<link rel='shortcut icon' href ="favicon.ico" type ="image/x-icon"/>
</head>
<html>
    <body>
	    <%
	        String loadedToDoItems = "";
	        Cookie[] cookie = request.getCookies();
	        if(cookie != null){
	            for(Cookie tempCookie : cookie){
	            	if(tempCookie.getName().equals("savedItems")){
	            		loadedToDoItems = tempCookie.getValue();
	            	}
	            }
	        }
	    %>

	   	<div id = "list" class = "container">
		 <form type="POST"> 
	      <div id = "todolist">
	        <button class = "newTask addTask" onClick = "toDoList.addNewTaskItem('','')" >Add New Task!</button>
	        <div id = "listContainer">
	        </div>
	      </div>
	     </form>
	    </div>
	    <script src="functions.js" "text/javascript"></script>
	    <script>
    	
	    	var loadedItems = "<%=loadedToDoItems.toString()%>";
	    	loadedItems = JSON.parse(loadedItems.replace(/'/g, "\"").replace(/_/g, " ").replace(/-/g, ","));
	    	console.log(loadedItems);
	    	
	    	var toDoItems = [];
	    	function buildToDoItem(toDoItem){
	    		toDoItems.push({
	    			task: toDoItem
	    		});
	    	}
	    	
// 	    	console.log(document.cookie)
			
			if(loadedItems!=undefined && loadedItems.length > 0){
				for(var item in loadedItems){
			    	buildToDoItem(loadedItems[item].task);
				}
			} else {
		    	buildToDoItem("Add new tasks to do by clicking 'Add New Task!'");
		    	buildToDoItem("Complete your tasks by clicking task complete!'");				
			}
	    	
	    	toDoList.init(toDoItems);
	    </script>
    </body>
<style> 

.todoItem{
  font-size: 1em;
  min-height: 3em;
}
#list{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px;
}

#listContainer{
  width: calc(100% + 16px);
  overflow-y: scroll;
  height: 100%;
}

.toolShelf{
  width: 100%;
  background-color: black;
  height: auto;
  display: none;
}


#todolist{
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: .5em;
  border: 1px solid black;
}

textarea{
     font-size: 1em; 
     padding: 0px;
}

textarea:hover, 
input:hover, 
textarea:active, 
input:active, 
textarea:focus, 
input:focus,
button:focus,
button:active,
button:hover,
label:focus,
.btn:active,
.btn.active
{
    outline: 1px solid red !important;
    -webkit-appearance:none;
}

textarea{
    font-family: inherit; 
    width: 100%;
    resize: vertical;
    height: auto;
    border-left: 0px;
    border-right: 0px;
	display: none;
}

.active .output{
	display: none;
}

.output {
	display: block;
	padding-top: 1px;
}

.active textArea{
	display: block;
}

.addTask{
  width: 100%;
}
.newTask{
}
.updTask{
	width: 100%;
	font-size: 1.25em;
}
.button{

}

.cmpTask {
  font-size: .7em;
  width: 100%;
}
.delTask{
  font-size: .5em;
  padding: 1px;
  padding-right: 3px;
  padding-left: 3px;
  box-sizing: border-box;
  float: right;
}

.todoitemContainer{
  width: 100%;
  border-bottom: 1px dashed black;
  padding-top: 15px;
  padding-bottom: 15px;
} 

.anim{
  -webkit-transition: all .5s; 
     -moz-transition: all .5s;
       -o-transition: all .5s;
          transition: all .5s;  
}
#app {
  // width: calc(35% + 520px);
  // width: 35%;
  height: 100%;
  margin:auto;
  display:grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-gap: 10px;
  // grid-auto-rows: minmax(500px, auto);
} 

body{
  height: 100vh;
}

body, html{
  padding: 0px;
  margin: 0px;
  width: 100%;
  font: 1em sans-serif;
}
</style>
</html>        

<jsp:include page="footer.html"/>
