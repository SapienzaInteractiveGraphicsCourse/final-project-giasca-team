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