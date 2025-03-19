const nav = document.querySelector(".nav");
const menu = document.querySelector(".menu-btn");
const close = document.querySelector(".close-btn");
const add = document.querySelector(".task-add");
const notes = document.querySelector(".notes");
const task = document.querySelector(".task");
const hero = document.querySelector("h1");
const preview = document.querySelector(".notes-preview");
const save = document.querySelector(".save-btn");
const ex = document.querySelector(".ex-btn");
let notesTaskName = document.querySelector(".notes-task-name");
let notesTaskPlace = document.querySelector(".notes-task-place");
const area = document.querySelector(".notes-task-area");
//let firstClick = true;

const tl = gsap.timeline();

//nav animations
function navShow(){
    tl.to(nav,{
        top:0,
        duration:0.5,
        ease: "expo.out"
    })
}
function navClose(){
    tl.to(nav,{
        top:"-100%",
        duration:0.5,
        ease: "expo.in"
    })
}
menu.addEventListener("click", navShow);
close.addEventListener("click", navClose);

//text modifier
const textarea = document.querySelector("textarea");

textarea.addEventListener("input", function() {
    this.style.height = "auto"; // Reset height to calculate new height
    this.style.height = this.scrollHeight + "px"; // Set new height based on content
});

//basic functions
function remove(elem){
    elem.classList.add("none");
    console.log("added");
}
function show(elem){
    elem.classList.remove("none");
    console.log("added");
}
function clear(elem){
    elem.value = "";
}
function expand(elem){
    remove(preview);
    show(notesTaskName);
    show(notesTaskPlace);
    //firstClick = false;
}
function shrink(elem){
    show(preview);
    remove(notesTaskName);
    remove(notesTaskPlace);
    preview.innerText = notesTaskName.value;
}
//add btn
add.addEventListener("click",()=>{
    
    remove(hero);
    show(notes);
    
    console.log("click");

    if(notesTaskName.value.trim()!="" && notesTaskPlace.value.trim()!=""){//for copy(if any value) 
                                          
        let newNotes = notes.cloneNode(true);
        newNotes.classList.add("notes");
        area.appendChild(newNotes);
        clear(notesTaskName);
        clear(notesTaskPlace);
        remove(ex);
        show(save);
        expand();
        //firstClick = false;
    }
    else{//no copy
        alert("Please 'complete' the current draft.");
    }
})
//save btn
save.addEventListener("click",()=>{
    if(notesTaskName.value.trim()!="" && notesTaskPlace.value.trim()!=""){
        shrink();
        remove(save);
        show(ex);
    }
    else{//no copy
        alert("Please 'save' the current draft.");
    }
})
//notes click
document.querySelector(".notes-task-area").addEventListener("click", (event) => {
    if (event.target.classList.contains("ex-btn")) {
        expand();
        remove(ex);
        show(save);
    }
});
