let textValue = document.querySelector("[type='text']");
let btnValue = document.querySelector("[type='button']");
let btnValue1 = document.querySelectorAll("[type='button']")[1];
let divTask = document.querySelector(".contaner .tasks");
let valueArray = [];
// check if there is data inlocalstorage
if (localStorage.getItem("tasks")) {
  valueArray = JSON.parse(localStorage.getItem("tasks"))
}
getfromlocalstorage()
divTask.addEventListener("click",function(e){
  if (e.target.classList.contains("del")) {
    // remove from body
    e.target.parentElement.remove();
    // remove from localstorage
    DeletTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
  }
  if (e.target.classList.contains("task")) {
    // add done to body
    e.target.firstElementChild.classList.toggle("done");
    // add done to localstorage
    addCompelteToLcocalStorage(e.target.getAttribute("data-id"));
  }
})
//when click in add task
btnValue.addEventListener("click",function(){
  if (textValue.value !== "") {
    //add element to body
    addToArray(textValue.value);
    textValue.value="";
    textValue.focus()
  }
});
// btn to remove all tasks
btnValue1.addEventListener("click",function(){
  divTask.innerHTML="";
  valueArray=[];
  localStorage.clear();
});
//add element to Array
function addToArray(text){
  let task = {
    id:Date.now(),
    title:text,
    completed:false
  }
  valueArray.push(task);
  // console.log(valueArray)
  //add element to body
  addToBody(valueArray);
  //add element to localstorage
  addtolocalstorage(valueArray);
}
//add element to body
function addToBody(valueArray) {
  //empty divTasks
  divTask.innerHTML="";
  valueArray.forEach(function(task){
    //create divtask and put data-id&class
    let div =document.createElement(`div`);
    div.classList.add("task");
    div.setAttribute("data-id",task.id)
    
    let p =document.createElement(`p`);
    p.classList.add("title");
    p.appendChild(document.createTextNode(task.title))
    // add p to task
    div.appendChild(p);
    
    if (task.completed) {
      p.classList.add("done");
    }
  
    //create spanbutton
    let span =document.createElement(`span`);
    //add span to task
    span.appendChild(document.createTextNode(`Delete`));
    //add text to span
    span.classList.add("del");
    //add span to task
    div.appendChild(span);
    //add task to tasks
    divTask.appendChild(div);
  });
};
//add element to localstorage 
function addtolocalstorage(valueArray) {
  window.localStorage.setItem("tasks",JSON.stringify(valueArray));
};
//get element from localstorage 
function getfromlocalstorage(){ 
  let data = window.localStorage.getItem("tasks")
  if(data){
    let tasks =JSON.parse(data);
    addToBody(tasks);
  };
};
// delet task from tasks
function DeletTaskFromLocalStorage(taskid){
  // filder valueArray
  valueArray = valueArray.filter(function(e){
    return e.id != taskid;
  });
  addtolocalstorage(valueArray);
};
// add done to localstorage
function addCompelteToLcocalStorage (taskid){
  for (let i = 0; i < valueArray.length; i++) {
    if(valueArray[i].id == taskid){
      valueArray[i].completed == false ? valueArray[i].completed = true : valueArray[i].completed = false;
    }
  }
  addtolocalstorage(valueArray);
}