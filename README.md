# dt173g_mom2
Moment 3 for course DT173G. Using GULP in combination with SASS to pre-process CSS.

### Install

Once project is cloned, navigate to root folder (dt173g_mom2) and run npm install. Then run gulp from terminal. This will create a pub folder and start a local live server.

### GULP and SASS

[Our previous project](https://github.com/nipa1902/dt173g_mom2 "DT173G mom2") used static CSS with concatenation to style our webpage. This project uses SASS instead. SASS is a pre-processor that allows us access to things like variables, nesting, mixins, if-else statements and much more. 

In this project, we use partials, variables, nesting, mixins, extend-selectors, if-else statements and colour functions to create more re-usable, more legible and smarter CSS. 

Our GULP task has been updated to process, concatenate and deposit our SASS into plain CSS inside the pub/css folder. Compared to our previous project, the only difference in the gulpfile is that we use a SASS compile function instead of CSS function, with the added extra step of handling SASS compiles through node-sass.
