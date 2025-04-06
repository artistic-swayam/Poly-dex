//import firebase from "firebase/compat/app";
const provider = new GoogleAuthProvider();
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword ,
    signInWithEmailAndPassword,
    onAuthStateChanged  ,
    updateProfile,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
      } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
      import {
        getFirestore,
        collection,
        addDoc,
        getDoc,
        getDocs,
        doc,
        setDoc,
        updateDoc,
        deleteDoc,
        onSnapshot,
      } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {//
  apiKey: "AIzaSyC5FCzhbeocXFQTy3a7T8OOoT3Ya7QKy3s",
  authDomain: "poly-dex.firebaseapp.com",
  projectId: "poly-dex",
  storageBucket: "poly-dex.firebasestorage.app",
  messagingSenderId: "45959209468",
  appId: "1:45959209468:web:cfccfd8da291634bf19279",
  measurementId: "G-3D703KN4PE"
};
//w+reu8
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;//
const db = getFirestore(app);
let currentId = null;

// Firebase



//notes db
function read(){
    const noteT = document.querySelector(".noteT").value;
    const noteC = document.querySelector(".noteC").value;
    const taskT = document.querySelector(".taskT").value;
    const journalT = document.querySelector(".journalT").value;
    const journalC = document.querySelector(".journalC").value;
}
read();



//variables
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
const info = document.querySelector("h4");

//page shifts
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



// Note Classepr99pr8+7PR
class Note {
    constructor(clone = false, docId = null) {
        this.element = clone ? this.createNewNote() : originalNote;
        this.preview = this.element.querySelector(".notes-preview");
        this.nameInput = this.element.querySelector(".notes-task-name");
        this.contentInput = this.element.querySelector(".notes-task-place");
        this.saveBtn = this.element.querySelector(".save-btn");
        this.deleteBtn = this.element.querySelector(".delete-btn");//
        this.docId = docId;
        this.element.setAttribute("data-id", docId);//
        this.initialize();
    }

