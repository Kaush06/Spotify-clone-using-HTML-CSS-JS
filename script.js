console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Frag-Out", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "The-Long-Road-Home", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Cloud", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Arrow", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Firefly", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Lights", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sex-Whales-run-away", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Good-Times", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Aperture", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Me-You", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    // element.style.color = red;
   
    // let tempaudioelem = document.createElement('audio');
    // tempaudioelem.src = songs[i].filePath; 
    

    // let minutes = parseInt(tempaudioelem.duration / 60 );
    // // console.log(tempaudioelem.src);
    // let seconds = parseInt(tempaudioelem.duration % 60);
    // element.getElementsByClassName("songItemPlaytext")[0].innerText = minutes.toString() + ':' + seconds.toString();
})
 

// Handle play/pause click
const makesetitemplay = () =>{
    makeAllPlays();
    let setIndex = audioElement.src.slice(audioElement.src.lastIndexOf('/')+1, audioElement.src.search('.mp3'));
    let item = Array.from(document.getElementsByClassName("songItemPlay"));
    item[setIndex-1].classList.remove('fa-play-circle');
    item[setIndex-1].classList.add('fa-pause-circle');
}
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        makesetitemplay();
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        makeAllPlays();
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// let timestamps = Array.from(document.getElementsByClassName("songItemPlaytext")).forEach( (element)=> {
//     // element.firstChild.innerText = " "; 
    
//     element.innerText = "gjh ";
//     // console.log(parseInt(audioElement.duration));
// });

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    // let index = audioElement.src.slice(audioElement.src.lastIndexOf('/')+1, audioElement.src.search('.mp3'));
    // let timestamps = document.getElementById(index-1).parentElement.firstChild;
    // timestamps = audioElement.duration;
    // console.log(timestamps);
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        if(masterPlay.classList.contains('fa-play-circle')){
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else if(masterPlay.classList.contains('fa-pause-circle')){
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }

    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makesetitemplay();

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 9;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makesetitemplay();
})