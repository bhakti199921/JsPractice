let days =document.getElementById('days');
let hours= document.getElementById('hours');
let minutes= document.getElementById('minutes');
let seconds=document.getElementById('seconds');
let year=document.getElementById('year');
let countdown=document.getElementById('countdown');
let loading=document.getElementById('loading');

const currentYear= new Date().getFullYear();

const newYearTime= new Date(`January 01 ${currentYear + 1} 00:00:00`);
console.log('nn',newYearTime);

// Set background year
year.innerText=currentYear + 1;

// Update countdown time
function updateCountdown(){
    const currentTime= new Date()
    const diff = newYearTime - currentTime;
    console.log(diff);
    const d=Math.floor(diff/1000/60/60/24); //Convert to days.
    const h=Math.floor(diff/1000/60/60)%24; //Convert to hour
    const m=Math.floor(diff/1000/60)%60; //Convert to minutes.
    const s=Math.floor(diff/1000)%60; //Convert to seconds.

    // 24 stands for 24 hours
    // 60 stands for 60 minutes, which makes an hour, thereby converting 24 hours to minutes
    // the next 60 stands for 60 seconds, which makes a minute
    // and 1000 stands for 1000 milliseconds, which makes a second

    // add values to DOM

    days.innerHTML=d;
    hours.innerHTML=h < 10 ? '0'+h:h;
    minutes.innerHTML=m <10 ?'0'+ m:m;
    seconds.innerHTML=s<10?'0'+s:s;
}

// Show spinner before countdown

setTimeout (()=>{
    loading.remove();
    countdown.style.display='flex';
},1000);

// Run every second
setInterval(updateCountdown,1000)