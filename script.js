const counter= document.getElementById("counter")
const remainingcount= document.getElementById("remainingcount")
const taskInput= document.getElementById("taskInput")
const taskList= document.getElementById("taskList")
function addTask(){
    if (taskInput.value===""){
        alert("please type text first");
    }
    else{
        let li=document.createElement("li")
        li.innerHTML= taskInput.value;
        taskList.appendChild(li);
        let span=document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span)
    }
    taskInput.value="";
    saveData();
    updateCounter();

}
taskList.addEventListener("click",function(e){
    if (e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName==="SPAN"){
        e.target.parentElement.remove();
        saveData();
        updateCounter();
    }
},false);
function saveData(){
    localStorage.setItem("data",taskList.innerHTML);
}
function showTask(){
    taskList.innerHTML=localStorage.getItem("data");
    updateCounter();
}
showTask();

function updateCounter() {
    let listItems = taskList.getElementsByTagName("li");
    let allTasks = [];
    for (let i = 0; i < listItems.length; i++) {
        allTasks.push(listItems[i]);
    }
     let totalCount = allTasks.length;
    
    let pendingTasksArray = allTasks.filter(function(item) {
        return !item.classList.contains("checked");
    });
    let pendingCount = pendingTasksArray.length;
    document.getElementById("counter").innerHTML = "Tasks: " + totalCount + " | Pending: " + pendingCount;

}
function clearAllTasks() {
    taskList.innerHTML = "";
    localStorage.setItem("data", taskList.innerHTML);
    updateCounter();
}