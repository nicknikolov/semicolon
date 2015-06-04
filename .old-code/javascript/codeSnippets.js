function toggleCodeSnippets() {

    var codeSnippetsDiv = document.getElementById('code-snippets');
    if (codeSnippetsDiv.style.display === 'none') codeSnippetsDiv.style.display = 'inline';
    else { codeSnippetsDiv.style.display = 'none'; return; }

    codeSnippetsDiv.onclick = toggleCodeSnippets;

    // Show snippets window in relation to where
    // user has scrolled
    var top =  document.body.scrollTop;
    codeSnippetsDiv.style.top = top + 'px';

    var ul = document.getElementById('snippetsList');
    ul.innerHTML = '';

    var loops = document.createElement('li');
    loops.innerHTML = '<p> Loops </p>';
    loops.setAttribute('class', 'separator');
    ul.appendChild(loops);

    var forLi = document.createElement('li');
    var forLoop = document.createElement('div');
    forLoop.setAttribute('class', 'snippet');
    forLoop.innerHTML = 'for';
    forLoop.style.background = 'none';
    forLi.appendChild(forLoop);
    var description = document.createElement('div');
    description.setAttribute('class', 'description');
    description.innerHTML = 'Inserted wrapped around selection' +
                            ' or at cursor pos if nothing selected';
    description.style.background = 'none';
    forLi.appendChild(description);
    forLi.setAttribute('onclick', 'insertForLoop()');
    ul.appendChild(forLi);

    var whileLi = document.createElement('li');
    var whileLoop = document.createElement('div');
    whileLoop.setAttribute('class', 'snippet');
    whileLoop.innerHTML = 'while';
    whileLoop.style.background = 'none';
    var description = document.createElement('div');
    description.setAttribute('class', 'description');
    description.innerHTML = 'Inserted wrapped around selection' +
                            ' or at cursor pos if nothing selected';
    description.style.background = 'none';
    whileLi.appendChild(description);
    whileLi.appendChild(whileLoop);
    whileLi.setAttribute('onclick', 'insertWhileLoop()');
    ul.appendChild(whileLi);

}

function insertForLoop() {
    document.activeElement.blur(); // hide keyboard hack
    if (lastSelection.code){
        var doc = editor.getDoc();
        var start = doc.getCursor(true);
        var i = prompt("count variable:", "i");
        if (!i) {
            return;
        }
        var loops = prompt("loop amount:", "3");
        if (!loops) {
            return;
        }
        editor.replaceRange('', lastSelection.start, lastSelection.end);
        editor.replaceRange(
                "for (int "+i+"=0; "+i+"<"+loops+"; "+i+"++) {\n "
                + lastSelection.code + "\n}", lastSelection.start
        );
    } else {
        var doc = editor.getDoc();
        var start = doc.getCursor();
        var i = prompt("count variable:", "i");
        if (!i) {
            return;
        }
        var loops = prompt("loop amount:", "3");
        if (!loops) {
            return;
        }
        editor.replaceRange(
                "for (int "+i+"=0; "+i+"<"+loops+"; "+i+"++) {}", start
        );
    }
    editor.execCommand('selectAll');
    editor.execCommand('indentAuto');
}

function insertWhileLoop() {
    document.activeElement.blur(); // hide keyboard hack
    if (lastSelection.code) {
        var i = prompt("count variable:", "i");
        if (!i) {
            return;
        }
        var loops = prompt("loop amount:", "3");
        if (!loops) {
            return;
        }
        editor.replaceRange('', lastSelection.start, lastSelection.end);
        editor.replaceRange(
                "int " + i + " = 0;\nwhile ("+i+"<"+loops+") {\n "
                + lastSelection.code + "\n"+i+"++;\n}", lastSelection.start
        );
    } else {
        var doc = editor.getDoc();
        var start = doc.getCursor();
        var i = prompt("count variable:", "i");
        if (!i) {
            return;
        }
        var loops = prompt("loop amount:", "3");
        if (!loops) {
            return;
        }
        editor.replaceRange(
                "int " + i + " = 0;\nwhile ("+i+"<"+loops+") {"
                + "\n"+i+"++;\n}", start
        );
    }
    editor.execCommand('selectAll');
    editor.execCommand('indentAuto');
}
