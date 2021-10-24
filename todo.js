// Database elements
let toDos = [];

// HTML elements
let inputBox = document.querySelector("#inputBox");
let deleteBtn = document.querySelector(".delete-button");
let editBtn = document.querySelector(".edit-button");let addBtn = document.querySelector("#add-button");
let toDoList = document.querySelector("#to-do-list");
let editInput = document.querySelector("#edit");
let editModal = document.querySelector("#edit-modal");
let closeButtonOnModal = document.querySelector("#close-button");
let editButtonModal = document.querySelector("#edit-button-modal");
let toDoEditItemIndex = 0;
let mainContent = document.querySelector(".mainContainer")
let deleteAllButton = document.querySelector("#delete-all-button")
let todosPending = document.querySelector("#todos-pending")

// On event function

function refreshList(toDos) {
  toDoList.innerHTML = "";
  toDos.forEach((element) => {
    toDoList.innerHTML += `<li>
        <span>${element.value}</span>
        <div class=buttons-left>
        <button class="delete-button" onclick=deleteTask(${element.id})>Delete</button>
        <button class="edit-button" onclick=showModal(${element.id})>Edit</button>                            
        </div>
    </li>`;
  });
  
}

//deleting of tasks (single, all and selected)

function deleteTask(id) {
  let indexOfItemForDeletion = toDos.findIndex((x) => x.id == id);
  toDos.splice(indexOfItemForDeletion, 1);
  refreshList(toDos);
  todosPending.textContent = toDos.length

}

function deleteAllTasks(){
  toDos = [];
  todosPending.textContent = 0
  refreshList(toDos)
}

//editing the to-do

function editToDo() {
  let editInputText = editInput.value;
  let indexOfItemForEditing = toDos.findIndex((x) => x.id == toDoEditItemIndex);
  toDos[indexOfItemForEditing].value = editInputText;
  editModal.style.visibility = "hidden";
  this.todoEditItemIndex = 0;
  this.editInputText = "";
  refreshList(toDos);
  mainContent.style.filter ="blur(0px)"

}

//modal pop up
function showModal(index) {
  editModal.style.visibility = "visible";
  this.todoEditItemIndex = index;
  editInput.value = toDos.find((x) => x.id == toDoEditItemIndex).value ?? "";
  mainContent.style.filter ="blur(5px)"
}

function makeEditModalHidden() {
  editModal.style.visibility = "hidden";
  mainContent.style.filter ="blur(0)"
}

//adding a todo

function addToDo() {
  let toDoInputValue = inputBox.value;
  let toDo = {
    id: toDos.length,
    value: toDoInputValue,
  };

  if (inputBox.value === "") {
    alert("ToDo is empty!");
  } else {
    toDoList.style.visibility = "visible";
    toDos.push(toDo);
    refreshList(toDos);
    todosPending.textContent = toDos.length
  }
  
  inputBox.value = '';
}



// Event listeners
addBtn.addEventListener("click", addToDo);

closeButtonOnModal.addEventListener("click", makeEditModalHidden);

editButtonModal.addEventListener("click", editToDo);

deleteAllButton.addEventListener("click", deleteAllTasks)