    createNewNote() {//wp0u7re
        
        const newNote = document.createElement('div');
        //
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

    async save() {
        this.preview.textContent = this.nameInput.value || "Untitled Note";
        this.preview.classList.remove("none");
        this.nameInput.classList.add("none");
        this.contentInput.classList.add("none");
        this.saveBtn.classList.add("none");
        notes_all.querySelector("h3").innerText = "'Double Click to edit'";
    
        const noteId = this.element.getAttribute("data-id");
        const notesRef = collection(db, "users", currentId, "notes");
        const noteData = {
            title: this.nameInput.value || "Untitled Note",
            content: this.contentInput.value || ""
        };
    
        if (!noteId || noteId === "null" || noteId === "undefined") {
            try {
                const docRef = await addDoc(notesRef, noteData);
                this.docId = docRef.id;
                this.element.setAttribute("data-id", docRef.id); // 🔥 THIS LINE FIXES IT
                console.log("✅ New note saved with ID:", docRef.id);
            } catch (error) {
                console.error("❌ Firestore Error:", error);
            }
        } else {
            try {
                const docRef = doc(notesRef, noteId);
                await updateDoc(docRef, noteData);
                console.log("🔄 Note updated with ID:", noteId);
            } catch (error) {
                console.error("❌ Update error:", error);
            }
        }
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
    
        constructor(clone = false, docId = null) {
            this.element = clone ? this.createNewTask() : originalTask;//9u+ee+r
            this.preview = this.element.querySelector(".notes-preview");
            this.nameInput = this.element.querySelector(".notes-task-name");//rerppe8upwpr9pu+ppu
            this.saveBtn = this.element.querySelector(".save-btn");
            this.deleteBtn = this.element.querySelector(".delete-btn");
            this.doneBtn = this.element.querySelector(".check");
            this.docId = docId;
            this.element.setAttribute("data-id", docId);//
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
				<input type="text" class="notes-task-name taskT" placeholder="Add task"></input>
			</div>
			<div class="icons">
				
				<i class="ri-delete-bin-6-line delete-btn"></i>
				<button class="save-btn"><h4>save</h4></button>
				<!-- <button class="save-btn"><h4>save</h4></button>+++rw7u wee3'0pepr++8peprw9rrr-->
			</div>
        `;
        return newTask;
    }
    initialize() {
        this.element.addEventListener("dblclick", () => this.expand());//
        this.deleteBtn.addEventListener("click", () => this.delete());//
        this.saveBtn.addEventListener("click", () => this.save());
        this.doneBtn.addEventListener("change", (e) => {
            if (e.target.checked) {
                console.log("Task completed!");
                // You can also apply styling (e.g., strike-through)
                this.preview.style.textDecoration = "line-through";
                this.nameInput.style.textDecoration = "line-through";
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
        this.saveBtn.classList.remove("none");
    }

    async save() {
        this.preview.textContent = this.nameInput.value || "Untitled Note";
        this.preview.classList.remove("none");
        this.nameInput.classList.add("none");
        this.saveBtn.classList.add("none");
        tasks_all.querySelector("h3").innerText = "'Double Click to edit'";

        const taskId = this.element.getAttribute("data-id");
        const tasksRef = collection(db, "users", currentId, "tasks");
        const taskData = {
            title: this.nameInput.value || "Untitled Note",
        };
    
        if (!taskId || taskId === "null" || taskId === "undefined") {
            try {
                const docRef = await addDoc(tasksRef, taskData);
                this.docId = docRef.id;
                this.element.setAttribute("data-id", docRef.id); // 🔥 THIS LINE FIXES IT
                console.log("✅ New task saved with ID:", docRef.id);
            } catch (error) {
                console.error("❌ Firestore Error:", error);
            }
        } else {
            try {
                const docRef = doc(tasksRef, taskId);
                await updateDoc(docRef, taskData);
                console.log("🔄 task updated with ID:", taskId);
            } catch (error) {
                console.error("❌ Update error:", error);
            }
        }
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

//fetch acc data

onAuthStateChanged(auth, async (user) => {
    if (user) {
      updateUserProfile(user);
      currentId = user.uid;
      const userRef = doc(db, "users", currentId);
      const notesRef = collection(db, "users", currentId, "notes");
      const tasksRef = collection(db, "users", currentId, "tasks");
      console.log("Logged in as:", currentId);
      
      //load user data
      const querySnapshot = await getDocs(notesRef);
      querySnapshot.forEach((doc) => {
        notes_all.querySelector("h3").innerText="'Double Click to edit'";//
        tasks_all.querySelector("h3").innerText="'Double Click to edit'";//
      console.log(doc.id, "=>", doc.data());
      const noteData = doc.data();//+9P9P
      const taskData = doc.data();
      const newNote = new Note(true, doc.id);
      const newTask = new Task(true, doc.id);


      newNote.nameInput.value = noteData.title || "Untitled Note";
      newNote.contentInput.value = noteData.content || "";
      newNote.preview.textContent = noteData.title || "Untitled Note";
      newNote.preview.classList.remove("none");
      newNote.nameInput.classList.add("none");
      newNote.contentInput.classList.add("none");
      newNote.saveBtn.classList.add("none");//
      notes_all.appendChild(newNote.element);   
    });
    const tasksSnapshot = await getDocs(tasksRef);
    tasksSnapshot.forEach((doc) => {
        const taskData = doc.data();
        const newTask = new Task(true, doc.id);
      
        newTask.nameInput.value = taskData.title || "Untitled Task";
        newTask.preview.textContent = taskData.title || "Untitled Task";
        newTask.preview.classList.remove("none");
        newTask.nameInput.classList.add("none");
        newTask.saveBtn.classList.add("none");
        tasks_all.appendChild(newTask.element);
      });


      try {
        // Save basic user info
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
            // First-time signup — set user profile and create subcollections
            await setDoc(userRef, {
              uid: currentId,
              name: user.displayName || "User",
              email: user.email || "No email provided",
              createdAt: new Date()
            });
          
            console.log("✅ User profile created");
            const subcollections = ["notes", "tasks", "journals"];
            for (let name of subcollections) {
                const subColRef = collection(db, "users", currentId, name);
                await addDoc(subColRef, {
                  init: true,
                  timestamp: new Date()
                });
              }
              console.log("✅ Subcollections created");
            } else {
                console.log("👀 User already exists, skipping setup");
            }
  
      } catch (error) {
        console.error("Error during setup:", error.message);
      }
    } else {
      console.log("User is signed out");
    }
  });
  
function updateUserProfile(user) {
    const userName = user.displayName || "User";
    const userEmail = user.email || "No email provided";
    document.querySelector(".userName").textContent = userName;
    document.querySelector(".userEmail").textContent = userEmail;
  }
  
// Logout function
document.querySelector(".logOutBtn").addEventListener("click", () => {
    signOut(auth).then(() => {
        console.log("User signed out");      
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Error signing out:", error.message);
    });
});

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

// Update search to handle both notes and tasks
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    const allItems = document.querySelectorAll('.notes, .task');
    
    allItems.forEach(item => {
        const name = item.querySelector('.notes-preview, .task-preview').textContent.toLowerCase();
        const content = item.querySelector('.notes-task-place, .notes-task-name')?.value.toLowerCase() || '';
        item.style.display = (name.includes(searchTerm) || content.includes(searchTerm)) 
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
    info.innerText = "";
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
    info.innerText = "";
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
    info.innerText = "";
})
account_pg_btn.addEventListener("click",()=>{
    console.log("clicked");
    remove(notes_all);
    remove(tasks_all);
    remove(journal_all);
    show(account_all);
    hero.innerText = "User"+account_pg_btn.textContent;
    hero.style.lineHeight = "1";
    info.innerText = "";
})
//



    
