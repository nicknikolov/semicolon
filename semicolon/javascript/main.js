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

// rerender Processing sketch on code change
editor.on('change', renderSketch);

window.onload = function() {
    if (!localStorage.getItem('settings')) initSettings();
    var code = document.getElementsByClassName('CodeMirror')[0];
    var settings = JSON.parse(localStorage.getItem('settings'));
    code.style.fontSize = settings.fontSize + 'px';
    document.getElementById('sketchBrowser').style.display = 'none';
    document.getElementById('settings').style.display = 'none';
    code.style.background = 'rgba(0, 0, 0, 0.75)';

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

function toggleSketch() {
    // hide or show code
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
