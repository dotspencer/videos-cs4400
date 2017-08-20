var elements = require('./elements.js');
var playlist = require('./playlist.js');
var yt = require('./youtube.js');

// Requesting videos.json and loading into data[]
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
  if(this.readyState == 4 && this.status == 200){
    elements.data = JSON.parse(this.responseText);

    // Print out all groups and videos from json response
    playlist.print(elements.data, elements.playlist);
    playlist.closeAllGroups();

    // Request and show video durations
    yt.showDuration();

    document.querySelector('.title').classList.add('lock');
    document.querySelector('.vid-link').classList.add('current');

    yt.start();
  }
};

xhr.open('GET', 'data/videos.json');
xhr.send();
