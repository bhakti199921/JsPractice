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

    audio.pause();
}

//previous song

function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex=songs.length-1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Next song

function nextSong(){
    songIndex++;

    if(songIndex > songs.length-1){
        songIndex=0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e){
    const{duration,currentTime}=e.srcElement; //duration - get lenght of current video
    // currentTime -The currentTime property sets or returns the current position  of the audio/video playback
    const progressPercent=(currentTime / duration)*100; //
    progress.style.width=`${progressPercent}%`;
}

function setProgress(e){
    const width=this.clientWidth; //The Element.clientWidth property is zero for inline elements and elements with no CSS;
    const clickX=e.offsetX; //The offsetX property returns the x-coordinate the mouse cursor, relative to the target element.
    const duration =audio.duration;

    audio.currentTime=(clickX / width)*duration;
}

//get duration & currentTime for Time of song
 function DurTime(e){
    const {duration,currentTime}=e.srcElement;
    var sec;
	var sec_d;

    // define minutes currentTime
    let min =(currTime==null)?0:Math.floor(currTime/60);
    min=min<10?"0"+min:min;

    // define seconds currentTime
    function get_sec(x){
        if(Math.floor(x)>=60){
            for(var i=1;i<=60;i++){
                if(Math.floor(x)>=(60*1) && Math.floor(x)<(60*(1+i))){
                    sec=Math.floor(x)-(60*1);
                    sec=sec<10?'0'+sec:sec;
                }
            }
        }
        else{
            sec=Math.floor(x);
            sec=sec<10?'0'+sec:sec;
        }
    }

    get_sec(currTime,sec);

    // change currentTime DOM
    currTime.innerHTML = min +':'+ sec;

	// define minutes duration
    let min_d=(isNaN(duration)===true)?"0":Math.floor(duration/60);
    min_d=min_d<10?'0'+min_d:min_d;

    function get_sec_d(){
        if(Math.floor(x)>=60){
            for(i=1;i<=60;i++){
                if(Math.floor(x>=(60*1))&& Math.floor(x)<(60*(1+i))){
                    sec_d=Math.floor(x)-(60*1);
                    sec_d=sec_d<10?'0'+sec_d:sec_d;
                }
            }
        }
        else{
            sec_d=(isNaN(duration)===true)?'0':Math.floor(x);
            sec_d=sec_d<10?'0'+sec_d:sec_d;
        }
    }

	// define seconds duration

        get_sec_d(duration);

    // change duration DOM

    durTime.innerHTML=min_d+':'+sec_d;
 };

 // Event listeners

 playbtn.addEventListener('click',()=>{
    const isPlaying = musiccontainer.classList.contains('play');

    if(isPlaying){
        puaseSong();
    }   
    else{
        playSong();
    }
 });

 // Change song
 prevbtn.addEventListener('click', prevSong);
 nextbtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progresscontainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);
