let submit = document.getElementById('submit')
let ulList=document.getElementById('ulList')
let editForm= document.getElementById('editForm')
let priSelect= document.getElementById('prior')
let notesList=document.getElementById('notesList')
let notesForm=document.getElementById('notesForm')
var modal = document.getElementById("myModal")
var span = document.getElementsByClassName("close")[0];
var modal2 = document.getElementById("myModal2")
var span2 = document.getElementsByClassName("close2")[0];
var modal3 = document.getElementById("myModal3")
var span3 = document.getElementsByClassName("close3")[0];


submit.onclick = function()
{
  addTodos()
}

//function that add new todo
async function addTodos()
{  
  var task =
  {
    title: document.getElementById('title').value,
    description:document.getElementById('desc').value,
    priority: document.getElementById('priority').value,
    due:document.getElementById('due').value
  }

const resp = await fetch('/todos', { method: 'POST' , body: JSON.stringify(task),
headers: { "Content-type": "application/json; charset=UTF-8"}})

alert("New task added")

}

//display all the todos in list
async function getTodos()
{ 
  console.log("hii")
  var tomorrow = new Date();
  tomorrow.setDate(new Date().getDate()+1);
  var finalDate = tomorrow.toISOString().split('T')[0]
  document.getElementById('due').value=finalDate

  const resp =await fetch('/todos',{method:'GET'})
  const todos = await resp.json()

  todos.forEach(element => {
    var x=document.createElement('li')
    x.textContent="ID:  "+ element.id + " , TITLE:  "+ element.title+" , COMPLETED YET:  "+
     element.status   +" , PRIORITY:  "+ element.priority+", DUE DATE: "+ element.due


var editButton=document.createElement('INPUT')
editButton.setAttribute('type','submit')
editButton.setAttribute("value",'edit')
editButton.setAttribute("id","myBtn2")
editButton.setAttribute("onclick","editTodo("+element.id+")")

var notesButton=document.createElement('INPUT')
notesButton.setAttribute('type','submit')
notesButton.setAttribute("value",'show notes')
notesButton.setAttribute("id","myBtn")
notesButton.setAttribute("onclick","showNotes("+element.id+")")

var addNoteButton=document.createElement('INPUT')
  addNoteButton.setAttribute("type","submit")
  addNoteButton.setAttribute("value","add notes")
  addNoteButton.setAttribute("id","myBtn3")
  addNoteButton.setAttribute("onclick","NotesForm("+element.id+")")

    ulList.appendChild(x)
    ulList.appendChild(editButton)
    ulList.appendChild(notesButton)
    ulList.appendChild(addNoteButton)
  });
  
}

//display edit form for todo
async function editTodo(tid)
{
  var btn = document.getElementById("myBtn2")

  const resp =await fetch(`/todos/${tid}`,{method:'GET'}) 
  const todos = await resp.json()

  var dueDate= document.createElement('INPUT')
  dueDate.setAttribute("type","date")
  dueDate.setAttribute("value",todos.due)
  dueDate.setAttribute("id","newdate")
  editForm.appendChild(dueDate)

  var prior= document.createElement('INPUT')
  prior.setAttribute("type","text")
  prior.setAttribute("value",todos.priority)
  prior.setAttribute("id","newprior")
  editForm.appendChild(prior)

  var taskState= document.createElement('INPUT')
  taskState.setAttribute("type","text")
  taskState.setAttribute("value",todos.status)
  taskState.setAttribute("id","newstatus")
  editForm.appendChild(taskState)

  var saveButton=document.createElement('INPUT')
  saveButton.setAttribute("type","submit")
  saveButton.setAttribute("value","save")
  saveButton.setAttribute("onclick","updateTodos("+tid+")")
  editForm.appendChild(saveButton)
 
  modal2.style.display= "block";
  span2.onclick = function() {
    modal2.style.display = "none";
    location.reload();
  }
  window.onclick = function(event) {
    if (event.target == modal2) {
      modal2.style.display = "none";
      location.reload();
    }
  }

}

//update the changes made by user to edit the todo
async function updateTodos(tid)
{  
  var task =
  {   
    status: document.getElementById('newstatus').value,
    priority: document.getElementById('newprior').value,
    due:document.getElementById('newdate').value
  }

  
  const resp = await fetch(`/todos/${tid}`, { method: 'PATCH' , body: JSON.stringify(task),
  headers: { "Content-type": "application/json; charset=UTF-8"}})
  alert("Task Updated")
}

//display notes in form of list
async function showNotes(taskId)
{
  modal.style.display= "block";
  var btn = document.getElementById("myBtn")

  const resp =await fetch(`/todos/${taskId}/notes`,{method:'GET'})
  const notes = await resp.json()
  notes.forEach(element=>{
    var x=document.createElement('li')
    x.textContent=element.notes
    notesList.appendChild(x)
  });

  span.onclick = function() {
    modal.style.display = "none";
    location.reload()

  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none"
    }
  }
}

//display form to create new todo
async function NotesForm(taskID)
{
  var btn = document.getElementById("myBtn3")
  modal3.style.display= "block";
  var br1= document.createElement('br')
var notesBox=document.createElement('INPUT')
notesBox.setAttribute("type","text")
notesBox.setAttribute("id","notesData")
notesForm.appendChild(notesBox)

notesForm.appendChild(br1)

var notesSubmitButton=document.createElement('INPUT')
notesSubmitButton.setAttribute("type","submit")
notesSubmitButton.setAttribute("onclick","AddNotes("+taskID+")")
notesForm.appendChild(notesSubmitButton)

span3.onclick = function() {
  modal3.style.display = "none";
  location.reload();
}
window.onclick = function(event) {
  if (event.target == modal3) {
    modal3.style.display = "none";
    location.reload();
  }
}

}

//add new note in db
async function AddNotes(taskId)
{
  var note={
    id:taskId,
    notes:document.getElementById('notesData').value
  }

  const resp = await fetch(`/todos/${taskId}/notes`, { method: 'POST' , body: JSON.stringify(note),
headers: { "Content-type": "application/json; charset=UTF-8"}})

alert("New Note added")

}