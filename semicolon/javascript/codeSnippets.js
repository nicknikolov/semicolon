function toggleCodeSnippets() {

    var codeSnippetsDiv = document.getElementById('code-snippets');
    codeSnippetsDiv.innerHTML = '';

    if (codeSnippetsDiv.style.display === 'none') codeSnippetsDiv.style.display = 'inline';
    else { codeSnippetsDiv.style.display = 'none'; return; }

    var forLoop = document.createElement('div');
    forLoop.setAttribute('class', 'snippet');
    forLoop.setAttribute('onclick', 'insertForLoop()');
    forLoop.innerHTML = 'for loop';
    codeSnippetsDiv.appendChild(forLoop);

}

function insertForLoop() {
    var doc = editor.getDoc();
    var cursor = doc.getCursor();
    editor.replaceRange('for (var i=0; i<3; i++){}', cursor);
    toggleCodeSnippets();
}
