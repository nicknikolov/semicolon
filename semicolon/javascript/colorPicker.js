// very rudamentary color picker, inserts hex value at cursor point,
// just smart enough to undo if you are trying out colors
colorjoe.rgb('picker').on('change', function(c) {
    var doc = editor.getDoc();
    var cursor = doc.getCursor();
    var line = doc.getLine(cursor.line);
    var word = editor.findWordAt(cursor);
    var wordStr = editor.getRange(word.anchor, word.head);
    editor.replaceRange(
            '  ' + clickedWord + '(' + c.hex() + ');',
    { line: cursor.line, ch: 0 },
        { line: cursor.line, ch: line.length }
    );
});

function toggleColorPicker() {
    document.activeElement.blur(); // hide keyboard
    var colorPickerDiv = document.getElementById('picker');

    if (colorPickerDiv.style.display === 'none') colorPickerDiv.style.display = 'inline';
    else { colorPickerDiv.style.display = 'none'; return; }

    if (document.getElementById('closeButton')) return;
    var closeButton = document.createElement('button');
    closeButton.setAttribute('id', 'closeButton');
    closeButton.setAttribute('onclick', 'closeTogglePicker()');

    colorPickerDiv.appendChild(closeButton);

}

function closeTogglePicker() {
    toggleColorPicker();
    firstColor = true;
}
