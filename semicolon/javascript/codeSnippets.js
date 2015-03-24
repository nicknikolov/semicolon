function toggleCodeSnippets() {

    var codeSnippetsDiv = document.getElementById('code-snippets');

    if (codeSnippetsDiv.style.display === 'none') codeSnippetsDiv.style.display = 'inline';
    else { codeSnippetsDiv.style.display = 'none'; return; }

    var ul = document.getElementById('snippetsList');
    console.log(ul);
    ul.innerHTML = '';

    var forLi = document.createElement('li');
    var forLoop = document.createElement('div');
    forLoop.setAttribute('class', 'snippet');
    forLoop.innerHTML = 'for loop';
    forLi.appendChild(forLoop);
    forLi.setAttribute('onclick', 'insertForLoop()');
    ul.appendChild(forLi);

    var whileLi = document.createElement('li');
    var whileLoop = document.createElement('div');
    whileLoop.setAttribute('class', 'snippet');
    whileLoop.innerHTML = 'while loop';
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
            toggleCodeSnippets();
            return;
        }
        var loops = prompt("loop amount:", "3");
        if (!loops) {
            toggleCodeSnippets();
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
            toggleCodeSnippets();
            return;
        }
        var loops = prompt("loop amount:", "3");
        if (!loops) {
            toggleCodeSnippets();
            return;
        }
        editor.replaceRange(
                "for (int "+i+"=0; "+i+"<"+loops+"; "+i+"++) {}", start
        );
    }
    editor.execCommand('selectAll');
    editor.execCommand('indentAuto');
    toggleCodeSnippets();
}

function insertWhileLoop() {
    document.activeElement.blur(); // hide keyboard hack
    if (lastSelection.code) {
        var i = prompt("count variable:", "i");
        if (!i) {
            toggleCodeSnippets();
            return;
        }
        var loops = prompt("loop amount:", "3");
        if (!loops) {
            toggleCodeSnippets();
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
            toggleCodeSnippets();
            return;
        }
        var loops = prompt("loop amount:", "3");
        if (!loops) {
            toggleCodeSnippets();
            return;
        }
        editor.replaceRange(
                "int " + i + " = 0;\nwhile ("+i+"<"+loops+") {"
                + "\n"+i+"++;\n}", start
        );
    }
    editor.execCommand('selectAll');
    editor.execCommand('indentAuto');
    toggleCodeSnippets();
}
