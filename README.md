# dt173g_mom2
Moment 2 for course DT173G. Using GULP in NodeJS to create automated workflow.

### Purpose of Automation

This project uses GULP to automate workflow. This means, in practice, that we seperate our website into two folders: a build (src) and a distribution (pub). By using GULP, we can set up a series of automated tasks to run. For example, whenever we make a change to a file inside our source folder, that file gets copied over in its changed state to the public folder automatically. This is done through a "watch" task; More on that later.

GULP also concatenates our CSS / JavaScript into one big file before moving it to the pub folder. This lets us split our JS/CSS code into multiple files for easy building, and then combine them into a big file for publication.

GULP can also minify files. This means to remove any additional whitespace -- or anything else -- that a computer does not need to interpret the source files. Doing this reduces the file size and lets the web page run faster. We also use this process for images, to reduce their file size -- again, speeding up the web page.

The purpose of automation is to reduce human error, improve the easy of working on large projects, speed up deployment of changes and allow for multiple input streams -- for example, SASS & CSS, or TypeScript & JavaScript -- to be seamlessly integrated into one published codebase. By doing this, many people working together on a project can simplify development massively, while the actual act of typing code is made signficantly easier by using live reloads and automatic copying. Make a change to a CSS file in the source folder, and it will automatically re-create a concatenated and minified CSS version in your public folder and then re-load the website. Just like that!

### Packages and Tools

Here is a list of our dependencies and what they do:
    -  "browser-sync": This package allows us to have changes immediately reload the web browser.
    -  "gulp": This is the main file gulp needs to run.
    -  "gulp-clean": This package is used to delete files, which we do to remove "old" files in the publication folder.
    -  "gulp-clean-css": This package minifies our CSS files by removing whitespaces.
    -  "gulp-cli": This command line interface lets us run gulp directly from the node terminal.
    -  "gulp-concat": This concatenates CSS/JavaScript for us, merging multiple files into one.
    -  "gulp-htmlmin": This minifies HTML, creating a smaller, faster file for publication.
    -  "gulp-imagemin": This does the same thing, except for images, rendering them smaller.
    -  "gulp-uglify": This minifies our JavaScript files so that they load faster.

### Running the Code

Most of the tasks you need are baked into a default export, meaning they run when gulp is called. 

We have the following functions in our code:

- **CleanPub:** CleanPub deletes everything in the public folder. It's the first thing we run.
- **CleanImages:** CleanImages deletes all the images from public folder.
- **CleanCSS:** CleanCSS deletes all the CSS from public folder.
- **CleanJS:** CleanJS deletes all the JS from public folder.
- **CleanHTML:** CleanHTML deletes all the HTML from public folder.

- **Images:** Images re-populates the public folder with everything located in /src/img
- **CSS:** CSS re-populates the public folder with everything located in /src/css
- **JavaScript:** JavaScript re-populates the public folder with everything located in /src/js
- **HMTL:** HTML re-populates the public folder with everything located in /src ending in .html (in our case only index.html)

- **Watch:** The watch function does a number of things. Firstly, it checks if anything changes in the src folder. Based on which type of file changed, it will run the clean & repopulate functions. For example, change a CSS file, and it will clean all the CSS files from public and create a new CSS file. Secondly, watch looks to see if any public files change (usually by copying over new files from the previous functions). If so, it reloads the web browser. It also, of course, starts BrowserSync and sets up our local server.

#### The Default Task

The basic "gulp" task runs a default task, which in turn calls our functions. We use both series (sequential) and parallel (not sequential). The series allow us to first clean the public folder, THEN begin copying over CSS / JS / images / HTML with respective functions, and then finally watch for changes and load up Browser Sync. The actual piping of the files is done in parallel, after the completion of pub cleaning (deleting all files in pub folder).

What this means is that simply running "gulp" should delete any public files, re-populate them with minified and concatenated files, and then load a local web server where you can see the resulting output. Changing anything in the source files will automatically re-copy files to the public directory. Anytime the public directory files change, the web browser reloads. 

#### Browser Sync and Live Reload

While the default task ("gulp") is running, any change made to src files will be reflected directly in the browser, which is located in the pub folder.

This means that we first delete the old file in pub, move a new one over, and stream those changes into the BrowerSync task. This ensures data integrity is maintained, because any changes in src are first copied over to pub before we reload the browser (browser is reloaded when it detects file changes in the pub directory). For this reason, changes should always be made in the src folder -- because when you run the default task, it will wipe the pub folder and re-build it from src files. However, any changes made in the pub folder will be shown live in the browser as well (but those changes will be overwritten in the next build).