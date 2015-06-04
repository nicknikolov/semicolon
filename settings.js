module.exports.init = init
module.exports.getSettings = getSettings

function init () {
  if (!localStorage.getItem('settings')) {
    var settings = {
      fontSize: 18
    }
    localStorage.setItem('settings', JSON.stringify(settings))
  }
}

function getSettings () {
  return localStorage.getItem('settings')
}

document.getElementById('settingsButton').addEventListener("click", function () {

  var settingsDiv = document.getElementById('settings')
  settingsDiv.innerHTML = ''

  if (settingsDiv.style.display === 'none') {
    settingsDiv.style.display = 'inline'
  }
  else {
    settingsDiv.style.display = 'none'
    return
  }

  var fontPlus = document.createElement('button')
  fontPlus.setAttribute('class', 'fontPlus')
  fontPlus.onclick = increaseFont

  settingsDiv.appendChild(fontPlus)

  var fontMinus = document.createElement('button')
  fontMinus.setAttribute('class', 'fontMinus')
  fontMinus.onclick = decreaseFront


  settingsDiv.appendChild(fontMinus)

  var autoIndent = document.createElement('button')
  autoIndent.setAttribute('class', 'autoIndent')
  autoIndent.onclick = autoIndent
  autoIndent.innerHTML = 'Auto indent'

  settingsDiv.appendChild(autoIndent)
})

function autoIndent() {
  editor.execCommand('selectAll')
  editor.execCommand('indentAuto')
}

function increaseFont() {
  var code = document.getElementsByClassName('CodeMirror')[0]
  var settings = JSON.parse(localStorage.getItem('settings'))
  var newSize = settings.fontSize + 1
  code.style.fontSize = newSize + 'px'
  settings.fontSize += 1
  localStorage.setItem('settings', JSON.stringify(settings))
}

function decreaseFront() {
  var code = document.getElementsByClassName('CodeMirror')[0]
  var settings = JSON.parse(localStorage.getItem('settings'))
  var newSize = settings.fontSize - 1
  code.style.fontSize = newSize + 'px'
  settings.fontSize -= 1
  localStorage.setItem('settings', JSON.stringify(settings))
}


