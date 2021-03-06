var el = require('./elements.js');

var list = {
  /**
   * Prints all videos and groups from
   * the json data the playlist element
   */
  print: (data, playlist) => {

    // Loop through each topic/video group
    for (var i = 0; i < data.length; i++) {
      var titleText = data[i].title;
      var vids = data[i].videos;

      var group = Group();

      var title = Title(titleText);
      group.appendChild(title);

      // Create all video links

      vids.map(function(vid){
        var link = VideoLink(vid.name, vid.id);
        group.appendChild(link);
      });
      playlist.appendChild(group);
    }
  },

  // Closes all video groups
  closeAllGroups: () => {
    var groups = document.querySelectorAll('.group');
    for (var i = 1; i < groups.length; i++) {
      toggle(groups[i]);
    }
  }
}
module.exports = list;

/*-=-=-=-=-=-=-=-
  DOM Elements
-=-=-=-=-=-=-=*/

function Title(text){
  var t = document.createElement('div');
  t.classList.add('title');
  t.innerText = text;

  t.addEventListener('click', toggleParent);
  return t;
}

function VideoLink(text, id){
  var link = document.createElement('div');
  link.classList.add('vid-link');

  var parts = text.split(':');
  var linkName = document.createElement('div');
  linkName.classList.add('name');

  if(parts.length > 1){
    parts.map(function(part, i){
      var span = document.createElement('span');
      span.classList.add('part');
      var partText = i == 0 ? part + ": " : part;
      span.innerText = partText;
      linkName.appendChild(span);
    });

  } else {
    var name = document.createElement('div');
    name.innerText = text;
    linkName.appendChild(name);
  }

  link.setAttribute('data-id', id);
  link.addEventListener('click', selectVideo);
  link.appendChild(linkName);
  return link;
}

function Group(){
  var group = document.createElement('div');
  group.classList.add('group');
  return group;
}

/*-=-=-=-=-=-=-=-=-=-=-=-
  Begin Private Methods
-=-=-=-=-=-=-=-=-=-=-=*/

/**
 * Called when video link is clicked.
 * Loads selected video into player.
 */
function selectVideo() {
  // Clearing previous selected
  var previous = document.querySelector('.current');
  if(previous != null){
    previous.classList.remove('current');
  }
  this.classList.add('current');

  // Locking group open
  var pLock = document.querySelector('.lock');
  if(pLock != null){
    pLock.classList.remove('lock');
  }
  this.parentElement.querySelector('.title').classList.add('lock');

  el.player.loadVideoById(this.getAttribute('data-id'));
}

/**
 * Called when title is cliced.
 * Opens or closes the parent video group.
 */
function toggleParent(){
  toggle(this.parentNode);
}

/**
 * Shows or hides all video links in the group.
 */
function toggle(group){
  var links = group.querySelectorAll('.vid-link');

  for (var i = 0; i < links.length; i++) {
    if(links[i].classList.contains('hidden')){
      show(links[i]);
    } else{
      hide(links[i]);
    }
  }
}

/**
 * Hides the element
 */
function hide(element){
  element.classList.add('hidden');
}

/**
 * Shows the element
 */
function show(element){
  element.classList.remove('hidden');
}
