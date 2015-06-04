module.exports.init = init;

var Editor = require('./editor')

function toggle () {
    var sketchBrowser = document.getElementById('sketchBrowser')
    if (sketchBrowser.style.display === 'none') {
      sketchBrowser.style.display = 'inline'
    }
    else {
      sketchBrowser.style.display = 'none'
    }
}

function init () {
  var editor = Editor.getEditor()

  document.getElementById('sketchName').addEventListener("click", toggle)

  // draw list with available sketches from local storage
  var ul = document.getElementById("sketchList")
  ul.innerHTML = ''

  var li = document.createElement('li')
  var newButton = document.createElement('div')
  newButton.setAttribute('id', 'listText')
  newButton.innerHTML = 'New Sketch <img id="n" src="./images/new.png">'
  newButton.style.background = 'none'
  li.appendChild(newButton)
  li.onclick = newSketch
  ul.appendChild(li)

  for (var i=0; i<localStorage.length; i++) {
    // skip Safari bullshit
    if (localStorage.key(i).substring(0,3) === 'com') continue
    if (localStorage.key(i) === 'debug') continue
    if (localStorage.key(i) === 'settings') continue

    // create list
    var li = document.createElement('li')

    // add sketch name to row
    var sketchNameInList = document.createElement('div')
    sketchNameInList.setAttribute('id', 'listText')
    sketchNameInList.innerHTML = localStorage.key(i)
    sketchNameInList.style.background = 'none'

    // attach change function to sketch name
    sketchNameInList.onclick = (function() {
      var index = i
      return function() { changeSketchTo(index) }
    })()
    li.appendChild(sketchNameInList)

    // no delete button for default sketch, we don't
    // want to delete that
    if (localStorage.key(i) === 'Default Sketch') {
      ul.appendChild(li)
      continue
    }

    // add delete button
    var deleteButton = document.createElement('div')
    deleteButton.setAttribute('id', 'deleteButton')
    deleteButton.style.background = 'none'
    deleteButton.innerHTML = '<img class="d" src="./images/delete.png">'

    // attach delete function
    deleteButton.onclick = (function() {
      var index = i
      return function() { deleteSketch(index) }
    })()
    li.appendChild(deleteButton)

    // add rename button
    var renameButton = document.createElement('div')
    renameButton.setAttribute('id', 'renameButton')
    renameButton.style.background = 'none'
    renameButton.innerHTML = '<img class="r" src="./images/rename.png">'

    // attach rename function
    renameButton.onclick = (function() {
      var index = i
      return function() { renameSketch(index) }
    })()
    li.appendChild(renameButton)

    // append row to list
    ul.appendChild(li)
 }

  function newSketch() {
    // ask for name
    var sketchName = prompt("Please enter a name for your new sketch", "")
    if (!sketchName) return
    // set up a new sketch and save it to local storage
    var startersCode = 'void setup() {\n' +
          '  size(screen.width, screen.height);\n' +
          '}\n\n' +
          'void draw() {\n' +
          '  \n' +
          '}';

    Editor.setSelectedSketch(sketchName)
    localStorage.setItem(sketchName, startersCode)
    editor.setValue(startersCode)
    document.getElementById('sketchName').innerHTML = sketchName
    toggle()
    init()
  }

  function changeSketchTo(sketchKey) {
    // save old sketch first!
    console.log(sketchKey)
    localStorage.setItem(Editor.getSelectedSketch(), editor.getValue())
    if (sketchKey === undefined) return
    // load new one
    var selectedSketch = localStorage.key(sketchKey)
    Editor.setSelectedSketch(selectedSketch)
    editor.setValue(localStorage.getItem(selectedSketch))
    //renderSketch()
    // update header and close sketch browser
    document.getElementById('sketchName').innerHTML = selectedSketch
    toggle()
    init()
  }

  function deleteSketch(keyToDelete) {
    // switch to default sketch
    if (!confirm('Do you really wish to delete this sketch?')) return
    var defaultSketchKey = 0
    for (item in localStorage) {
      if (item == 'Default Sketch') break
      defaultSketchKey++
    }
    changeSketchTo(defaultSketchKey)

    // delete this one
    localStorage.removeItem(localStorage.key(keyToDelete))
    toggle()
    init()
  }

  function renameSketch(key) {
    var oldSketchName = localStorage.key(key)
    var code = localStorage.getItem(oldSketchName)
    var newSketchName = prompt('Please enter new sketch name', oldSketchName)
    if (!newSketchName) return
    // set up a new sketch and save it to local storage
    var selectedSketch = newSketchName
    Editor.setSelectedSketch(selectedSketch)
    localStorage.setItem(newSketchName, code)
    localStorage.removeItem(oldSketchName)
    document.getElementById('sketchName').innerHTML = selectedSketch
    toggle()
    init()
  }
}
