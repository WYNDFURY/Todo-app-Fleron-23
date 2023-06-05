
localStorage.tasks = JSON.stringify([
    {id: 1, content: "Tâche 1", completed: true},
    {id: 2, content: "Tâche 2", completed: false}
]);



if (localStorage.tasks === undefined) {
  localStorage.tasks = JSON.stringify([]);
}

// console.table(JSON.parse(localStorage.tasks));
const tasks = JSON.parse(localStorage.tasks);

tasks.forEach(task => {
  const add = document.createElement("li");
  if (task.completed) {
    add.classList.add('completed');
  } 
  add.innerHTML = '<div class="view"><input class="toggle" type="checkbox" checked /><label>' + task.content + '</label><button class="destroy"></button></div>';
  document.querySelector(".todo-list").appendChild(add);
});

console.log('script chargé');
// document.querySelectorAll('.todo-input').forEach((trigger)=> {
//     trigger.addEventListener("keyup", function(e) {
//         if(e.key === "Enter"){
//             const add = document.createElement("li");
//             add.innerHTML = this.value;
//             document.querySelector(".todos-lists").appendChild(add);
//             document.querySelector(".todo-input").value = "";
//         }})
// })


