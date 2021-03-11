//Defines the input value from the user to be an array//
let array=[];
if (localStorage !=""){
  array=JSON.parse(localStorage.getItem("array") || ("[]"));
}

// Saves the user input value as JSON and calls the checkOutTime function// 
function save(){
  let mission= document.getElementById("mission");
  let fdate= document.getElementById("fdate");
  let ftime= document.getElementById("ftime");
  

  if (mission.value == "" || fdate.value == "") {
    alert ("Please fill all the mandatory inputs");
  }

else{


    let info = {
      mission: mission.value,
      fdate: fdate.value,
      ftime: ftime.value
    };
    array.push(info);
  }

  let json= JSON.stringify(array);
  localStorage.setItem("array", json);

  checkOutTime()
}

// Check the current time and compare it to the note due time,
// converts the current time to yyyy/mm/dd
//check every note in the local storage for date
//calls new_note function
function checkOutTime(){
  const json = localStorage.getItem("array");
  const notee = JSON.parse(json);

  const nowtime = new Date();
  const convertime = nowtime.toISOString();

  for (let i=0;  i < array.length; i++){
    const notetimendate = array[i].fdate + "</br>" + array[i].ftime;
  
  if (notetimendate > convertime){
    new_note(array[i].mission, array[i].fdate, array[i].ftime, i)
   } 
  }
}

// Create <div> for every part of the user notes get index from checkOutTime function
function new_note(mission, fdate, ftime, i){
 
  //A <div> for the note background image with fade in style (see main.css file)
  let nnote = document.createElement("div");
  nnote.className= "newnote";
  nnote.innerHTML =  "<button id=\"ex\" onclick=\"remove_note(this," +i+");\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-x-circle\" viewBox=\"0 0 16 16\">\
  <path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"/>\
  <path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z\"/>\
  </svg></button>"

  //A <div> for the user mission details get the index from function()
  let mmission = document.createElement("div");
  mmission.className = "notemission";
  mmission.innerHTML = mission;

  //A <div> for the user date and time details allgin to the note bottom left corner, get the index from function()
  let ddate_ttime = document.createElement("div");
  ddate_ttime.className = "datentime"
  ddate_ttime.innerHTML = fdate + "<br/>" + ftime;

  //Give all the note parts a continer and a father
  const note_cont = document.getElementById("note_cont");
  note_cont.appendChild(nnote);
  nnote.appendChild(mmission);
  nnote.appendChild(ddate_ttime);
}

//Deletes notes from html and localstorage uses (this) to locate the index of the note,
//By using (+i+) removing the content of the index from the array and d
function remove_note(e, i){
 
  e.parentNode.parentNode.removeChild(e.parentNode);
    const task=localStorage.getItem("array");
    const note=JSON.parse(task);
    note.splice(i, 1);
    localStorage.setItem('array',JSON.stringify(note));
    location.reload();
  }






