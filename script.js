const nav = document.querySelector(".nav");
const menu = document.querySelector(".menu-btn");
const close = document.querySelector(".close-btn");
const addBtn = document.querySelector(".task-add");
const notesContainer = document.querySelector(".notes-task-area");
const originalNote = document.querySelector(".notes");
const hero = document.querySelector("h1");
const tl = gsap.timeline();

// Navigation animationsp
menu.addEventListener("click", () => navShow());
close.addEventListener("click", () => navClose());

function navShow() {
    tl.to(nav, { top: 0, duration: 0.5, ease: "expo.out" });
}

function navClose() {
    tl.to(nav, { top: "-100%", duration: 0.5, ease: "expo.in" });
}

// Note Class
class Note {
    constructor(clone = false) {
        this.element = clone ? this.createNewNote() : originalNote;
        this.preview = this.element.querySelector(".notes-preview");
        this.nameInput = this.element.querySelector(".notes-task-name");
        this.contentInput = this.element.querySelector(".notes-task-place");
        this.saveBtn = this.element.querySelector(".save-btn");
        this.deleteBtn = this.element.querySelector(".delete-btn");
        
        this.initialize();
    }

    createNewNote() {
        
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
        document.querySelector("h3").innerText="'Double Click to expand'"
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

// Add New Note
addBtn.addEventListener("click", () => {
    hero.classList.add("none");
    const newNote = new Note(true);
    notesContainer.appendChild(newNote.element);
    newNote.expand();
});

// Textarea Auto-resize
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });
});
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



//page shifts
const notes_pg_btn = document.querySelector("#notes_bt");
const tasks_pg_btn = document.querySelector("#tasks_bt");
const journal_pg_btn = document.querySelector("#journal_bt");
const account_pg_btn = document.querySelector("#account_bt");

const notes_all = document.querySelector("#notes_all");
const tasks_all = document.querySelector("#tasks_all");
const journal_all = document.querySelector("#journal_all");
const account_all = document.querySelector("#account_all");



function show(elem){
    elem.classList.remove("none");
}
function remove(elem){
    elem.classList.add("none");
}

document.querySelectorAll(".navigator").forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        console.log("prevent");
    })
})

notes_pg_btn.addEventListener("click",()=>{
    console.log("clicked");
    show(notes_all);
    remove(tasks_all);
    remove(journal_all);
    remove(account_all);
})
tasks_pg_btn.addEventListener("click",()=>{
    console.log("clicked");
    remove(notes_all);
    show(tasks_all);
    remove(journal_all);
    remove(account_all);
})
journal_pg_btn.addEventListener("click",()=>{
    console.log("clicked");
    remove(notes_all);
    remove(tasks_all);
    show(journal_all);
    remove(account_all);
})
account_pg_btn.addEventListener("click",()=>{
    console.log("clicked");
    remove(notes_all);
    remove(tasks_all);
    remove(journal_all);
    show(account_all);
})
// dede7pi+9eurpuw7p9e979wu8uiup+ewpe+u7p+7ue7p97
