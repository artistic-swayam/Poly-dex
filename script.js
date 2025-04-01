const nav = document.querySelector(".nav");
const menu = document.querySelector(".menu-btn");
const close = document.querySelector(".close-btn");//+erh67//7889u9
const navigator = document.querySelectorAll(".navigator");//e

const addBtn1 = document.querySelector(".add1");
const addBtn2 = document.querySelector(".add2");
const addBtn3 = document.querySelector(".add3");

const notesContainer = document.querySelector(".notes-task-area");
const originalNote = document.querySelector(".notes");
const originalTask = document.querySelector(".task");
const originalJournal = document.querySelector(".journal");
const hero = document.querySelector("h1");

//page shiftsh6
const notes_pg_btn = document.querySelector("#notes_bt");
const tasks_pg_btn = document.querySelector("#tasks_bt");
const journal_pg_btn = document.querySelector("#journal_bt");
const account_pg_btn = document.querySelector("#account_bt");



const notes_all = document.querySelector("#notes_all");
const tasks_all = document.querySelector("#tasks_all");
const journal_all = document.querySelector("#journal_all");
const account_all = document.querySelector("#account_all");


const tl = gsap.timeline();

// Navigation animationspw9+u9u8uewp+99+p7898e99
nav.addEventListener("click", () => navClose());//
menu.addEventListener("click", () => navShow());
close.addEventListener("click", () => navClose());

function navShow() {
    tl.to(nav, { top: 0, duration: 0.5, ease: "expo.out" });
}

function navClose() {
    tl.to(nav, { top: "-100%", duration: 0.5, ease: "expo.in" });
}

// Note Classepr99pr
class Note {
    constructor(clone = false) {
        this.element = clone ? this.createNewNote() : originalNote;
        this.preview = this.element.querySelector(".notes-preview");
        this.nameInput = this.element.querySelector(".notes-task-name");
        this.contentInput = this.element.querySelector(".notes-task-place");
        this.saveBtn = this.element.querySelector(".save-btn");
        this.deleteBtn = this.element.querySelector(".delete-btn");//
        this.initialize();
    }

    createNewNote() {//wp0u7re
        
        const newNote = document.createElement('div');
        newNote.className = 'notes';
        newNote.innerHTML = `
            <h3 class="notes-preview none">Name</h3>
            <input type="text" class="notes-task-name" placeholder="Add name">
            <textarea class="notes-task-place" placeholder="Type here..."></textarea>
            <div class="icons">
                <i class="ri-delete-bin-6-line delete-btn"></i>
                <button class="save-btn"><h4>save</h4></button>
            </div>
        `;
        return newNote;
    }
    
    initialize() {
        this.element.addEventListener("dblclick", () => this.expand());
        this.saveBtn.addEventListener("click", () => this.save());
        this.deleteBtn.addEventListener("click", () => this.delete());
        this.contentInput.addEventListener("input", this.autoResize);
    }

    expand() {
        this.preview.classList.add("none");
        this.nameInput.classList.remove("none");
        this.contentInput.classList.remove("none");
        this.saveBtn.classList.remove("none");
    }

    save() {
        this.preview.textContent = this.nameInput.value || "Untitled Note";
        this.preview.classList.remove("none");
        this.nameInput.classList.add("none");
        this.contentInput.classList.add("none");
        this.saveBtn.classList.add("none");
        notes_all.querySelector("h3").innerText="'Double Click to edit'"
    }

    delete() {
        this.element.remove();
    }

    autoResize() {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    }
}
//Task class
class Task{
    
        constructor(clone = false) {
            this.element = clone ? this.createNewTask() : originalTask;//9u+ee+r
            this.preview = this.element.querySelector(".notes-preview");
            this.nameInput = this.element.querySelector(".notes-task-name");//rerppe8upwpr9pu+ppu
            this.deleteBtn = this.element.querySelector(".delete-btn");
            this.doneBtn = this.element.querySelector(".check");
            this.initialize();
        }

        createNewTask() {
        const newTask = document.createElement('div');
        newTask.className = 'task';//
        newTask.innerHTML = `
			<div class="task-area">
				<!-- From Uiverse.io by SelfMadeSystem '-.'-++9+r98rp'--> 
				<label class="container">
					<input type="checkbox" class="check">
					<svg viewBox="0 0 64 64" height="1em" width="1em">
					  <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
					</svg>
				</label>
                <h3 class="notes-preview none">Name</h3>
				<input type="text" class="notes-task-name" placeholder="Add task"></input>
			</div>
			<div class="icons">

				<i class="ri-delete-bin-6-line delete-btn"></i>
			</div>
        `;
        return newTask;
    }
    initialize() {
        this.element.addEventListener("dblclick", () => this.expand());//
        this.deleteBtn.addEventListener("click", () => this.delete());//
        this.doneBtn.addEventListener("change", (e) => {
            if (e.target.checked) {
                console.log("Task completed!");
                // You can also apply styling (e.g., strike-through)
                this.preview.style.textDecoration = "line-through";
                this.nameInput.style.textDecoration = "line-through";
                this.save();
            } else {
                console.log("Task unchecked!");
                this.preview.style.textDecoration = "none";
                this.nameInput.style.textDecoration = "none";
            }
        });
    }

