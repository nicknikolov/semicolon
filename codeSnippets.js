module.exports.init = init
module.exports.toggle = toggle

var Editor = require('./editor')
var editor = null

function init () {

  editor = Editor.getEditor()
  
  var codeSnippetsDiv = document.getElementById('code-snippets')
  codeSnippetsDiv.onclick = toggle

  // Show snippets window in relation to where
  // user has scrolled
  var top =  document.body.scrollTop
  codeSnippetsDiv.style.top = top + 'px'

  var ul = document.getElementById('snippetsList')
  ul.innerHTML = ''

  var loops = document.createElement('li')
  loops.innerHTML = '<p> Loops </p>'
  loops.setAttribute('class', 'separator')
  ul.appendChild(loops)

  var forLi = document.createElement('li')
  var forLoop = document.createElement('div')
  forLoop.setAttribute('class', 'snippet')
  forLoop.innerHTML = 'for'
  forLoop.style.background = 'none'
  forLi.appendChild(forLoop)
  var description = document.createElement('div')
  description.setAttribute('class', 'description')
  description.innerHTML = 'Inserted wrapped around selection' +
    ' or at cursor pos if nothing selected'
  description.style.background = 'none'
  forLi.appendChild(description)
  forLi.onclick = insertForLoop
  ul.appendChild(forLi)

  var whileLi = document.createElement('li')
  var whileLoop = document.createElement('div')
  whileLoop.setAttribute('class', 'snippet')
  whileLoop.innerHTML = 'while'
  whileLoop.style.background = 'none'
  description = document.createElement('div')
  description.setAttribute('class', 'description')
  description.innerHTML = 'Inserted wrapped around selection' +
    ' or at cursor pos if nothing selected'
  description.style.background = 'none'
  whileLi.appendChild(description)
  whileLi.appendChild(whileLoop)
  whileLi.onclick = insertWhileLoop
  ul.appendChild(whileLi)
}

function toggle () {
  var codeSnippetsDiv = document.getElementById('code-snippets')
  if (codeSnippetsDiv.style.display === 'none') {
    codeSnippetsDiv.style.display = 'inline'
  }
  else {
    codeSnippetsDiv.style.display = 'none'
    return
  }
}

function insertForLoop() {
  var lastSelection = Editor.getLastSelection()
  document.activeElement.blur() // hide keyboard hack
  if (lastSelection.code){
    // TODO: Fix this hack. Without setTimeout mobile safari freezes
    setTimeout(function() {

      var doc = editor.getDoc()
      var start = doc.getCursor(true)
      var i = prompt('count variable:', 'i')

      if (!i) {
        return
      }
      var loops = prompt('loop amount:', '3')
      if (!loops) {
        return
      }
      editor.replaceRange('', lastSelection.start, lastSelection.end)
      editor.replaceRange(
        "for (int "+i+"=0; "+i+"<"+loops+"; "+i+"++) {\n "
          + lastSelection.code + "\n}", lastSelection.start
      )
      editor.execCommand('selectAll')
      editor.execCommand('indentAuto')
      
    }, 0);
  } else {
    // TODO: Fix this hack. Without setTimeout mobile safari freezes
    setTimeout(function() {

      var doc = editor.getDoc()
      var start = doc.getCursor()
      var i = prompt("count variable:", "i")
      if (!i) {
        return
      }
      var loops = prompt("loop amount:", "3")
      if (!loops) {
        return
      }
      editor.replaceRange(
        "for (int "+i+"=0; "+i+"<"+loops+"; "+i+"++) {}", start
      )
      editor.execCommand('selectAll')
      editor.execCommand('indentAuto')

    }, 0);
  }
}

function insertWhileLoop() {
  var lastSelection = Editor.getLastSelection()
  document.activeElement.blur() // hide keyboard hack
  if (lastSelection.code) {
    // TODO: Fix this hack. Without setTimeout mobile safari freezes
    setTimeout(function() {

      var i = prompt("count variable:", "i")
      if (!i) {
        return
      }
      var loops = prompt("loop amount:", "3")
      if (!loops) {
        return
      }
      editor.replaceRange('', lastSelection.start, lastSelection.end)
      editor.replaceRange(
        "int " + i + " = 0;\nwhile ("+i+"<"+loops+") {\n "
          + lastSelection.code + "\n"+i+"++;\n}", lastSelection.start
      )
      editor.execCommand('selectAll')
      editor.execCommand('indentAuto')

    }, 0);
  } else {
    // TODO: Fix this hack. Without setTimeout mobile safari freezes
    setTimeout(function() {

      var doc = editor.getDoc()
      var start = doc.getCursor()
      var i = prompt("count variable:", "i")
      if (!i) {
        return
      }
      var loops = prompt("loop amount:", "3")
      if (!loops) {
        return
      }
      editor.replaceRange(
        "int " + i + " = 0;\nwhile ("+i+"<"+loops+") {"
          + "\n"+i+"++;\n}", start
      )
      editor.execCommand('selectAll')
      editor.execCommand('indentAuto')

    }, 0);
  }
}
