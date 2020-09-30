const el = document.getElementById("elementoutput");

let p = document.createElement("p");
let node = document.createTextNode("Hello! I am the element maker JS. I made this element to talk to you. SASS made me a green box! Thanks, SASS!");
p.appendChild(node);
el.appendChild(p);

