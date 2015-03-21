var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: 'text/x-processing',
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

var lastSelection = { start: 0, end: 0, code: ''};
var lastOneWasNothingToo = false;

editor.on('cursorActivity', function() {
    // a bit of a hack but, keep last marked
    // chunk of text so I can do stuff with it
    // e.g. wrap for or while loops around it
    var doc = editor.getDoc();
    var start = doc.getCursor(true);
    var end = doc.getCursor(false);
    var newSelection = doc.getRange(start, end);
    if (newSelection || lastOneWasNothingToo) {
        lastSelection.start = start;
        lastSelection.end = end;
        lastSelection.code = newSelection;
        lastOneWasNothingToo = false;
    } else {
        lastOneWasNothingToo = true;
    }
});

editor.on('inputRead', function(e) {
    CodeMirror.showHint(editor, CodeMirror.hint.auto,
            { 'completeOnSingleClick': true });
});
