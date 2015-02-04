var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: "text/x-java",
    lineNumbers: true,
    lineWrapping: true,
    autofocus: true,
    theme: 'solarized',
    smartIndent: true,
    indentUnit: 2,
    tabSize: 2,
});
var canvas = document.getElementById('pjs');
var sketchVisible = true;

editor.on("change", renderSketch);

window.onload = renderSketch;

function renderSketch() {

    try {
        canvas = createCanvas();
        var sketch = Processing.compile(editor.getValue());
        instance = new Processing(canvas, sketch);
    } catch (e) {
        console.log(e);
        output.value = "Processing.js error:\n" + e.toString();
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
    var sketch = document.getElementById('sketch');
    var code = document.getElementsByClassName('CodeMirror');

    if(sketchVisible) {

        code[0].style.display = 'none';
        sketchVisible = false;

    } else {

        code[0].style.display = 'block';
        code[0].style.background = 'rgba(255, 255, 255, 0.4)';
        sketchVisible = true;

    }

}
