// Create your global variables below:
var tracklist = ["Let's Go Up", "Shield", "Not Alone", "Concrete Evidence", "Freedom", "Brave", "A Root out of Dry Ground", "Lawgiver", "Disciples", "A Tender Plant"];
var volLevels = [];
const DEFAULT_COLOR = 'rgb(95, 147, 154)';


//Retrieve element nodes from DOM
var switchBtn = document.getElementById('switch-btn');
var prevBtn = document.getElementById('prev-btn');
var nextBtn = document.getElementById('next-btn');
var volumeUpBtn = document.getElementById('volume-up');
var volumeDownBtn = document.getElementById('volume-down');
var time = document.getElementById('time-elapsed');
var rangeBar = document.getElementById('timeKpr');
var count = 0;
var seconds = 0;
var paused = true;


function init() {
	// Your code goes here

  // Fill in the volLevels array
  for(var i = 0; i < 6; i++){
    volLevels[i] = document.getElementById('vl'+ i);

  }

  // Filling the first three bar with DEFAULT_COLOR
  for(var i = 0; i < 3; i++){
    volLevels[i].style.backgroundColor = DEFAULT_COLOR;
  }

}

function volUp() {
	// Your code goes here
  for(var i = 0; i < volLevels.length; i++){
    if(volLevels[i].style.backgroundColor != DEFAULT_COLOR){
      volLevels[i].style.backgroundColor = DEFAULT_COLOR;
      break;
    }
  }

}

function volDown() {
	// Your code goes here
  for(var i = volLevels.length-1; i > -1; i--){
    if (volLevels[i].style.backgroundColor === DEFAULT_COLOR){
      volLevels[i].style.backgroundColor = "#ffffff";
      break;
    }
  }

}

function switchPlay(e) {
	// Your code goes here

  // Logic when the play resumed
  if (switchBtn.textContent == "play_arrow"){
    switchBtn.textContent = "pause";
    paused = false;
  }

  // Logic when play is paused
  else {
      switchBtn.textContent = "play_arrow";
      paused = true;
  }

}

setInterval(function() {
  // Updating time and bar
  if(!paused){
    ++seconds;
    rangeBar.value = `${Number(rangeBar.value)+ 1}`;
    time.innerHTML = secondsToMs(seconds);
  }

  // Logic when song finishes
  if(rangeBar.value == 180){
    rangeBar.value = 0;
    nextSong();
    paused = false;
    seconds = 0;
  }
}, 1000)

function nextSong(e) {
	// Your code goes here

  // Reset the bar and time
  seconds = 0;
  rangeBar.value = 0;

  for(var i = count; i < tracklist.length; i++){
    var song = document.getElementById('song-title');

    // Logic to make the array cyclical (last song next => first song)
    if(count == tracklist.length-1){
      song.innerHTML = tracklist[0];
      time.innerHTML = "0:00";
      count = 0;
      break;
    }

    else{
      song.innerHTML = tracklist[i+1];
      count++;
      time.innerHTML = "0:00";
      break;
    }
  }
}

function prevSong() {
	// Your code goes here

  // Reset the bar and time
  seconds = 0;
  rangeBar.value = 0;

  for(var i = count; i < tracklist.length; i++){
    var song = document.getElementById('song-title');

    // Logic to make the array cyclical (first song prev => last song)
    if(count == 0){
      song.innerHTML = tracklist[tracklist.length-1];
      count = tracklist.length -1;
      time.innerHTML = "0:00";
      break;
    }

    else{
    song.innerHTML = tracklist[i-1];
      count--;
      time.innerHTML = "0:00";
      break;
    }
  }
}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);
    console.log(`00${sec}`);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

switchBtn.addEventListener('click', switchPlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
volumeUpBtn.addEventListener('click', volUp);
volumeDownBtn.addEventListener('click', volDown);

init();
