//UI VARIABLES
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.getElementById('task');

//function to load all event listeners
loadEventListener();
//function to load
function loadEventListener() {
    //DOM lOAD EVENT
    document.addEventListener('DOMContentLoaded', getTasks)
    //This is to add task to list
    form.addEventListener('submit', addTask);
    //this is to remove task from list
    taskList.addEventListener('click', removeTask);
    //this is to clear all tasks
    clearBtn.addEventListener('click', clearTasks);
    //this is to filter tasks
    filter.addEventListener('keyup', filterTasks);
}
//function to get tasks from local storage

function getTasks() {
    let tasks;
if (localStorage.getItem('tasks') === null) {
    tasks = [];
}else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}
tasks.forEach(function (task) {
//create the lists for the ul
const li = document.createElement('li');
//add a class
li.className = 'collection-item';
//create text node and append to li
const textN = document.createTextNode(task);
li.appendChild(textN);
//create a link element
const link = document.createElement('a');
link.className = 'delete-item secondary-content';
link.innerHTML = '<i class = "fa fa-remove"></i>';

//Append link to li

li.appendChild(link);

//Append li to ul

taskList.appendChild(li);
})   
};

//function to add tasks

function addTask(e) {
    
if (taskInput.value === '') {
    alert ('Please enter an Input');
}
//create the lists for the ul
const li = document.createElement('li');
//add a class
li.className = 'collection-item';
//create text node and append to li
const textN = document.createTextNode(taskInput.value);
li.appendChild(textN);
//create a link element
const link = document.createElement('a');
link.className = 'delete-item secondary-content';
link.innerHTML = '<i class = "fa fa-remove"></i>';

//Append link to li

li.appendChild(link);

//Append li to ul

taskList.appendChild(li);

// add to Local Storage
storeTaskInLocalStorage(taskInput.value);

//clear input
taskInput.value = '';
e.preventDefault();


   
}

//function to add tasks to local storage

function storeTaskInLocalStorage(task) {
let tasks;
if (localStorage.getItem('tasks') === null) {
    tasks = [];
}else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}
tasks.push(task);
localStorage.setItem('tasks', JSON.stringify(tasks));
}

//function to remove tasks

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        }
        removeTasksFromLocalStorage(e.target.parentElement.parentElement);
        
    }
    e.preventDefault();
}

//function to remove tasks from LS
function removeTasksFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if (taskItem.textContent===task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//function to clear tasks

function clearTasks(e) {
    taskList.innerHTML = '';


    // e.preventDefault();
    clearTasksFromLocalStorage();
}
//function to clear tasks from local storage

function clearTasksFromLocalStorage() {
    localStorage.clear();
}
//function to filter tasks

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach
    (function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block'
    }else {
        task.style.display = 'none';
    }
    });
    
    e.preventDefault();
}