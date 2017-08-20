/*-=-=-=-=-
 Run on https://www.eng.utah.edu/~cs4400/c_representation.html to generate
 one section for videos.json
=-=-=-=-=-*/

var links = document.querySelectorAll('.main li a');
links = Array.prototype.slice.call(links); // Convert NodeList to Array
var section = {
  title: document.querySelector('h4').innerText.match(/: (.*)/)[1],
  videos: []
};

links.map(function(link){
  if(/youtube/.test(link.href)){
    var name = link.innerText;

    // Only use title if video link starts with abbreviated section title
    try {
      name = name.replace(/^.*(\d+): (.*)/, "\$1. \$2");
    } catch(e){};

    var id = link.href.match(/v=(.*)/)[1];

    section.videos.push({
      name: name,
      id: id
    });
  }
});

JSON.stringify(section, null, 2);
