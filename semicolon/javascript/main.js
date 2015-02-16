var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: 'text/x-java',
    lineNumbers: true,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    autofocus: true,
    theme: 'ambiance',
    smartIndent: true,
    indentUnit: 2,
    tabSize: 2,
});
var canvas = document.getElementById('pjs');
var sketchVisible = true;
var selectedSketch = 'Default Sketch';
var instance;

editor.on('change', renderSketch);

window.onload = function() {
    var code = document.getElementsByClassName('CodeMirror');
    document.getElementById('sketchBrowser').style.display = 'none';
    code[0].style.background = 'rgba(0, 0, 0, 0.75)';

    // If no default sketch is found, use the template one from
    // index.html and save it as default
    if (!localStorage.getItem(selectedSketch)) {
        localStorage.setItem(selectedSketch, editor.getValue());
    }
    document.getElementById('sketchName').innerHTML = selectedSketch;
    editor.setValue(localStorage.getItem(selectedSketch));
    renderSketch();
}

function renderSketch() {
    try {
        canvas = createCanvas();
        var canvas = document.getElementById('pjs');
        var sketch = Processing.compile(editor.getValue());
        if (instance) instance.exit();
        instance = new Processing(canvas, sketch);
        // save file
        localStorage.setItem(selectedSketch, editor.getValue());
    } catch (e) {
        console.log(e);
    }
}

function createCanvas() {
   // Make a new canvas, in case we're switching from 2D to 3D contexts.
    var container = document.getElementById('sketch');
    var sketch = document.getElementById('pjs');
    container.removeChild(sketch);
    sketch = document.createElement('canvas');
    sketch.id = 'pjs';
    container.appendChild(sketch);
    return sketch;
}

function changeSketchTo(sketchKey) {
    // save old sketch first!
    localStorage.setItem(selectedSketch, editor.getValue());
    if (sketchKey === undefined) return;
    // load new one
    selectedSketch = localStorage.key(sketchKey);
    editor.setValue(localStorage.getItem(selectedSketch));
    renderSketch();
    // update header and close sketch browser
    document.getElementById('sketchName').innerHTML = selectedSketch;
    toggleBrowser();
}

function deleteSketch(keyToDelete) {
    var defaultSketchKey = 0;
    for (item in localStorage) {
        if (item == 'Default Sketch') break;
        defaultSketchKey++;
    }
    changeSketchTo(defaultSketchKey);

    localStorage.removeItem(localStorage.key(keyToDelete));
    toggleBrowser();

}

function renameSketch(key) {
    var oldSketchName = localStorage.key(key);
    var code = localStorage.getItem(oldSketchName);
    var newSketchName = prompt('Please enter new sketch name', oldSketchName);
    if (!newSketchName) return;
    // set up a new sketch and save it to local storage
    selectedSketch = newSketchName;
    localStorage.setItem(newSketchName, code);
    localStorage.removeItem(oldSketchName);
    document.getElementById('sketchName').innerHTML = selectedSketch;
    // dont judge, it's a university project
    toggleBrowser();
    toggleBrowser();
}

function toggleBrowser() {
    var sketchBrowser = document.getElementById('sketchBrowser');

    if (sketchBrowser.style.display === 'none') sketchBrowser.style.display = 'inline';
    else sketchBrowser.style.display = 'none';

    // draw list with available sketches from local storage
    var ul = document.getElementById("sketchList");
    ul.innerHTML = '';

    for (var i=0; i<localStorage.length; i++) {
        // skip Safari bullshit
        if (localStorage.key(i).substring(0,3) === 'com') continue;
        if (localStorage.key(i) === 'debug') continue;

        // create list
        var li = document.createElement('li');

        // add sketch name to row
        var sketchNameInList = document.createElement('div');
        sketchNameInList.setAttribute('id', 'listText');
        sketchNameInList.innerHTML = localStorage.key(i);
        sketchNameInList.style.background = 'none';

        // attach change function to sketch name
        var changeSketchFunc = 'changeSketchTo(' + i + ')';
        sketchNameInList.setAttribute('onclick', changeSketchFunc);
        li.appendChild(sketchNameInList);

        // no delete button for default sketch, we don't
        // want to delete that
        if (localStorage.key(i) === 'Default Sketch') {
            ul.appendChild(li);
            continue;
        }

        // add delete button
        var deleteButton = document.createElement('div');
        deleteButton.setAttribute('id', 'deleteButton');
        deleteButton.style.background = 'none';
        deleteButton.innerHTML = "&#x1F480";

        // attach delete function
        deleteSketchFunc = 'deleteSketch(' + i + ')';
        deleteButton.setAttribute('onclick', deleteSketchFunc);
        li.appendChild(deleteButton);

        // add rename button
        var renameButton = document.createElement('div');
        renameButton.setAttribute('id', 'renameButton');
        renameButton.style.background = 'none';
        renameButton.innerHTML = 'R';

        // attach rename function
        renameSketchFunc = 'renameSketch(' + i + ')';
        renameButton.setAttribute('onclick', renameSketchFunc);
        li.appendChild(renameButton);


        // append row to list
        ul.appendChild(li);
    }

    var li = document.createElement('li');
    var newButton = document.createElement('div');
    newButton.setAttribute('id', 'listText');
    newButton.innerHTML = 'New';
    newButton.style.background = 'none';
    li.appendChild(newButton);
    li.setAttribute('onclick', 'newSketch()');
    ul.appendChild(li);

}


function newSketch() {
    var sketchName = prompt("Please enter a name for your new sketch", "");
    if (!sketchName) return;
    // set up a new sketch and save it to local storage
    var startersCode = 'void setup() {\n' +
                        '  size(screen.width, screen.height);\n' +
                        '}\n\n' +
                        'void draw() {\n' +
                        '  \n' +
                        '}';
    selectedSketch = sketchName;
    localStorage.setItem(sketchName, startersCode);
    editor.setValue(startersCode);
    document.getElementById('sketchName').innerHTML = selectedSketch;
    toggleBrowser();
}


function toggleSketch() {
    var sketch = document.getElementById('sketch');
    var code = document.getElementsByClassName('CodeMirror');

    if(sketchVisible) {
        code[0].style.display = 'none';
        sketchVisible = false;
    } else {
        code[0].style.display = 'block';
        code[0].style.background = 'rgba(0, 0, 0, 0.75)';
        sketchVisible = true;
    }
}
