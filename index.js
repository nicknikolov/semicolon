require('./processing')
var Processing = window.Processing
var Settings = require('./settings.js')
var Colorpicker = require('./colorPicker.js')
var Examples = require('./exampleSketches.js')
var Gestures = require('./gestures.js')
var Editor = require('./editor.js')
var Browser = require('./sketchBrowser.js')
var Snippets = require('./codeSnippets.js')
var fastclick = require('fastclick')

var instance = null
var settings = null
var editor = null

var topbar = document.getElementsByClassName('topbar')[0];
fastclick(topbar)

var x
var y
document.addEventListener('touchmove', function(e) {

  //e.preventDefault();
  var touch = e.touches[0]
  x = touch.pageX
  y = touch.pageY
  
}, false)

document.addEventListener('touchstart', function(e) {

  //e.preventDefault();
  var touch = e.touches[0]
  x = touch.pageX
  y = touch.pageY
  
}, false)

window.onload = function() {

  // I don't know why this is happening but make sure
  // this is none in the beginning
  // TODO: Fix!
  var codeSnippetsDiv = document.getElementById('code-snippets');
  codeSnippetsDiv.style.display = 'none';
  var sketchBrowser = document.getElementById('sketchBrowser');
  sketchBrowser.style.display = 'none';
  var settingsDiv = document.getElementById('settings');
  settingsDiv.style.display = 'none';
  var colorPicker = document.getElementById('picker');
  colorPicker.style.display = 'none';
  // Hack-----------------------------------------------------

  Examples.load()
  Editor.init(renderSketch)
  Gestures.init()
  Settings.init()
  Browser.init()
  Colorpicker.init()
  Snippets.init()

  settings = Settings.getSettings()
  editor = Editor.getEditor()

  var code = document.getElementsByClassName('CodeMirror')[0]

  // Hack to remove stupid scrolling to top when you enter the code
  code.addEventListener('focus', function (e) {
    document.getElementById('sketch').style.position = 'absolute'
    topbar.style.position = 'absolute'
    if (!y) return
    window.scrollTo(0, y - (screen.width / 2))
  }, true)

  code.addEventListener('blur', function (e) {
    document.getElementById('sketch').style.position = 'fixed'
    topbar.style.position = 'fixed'
  }, true)

  code.style.fontSize = settings.fontSize + 'px'

  // If no default sketch is found, use the template one from
  // index.html and save it as default
  var selectedSketch = Editor.getSelectedSketch()
  if (!localStorage.getItem(selectedSketch)) {
    localStorage.setItem(selectedSketch, editor.getValue())
  }


  document.getElementById('sketchName').innerHTML = selectedSketch
  editor.setValue(localStorage.getItem(selectedSketch))

  editor.execCommand('selectAll')
  editor.execCommand('indentAuto')

  renderSketch()
}

var errorWidget;
function renderSketch() {
  try {
    if (errorWidget) errorWidget.clear()
    canvas = createCanvas()
    var canvas = document.getElementById('pjs')
    var sketch = Processing.compile(editor.getValue())
    // Cleanup
    if (instance) instance.exit()
    instance = new Processing(canvas, sketch)
    var mysketch = Processing.getInstanceById('pjs')
    // Save file
    var selectedSketch = Editor.getSelectedSketch()
    localStorage.setItem(selectedSketch, editor.getValue())
  } catch (e) {
    console.log(e)
    var error = document.createElement('div')
    error.setAttribute('class', 'error')
    error.innerHTML = e.message
    var errorImg = document.createElement('div')
    errorImg.setAttribute('class', 'errorImg')
    errorImg.innerHTML = '<img src="images/warning-8x.png"></img>'
    error.appendChild(errorImg)
    var doc = editor.getDoc()
    var cursor = doc.getCursor()
    var line = editor.lineInfo(cursor.line)
    errorWidget = editor.addLineWidget(line.line, error, {})
  }
}

function createCanvas() {
  // Make a new canvas, in case we're switching from 2D to 3D contexts.
  var container = document.getElementById('sketch')
  var sketch = document.getElementById('pjs')
  container.removeChild(sketch)
  sketch = document.createElement('canvas')
  sketch.id = 'pjs'
  container.appendChild(sketch)
  return sketch
}

document.getElementById('toggleSketch').addEventListener("click", function () {
  // Hide or show code
  var code = document.getElementsByClassName('CodeMirror')[0]
  var toggleButton = document.getElementById('t')

  if (code.style.display !== 'none') {
    code.style.display = 'none'
    t.setAttribute('src', 'images/toggle2.png')
  } else {
    code.style.display = 'block'
    t.setAttribute('src', 'images/toggle1.png')
  }
})