    expand() {
        this.preview.classList.add("none");
        this.nameInput.classList.remove("none");//
    }

    save() {
        this.preview.textContent = this.nameInput.value || "Untitled Task";//
        this.preview.classList.remove("none");
        this.nameInput.classList.add("none");//
        tasks_all.querySelector("h3").innerText="'Double Click to edit'"//wp
    }

    delete() {
        this.element.remove();
    }

    autoResize() {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    }
}

//Journal class
class Journal{
    
    constructor(clone = false) {
            this.element = clone ? this.createNewJournal() : originalJournal;//9u+ee+r
            this.preview = this.element.querySelector(".notes-preview");//rerppe8upwpr9pu+ppu
            this.deleteBtn = this.element.querySelector(".delete-btn");
            this.contentInput = this.element.querySelector(".notes-task-place");
            this.saveBtn = this.element.querySelector(".save-btn");
            this.initialize();
        }

        createNewJournal() {
        const newJournal = document.createElement('div');
        newJournal.className = 'journal';//
        newJournal.innerHTML = `
			<h3 class="notes-preview">1st jan,2025</h3>
				<textarea name="" id="" class="notes-task-place" placeholder="Type here..."></textarea>
				<div class="icons">
					<i class="ri-arrow-down-wide-line ex-btn none"></i>
					<i class="ri-delete-bin-6-line delete-btn"></i>
					<button class="save-btn"><h4>save</h4></button>
				</div>
        `;
        return newJournal;
    }
    initialize() {
        this.element.addEventListener("dblclick", () => this.expand());
        this.saveBtn.addEventListener("click", () => this.save());
        this.deleteBtn.addEventListener("click", () => this.delete());
        this.contentInput.addEventListener("input", this.autoResize);
    }

    expand() {
        this.contentInput.classList.remove("none");
        this.saveBtn.classList.remove("none");
    }

    save() {
        //this.preview.textContent = this.nameInput.value || "Untitled Task";
        this.contentInput.classList.add("none");//
        this.saveBtn.classList.add("none");
        journal_all.querySelector("h3").innerText="'Double Click to edit'"//wp
    }

    delete() {
        this.element.remove();
    }

    autoResize() {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    }
}



// Initialize original note
const mainNote = new Note();
const mainTask = new Task();
const mainJournal = new Journal();
// Add New Note
addBtn1.addEventListener("click", () => {
    const newNote = new Note(true);
    notes_all.appendChild(newNote.element);
    newNote.expand();
    console.log("added");
    hero.innerText = notes_pg_btn.textContent;
    hero.style.lineHeight = "1";
});
addBtn2.addEventListener("click", () => {
     const newTask = new Task(true);
     tasks_all.appendChild(newTask.element);//8up+r898w
     newTask.expand();
 });
addBtn3.addEventListener("click", () => {
    const newJournal = new Journal(true);
    journal_all.appendChild(newJournal.element);//8up+r898w
    newJournal.expand();
});


// Textarea Auto-resize
// document.querySelectorAll('textarea').forEach(textarea => {
//     textarea.addEventListener('input', function() {
//         this.style.height = "auto";
//         this.style.height = this.scrollHeight + "px";
//     });
// });


//search feature
const searchInput = document.querySelector('.search');

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    const allNotes = document.querySelectorAll('.notes:not(.none)');
    
    allNotes.forEach(note => {
        const noteName = note.querySelector('.notes-preview').textContent.toLowerCase();
        const noteContent = note.querySelector('.notes-task-place').value.toLowerCase();
        note.style.display = (noteName.includes(searchTerm) || noteContent.includes(searchTerm)) 
                            ? 'block' 
                            : 'none';
    });
});







function show(elem){
    elem.classList.remove("none");
}
function remove(elem){
    elem.classList.add("none");
}
let current_pg = "";

document.querySelectorAll(".navigator").forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        console.log("prevent");
        current_pg= e.target.textContent.trim();
        console.log(current_pg);
    })
})

notes_pg_btn.addEventListener("click",()=>{
    console.log("clicked");
    show(addBtn1);
    remove(addBtn2);
    remove(addBtn3);  
    show(notes_all);
    remove(tasks_all);
    remove(journal_all);
    remove(account_all);
    hero.innerText = notes_pg_btn.textContent;
    hero.style.lineHeight = "1";
})
tasks_pg_btn.addEventListener("click",()=>{
    console.log("clicked");
    remove(addBtn1);
    show(addBtn2);
    remove(addBtn3); 

    remove(notes_all);
    show(tasks_all);
    remove(journal_all);
    remove(account_all);
    hero.innerText = tasks_pg_btn.textContent;
    hero.style.lineHeight = "1";
})
journal_pg_btn.addEventListener("click",()=>{
    console.log("clicked");
    remove(addBtn1);
    remove(addBtn2);
    show(addBtn3); 

    remove(notes_all);
    remove(tasks_all);
    show(journal_all);
    remove(account_all);
    hero.innerText = journal_pg_btn.textContent;
    hero.style.lineHeight = "1";
})
account_pg_btn.addEventListener("click",()=>{
    console.log("clicked");
    remove(notes_all);
    remove(tasks_all);
    remove(journal_all);
    show(account_all);
})
// dede7pi+9eurpuw7p9e979wu8uiup+ewpe+u7p+7ue7p97++9ru+r
