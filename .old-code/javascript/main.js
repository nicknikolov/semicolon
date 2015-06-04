// Add fast click to the div
// (excluding Codemirror and for some reason the sketch
// browser div as fast click crashes it ;( )
var button = document.querySelector(".fastclick");
new FastClick(button);

window.onload = function() {
    // I don't know why this is happening but make sure
    // this is none in the beginning
    var codeSnippetsDiv = document.getElementById('code-snippets');
    codeSnippetsDiv.style.display = 'none';
    var sketchBrowser = document.getElementById('sketchBrowser');
    sketchBrowser.style.display = 'none';
    var settingsDiv = document.getElementById('settings');
    settingsDiv.style.display = 'none';
    var colorPicker = document.getElementById('picker');
    colorPicker.style.display = 'none';

    // Create settings if they don't exist
    if (!localStorage.getItem('settings')) initSettings();
    // Parse settings object and set font size
    var code = codeEditor();
    var settings = JSON.parse(localStorage.getItem('settings'));
    code.style.fontSize = settings.fontSize + 'px';
    // If no default sketch is found, use the template one from
    // index.html and save it as default
    if (!localStorage.getItem(selectedSketch)) {
        localStorage.setItem(selectedSketch, editor.getValue());
    }
    // Load example sketches
    for (sketch in exampleSketches) {
      localStorage.setItem(sketch.toString(), exampleSketches[sketch]);
    }
    document.getElementById('sketchName').innerHTML = selectedSketch;
    editor.setValue(localStorage.getItem(selectedSketch));
    // Start rendering
    renderSketch();
}

var errorWidget;
function renderSketch() {
    try {
        if (errorWidget) errorWidget.clear();
        canvas = createCanvas();
        var canvas = document.getElementById('pjs');
        var sketch = Processing.compile(editor.getValue());
        // Cleanup
        if (instance) instance.exit();
        instance = new Processing(canvas, sketch);
        // Save file
        localStorage.setItem(selectedSketch, editor.getValue());
    } catch (e) {
        var error = document.createElement('div');
        error.setAttribute('class', 'error');
        error.innerHTML = e.message;
        var errorImg = document.createElement('div');
        errorImg.setAttribute('class', 'errorImg');
        errorImg.innerHTML = '<img src="images/warning-8x.png"></img>';
        error.appendChild(errorImg);
        errorWidget = editor.addLineWidget(e.line-5, error, {});
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

function toggleSketch() {
    // Hide or show code
    var code = codeEditor();
    var toggleButton = document.getElementById('t');

    if (code.style.display !== 'none') {
        code.style.display = 'none';
        t.setAttribute('src', 'images/toggle2.png');
    } else {
        code.style.display = 'block';
        t.setAttribute('src', 'images/toggle1.png');
    }
}

// Help with code uglyness
function codeEditor() {
    return document.getElementsByClassName('CodeMirror')[0];
}
