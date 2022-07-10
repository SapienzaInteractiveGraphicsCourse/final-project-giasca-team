function start_button(){
    document.getElementById(1).style.display=' none';
    document.getElementById(1).style.visibility="hidden";
    document.getElementById(2).style.display=' inline';
    document.getElementById(2).style.visibility="visible";
    document.getElementById(3).style.display=' inline';
    document.getElementById(3).style.visibility="visible";
    document.getElementById(4).style.display=' inline';
    document.getElementById(4).style.visibility="visible";
    document.getElementById(5).style.display=' inline';
    document.getElementById(5).style.visibility="visible";

    var start_audio= new Audio('../Stranger_Things.mp3');
    start_audio.loop=true;
    start_audio.play();
}

const popupBox = document.querySelector(".popup-box");
const closeBtn = document.querySelector(".close-btn");

function instruction_button(){
    document.querySelector("#instruction-popup").classList.add("active");
}

function difficulty_button(){
    document.querySelector("#difficulty-popup").classList.add("active");
}

function options_button(){
    document.querySelector("#options-popup").classList.add("active");
}

function close_button(){
    document.querySelector("#instruction-popup").classList.remove("active"); //Close the popup screen on click the close button.
    document.querySelector("#difficulty-popup").classList.remove("active");
    document.querySelector("#options-popup").classList.remove("active");
}