var el = document.getElementById("elementoutput");

var p = document.createElement("p");
var node = document.createTextNode("Hello! I am the element maker JS. I made this element to talk to you. SASS made me a green box! Thanks, SASS!");
p.appendChild(node);
el.appendChild(p);

