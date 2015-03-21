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

editor.on('inputRead', function(e) {
    CodeMirror.showHint(editor, CodeMirror.hint.auto,
            { 'completeOnSingleClick': true });
});
