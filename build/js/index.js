let taskInput = document.getElementById("nameTask");
let detalesTaskInput = document.getElementById("detalesTask");
let addButton = document.getElementById("addBtn");
let incompleteTaskHolder = document.getElementById("incompleteTasks");
let completedTasksHolder = document.getElementById("completedTasks");


let darkredButton = document.getElementById("darkred");
let brownButton = document.getElementById("brown");
let blueButton = document.getElementById("blue");

//change theme of app
function changeBackground(color) {
	document.getElementById("menuSide").style.backgroundColor = color;
}

darkredButton.addEventListener("click", function () { //change color theme to darkred
	changeBackground("#640025")
});
brownButton.addEventListener("click", function () { //change color theme to brown
	changeBackground("#332900")
});
blueButton.addEventListener("click", function () { //change color theme to blue
	changeBackground("#0e1a35")
});


//get number of elements in incopleted list
let element = document.getElementById("incompleteTasks");
let numberOfChildren = element.getElementsByTagName("li").length;
document.getElementById("todoCount").innerText = numberOfChildren;

let timeTask = element.getElementsByClassName("time"); //add date to existing incopleted elements
for (let i = 0; i < timeTask.length; i++) {
	timeTask[i].innerHTML = `
        <p>${new Date().toUTCString()}</p>
      `;
};

//get number of elements in copleted list
let elementC = document.getElementById("completedTasks");
let numberOfChildrenC = elementC.getElementsByTagName("li").length;
document.getElementById("untodoCount").innerText = numberOfChildrenC;

let timeTaskC = elementC.getElementsByClassName("time"); //add string "Completed" to existing copleted elements
for (let i = 0; i < timeTask.length; i++) {
	timeTaskC[i].innerHTML = `
        <p>Completed</p>
      `;
};


//count number of elements in list 
let count = function () {
	let element = document.getElementById("incompleteTasks");
	let numberOfChildren = element.getElementsByTagName("li").length;
	document.getElementById("todoCount").innerText = numberOfChildren;

	let elementC = document.getElementById("completedTasks");
	let numberOfChildrenC = elementC.getElementsByTagName("li").length;
	document.getElementById("untodoCount").innerText = numberOfChildrenC;
}



//New task list item
let createNewTaskElement = function (taskString, detalesString) {
	let listItem = document.createElement("li");
	let checkBox = document.createElement("input"); //checkbx
	let nameTask = document.createElement("h6"); //name
	let detalesTask = document.createElement("p"); //detales
	let editButton = document.createElement("button"); //edit button
	let wrapper = document.createElement("div");
	let wrapper2 = document.createElement("span");
	let timeString = document.createElement("div"); //date string
	let deleteButton = document.createElement("button"); //delete button
	let wrapper3 = document.createElement("div");
	let redButton = document.createElement("a");
	let yellowButton = document.createElement("a");
	let greenButton = document.createElement("a");
	let whiteButton = document.createElement("a");

	//add class to elements and text
	listItem.classList.add("task");
	checkBox.type = "checkbox";
	checkBox.classList.add("checkboxStyle");
	editButton.className = "edit";
	editButton.innerText = "Edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";
	timeString.classList.add("time");
	timeString.className = "time fa fa-clock-o";
	timeString.innerHTML = `
	<p>${new Date().toUTCString()}</p>
  `;
	nameTask.innerText = taskString;
	detalesTask.innerText = detalesString;
	wrapper.classList.add("wrapText");
	wrapper3.classList.add("wrapperColor");
	redButton.classList.add("red");
	yellowButton.classList.add("yellow");
	greenButton.classList.add("green");
	whiteButton.classList.add("white");

	//appending elements
	listItem.appendChild(checkBox);
	wrapper.appendChild(timeString);
	wrapper.appendChild(nameTask);
	wrapper.appendChild(detalesTask);
	listItem.appendChild(wrapper);
	wrapper2.appendChild(editButton);
	wrapper2.appendChild(deleteButton);
	listItem.appendChild(wrapper2);
	wrapper3.appendChild(redButton);
	wrapper3.appendChild(yellowButton);
	wrapper3.appendChild(greenButton);
	wrapper3.appendChild(whiteButton);
	listItem.appendChild(wrapper3);


	return listItem;
};


//add new task
let addTask = function () {
	//Create a new list item with the text from the #new-task:
	let listItem = createNewTaskElement(taskInput.value, detalesTaskInput.value);
	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";
	detalesTaskInput.value = "";


};

//buttom add in form makes 2 function
addButton.addEventListener("click", addTask); //add new task
addButton.addEventListener("click", count); //count number of elements in list


//Delete task.
let deleteTask = function () {
	let listItem = this.parentNode.parentNode;
	let ul = listItem.parentNode;
	//Remove the parent list item from the ul.
	ul.removeChild(listItem);

};


