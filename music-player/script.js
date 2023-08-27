const musiccontainer =document.getElementById('music-container');
const playbtn =document.getElementById('play');
const prevbtn =document.getElementById('prev');
const nextbtn =document.getElementById('next');

const audio=document.getElementById('audio');
const progress=document.getElementById('progress');
const progresscontainer=document.getElementById('progresscontainer');
const title=document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');


// song titles 
const songs=['hey','summer','ukulele'];

// keep track of song
let songIndex=2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song){
    title.innerText=song;
    audio.src=`music/${song}.mp3`;
    cover.src=`images/${song}.jpg`;
}

// play song
function playSong(){
    musiccontainer.classList.add('play');
    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// puase song

function puaseSong(){
    musiccontainer.classList.remove('play');
    playbtn.querySelector('i.fas').classList.add('fa-play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.puase();
}

//previous song

function prevSong(){
    songIndex++;

    if(songIndex < 0){
        songIndex=songs.length-1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Next song

function nextSong(){
    songIndex--;

    if(songIndex > songs.length-1){
        songIndex=0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e){
    const{duration,currTime}=e.srcElement;
    const progressPercent=(currentTime / duration)*100;
    progress.style.width=`${progressPercent}%`;
}

function setProgress(e){
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const duration =audio.duration;

    audio.currentTime=(clickX / width)*duration;
}