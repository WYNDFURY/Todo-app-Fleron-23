// Je remplis artificiellement le localStorage.tasks
// localStorage.tasks = JSON.stringify([
//     {id: 1, content: "Tâche 1", completed: true},
//     {id: 2, content: "Tâche 2", completed: false}
// ]);
// {id:xxx, content: 'xx', completed:xxx}

function getTaskDomElement (task) {
   const li = document.createElement("li");
   li.dataset.id = task.id;
   if (task.completed) {
       li.classList.add('completed');
   } 
   li.innerHTML = `
       <div class="view">
           <input class="toggle" type="checkbox" ${ task.completed ? 'checked': '' } />
           <label>${ task.content }</label>
           <button class="destroy"></button>
       </div>`;
   return li;
}

// 1. Initialiser le localstorage
// tasks -> []
   if (localStorage.tasks === undefined) {
       localStorage.tasks = JSON.stringify([]);
   }

// 2. Afficher les tasks dans le DOM
const ul = document.querySelector(".todo-list");
const tasks = JSON.parse(localStorage.tasks);
tasks.forEach(task => {
 ul.appendChild(getTaskDomElement(task));
});

// DEFI 3 : Affichage du cçmpte des actives tasks

let activeTasksMessage = document.querySelector('.todo-count');
function findActiveTasks() {
    return tasks.filter(function(task) {
        return task.completed === false;
        });
} 
let activeTasks = findActiveTasks();    
activeTasksMessage.innerHTML = "You have " + activeTasks.length + " active tasks."



// AJOUT D'UNE TÂCHE ------------------------------------------
// Keyup, enter et que le champ n'est pas vide
// Créer un li et l'ajouter dans le UL
// Il va falloir mettre à jour le tableau tasks et le localStorage
document.querySelector(".new-todo").addEventListener("keyup",function (e){
   if(e.key === "Enter" && this.value != ''){
       // 1. Créer un objet littéral
       const newTask = {
           id: new Date().valueOf(),
           content: this.value,
           completed: false,
       };

       // 2. Ajouter un li dans le ul (insertBefore)
       ul.insertBefore(getTaskDomElement(newTask), ul.firstChild);
       
       // 3. Ajouter la tâche dans tasks (push)
       tasks.unshift(newTask);

       // 4. Ecraser le localStorage.tasks avec les tasks
       //localStorage.setItem('tasks', JSON.stringify(tasks));
       localStorage.tasks = JSON.stringify(tasks);

       // 5. Vider le champs
       this.value = '';
   }
});
   
// TERMINER UNE TÂCHE ------------------------------------------
// Quand on change le checkbox
// 1. On ajoute ou on supprime la classe 'completed' sur le li correspondant (toogle)
// 2. On Modifie la task dans le tasks (true/false)
// 3. on écrase le localStorage.tasks

// ATTENTION: ne vous souciez que des tasks présentes au départ

// document.querySelectorAll(".toggle").forEach(trigger => {
//    trigger.addEventListener('change', function() {
//        this.closest('li').classList.toggle("completed");
//    })
// });




document.addEventListener('change', (e) => {
    if(e.target.matches(".toggle")){
        e.target.closest('li').classList.toggle("completed");
        const id = e.target.closest('li').dataset.id;
        const task = tasks.find(task => task.id == id);
        task.completed = !task.completed;

        localStorage.tasks = JSON.stringify(tasks);
    }

    // DEFI 3 suite :
    let activeTasks = findActiveTasks();
    activeTasksMessage.innerHTML = "You have " + activeTasks.length + " active tasks."
  
});








// DEFI 1:

document.querySelectorAll('.destroy').forEach( trigger => {
    trigger.addEventListener('click', function(e) {
        const id = this.closest('li').dataset.id;
        const task = tasks.find(task => task.id == id);
        const remove = tasks.indexOf(task);
        this.closest('li').remove();
        tasks.splice(remove, 1);

        localStorage.tasks = JSON.stringify(tasks);
    })
})


// DEFI 2 :

document.querySelectorAll('div.view').forEach( trigger => {
    trigger.addEventListener('dblclick', function(e) {
        if(document.createElement('input') != null){
            const labelValue = trigger.innerText;
            trigger.innerHTML = 
            `
            <input class='new-todo' type='text' value='${labelValue}'>
            <button class='destroy'></button>
            `;
            const triggerFocus = trigger.querySelector('input.new-todo');
            triggerFocus.focus();
            // triggerFocus.selectionStart = triggerFocus.value.length;
        }   
    })

    trigger.addEventListener('keyup', function(e){
        if(e.key === 'Enter'){
            const newLabel = trigger.querySelector('input.new-todo').value;
            trigger.innerHTML = 
            `
            <label>${newLabel}</label>
            <button class='destroy'></button>
            `;

        const id = trigger.closest('li').dataset.id;
        const task = tasks.find(task => task.id == id);
        task.content = newLabel;
        localStorage.tasks = JSON.stringify(tasks); 
        } 
    })
})