//Edit task
let editTask = function () {
	location.href = "#openModal"; //open form
	let listItem = this.parentNode.parentNode;
	let name = listItem.querySelector("h6").innerHTML; //get name from task 
	let detales = listItem.getElementsByTagName("p")[1].innerHTML; //get detales from task 
	let editInputName = document.querySelector("#nameTask");
	let editInputDetales = document.querySelector("#detalesTask");
	editInputName.value = name; //set name from task to form input
	editInputDetales.value = detales; //set detales from task to form input
	addButton.addEventListener("click", function () {
		listItem.querySelector("h6").innerText = editInputName.value; //set name from form input
		listItem.getElementsByTagName("p")[1].innerHTML = editInputDetales.value; //set detales from form input  
	});
	let ul = listItem.parentNode;
	ul.removeChild(listItem);
};

//Mark task completed
let taskCompleted = function () {
	let listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);

	let completedString = listItem.getElementsByClassName("time");
	for (let i = 0; i < completedString.length; i++) { //change string with  "Completed" to date
		let item = completedString[i];
		item.classList.remove("fa-clock-o");
		item.className = "time fa fa-check-circle-o";
		item.innerHTML = `
					<p>Completed</p>
				  `;
	}

};

//add task as incomplete list.
let taskIncomplete = function () {
	let listItem = this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	let completedString = listItem.getElementsByClassName("time");
	for (let i = 0; i < completedString.length; i++) { //change string with date to "Completed"
		let item = completedString[i];
		item.classList.remove("fa-clock-o");
		item.className = "time fa fa fa-clock-o";
		item.innerHTML = `
					<p>${new Date().toUTCString()}</p>
				  `;
	}
};



let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
	//select ListItems children
	let checkBox = taskListItem.querySelector("input[type=checkbox]");
	let deleteButton = taskListItem.querySelector(".delete");
	let editButton = taskListItem.querySelector(".edit");
	let redButton = taskListItem.getElementsByClassName("red")[0];
	let yellowButton = taskListItem.getElementsByClassName("yellow")[0];
	let greenButton = taskListItem.getElementsByClassName("green")[0];
	let whiteButton = taskListItem.getElementsByClassName("white")[0];

	//change color of task
	function changeColorTask(color) {
		taskListItem.style.backgroundColor = color;
	}

	redButton.addEventListener("click", function () { //change color theme to red
		changeColorTask("#ffbec4")
	});
	yellowButton.addEventListener("click", function () { //change color theme to yellow
		changeColorTask("#fefeba")
	});
	greenButton.addEventListener("click", function () { //change color theme to green
		changeColorTask("#d8ffdc")
	});
	whiteButton.addEventListener("click", function () { //change color theme to white
		changeColorTask("#ffffff")
	});


	//Bind editTask to edit button.
	editButton.addEventListener("click", editTask);
	//Bind deleteTask to delete button.

	deleteButton.onclick = deleteTask;
	deleteButton.addEventListener("click", count);

	//Bind taskCompleted to checkBoxEventHandler.
	checkBox.onchange = checkBoxEventHandler;
	checkBox.addEventListener("change", count);
};
//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {

	//bind events to list items chldren(tasksCompleted)
	bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
};

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
	//bind events to list items chldren(tasksIncompleted)
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
};

let asc = document.getElementById("asc");
let desc = document.getElementById("desc");

//sort filter asc
let ascFilter = function () {
	let element = document.getElementById("incompleteTasks");
	let elementChildren = element.getElementsByTagName("li");
	let numberOfChildren = elementChildren.length;

	for (let i = 0; i < numberOfChildren - 1; i++) {
		for (let j = 0; j < numberOfChildren - 1 - i; j++) {
			let datej = Date.parse(elementChildren[j].getElementsByClassName("time")[0].getElementsByTagName("p")[0].innerHTML);
			let datej1 = Date.parse(elementChildren[j + 1].getElementsByClassName("time")[0].getElementsByTagName("p")[0].innerHTML);
			if (datej1 > datej) {
				element.insertBefore(elementChildren[j + 1], elementChildren[j]);
			}
		}
	}
};

//sort filter desc
let descFilter = function () {
	let element = document.getElementById("incompleteTasks");
	let elementChildren = element.getElementsByTagName("li");
	let numberOfChildren = elementChildren.length;

	for (let i = 0; i < numberOfChildren - 1; i++) {
		for (let j = 0; j < numberOfChildren - 1 - i; j++) {
			let datej = Date.parse(elementChildren[j].getElementsByClassName("time")[0].getElementsByTagName("p")[0].innerHTML);
			let datej1 = Date.parse(elementChildren[j + 1].getElementsByClassName("time")[0].getElementsByTagName("p")[0].innerHTML);
			if (datej1 < datej) {
				element.insertBefore(elementChildren[j + 1], elementChildren[j]);
			}
		}
	}

};

asc.addEventListener("click", ascFilter);
desc.addEventListener("click", descFilter);