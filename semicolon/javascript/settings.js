function toggleSettings() {

    var settingsDiv = document.getElementById('settings');
    settingsDiv.innerHTML = '';

    if (settingsDiv.style.display === 'none') settingsDiv.style.display = 'inline';
    else { settingsDiv.style.display = 'none'; return; }

    var fontPlus = document.createElement('button');
    fontPlus.setAttribute('type', 'button');
    fontPlus.setAttribute('class', 'fontButton');
    fontPlus.setAttribute('onclick', 'increaseFont()');
    fontPlus.innerHTML = '<img id="plus" src="./images/biggerFont.png">';

    settingsDiv.appendChild(fontPlus);

    var fontMinus = document.createElement('button');
    fontMinus.setAttribute('type', 'button');
    fontMinus.setAttribute('class', 'fontButton');
    fontMinus.setAttribute('onclick', 'decreaseFront()');
    fontMinus.innerHTML = '<img id="minus" src="./images/smallerFont.png">';

    settingsDiv.appendChild(fontMinus);
}

function increaseFont() {
    var code = document.getElementsByClassName('CodeMirror')[0];
    var settings = JSON.parse(localStorage.getItem('settings'));
    var newSize = settings.fontSize + 1;
    code.style.fontSize = newSize + 'px';
    settings.fontSize += 1;
    localStorage.setItem('settings', JSON.stringify(settings));
}

function decreaseFront() {
    var code = document.getElementsByClassName('CodeMirror')[0];
    var settings = JSON.parse(localStorage.getItem('settings'));
    var newSize = settings.fontSize - 1;
    code.style.fontSize = newSize + 'px';
    settings.fontSize -= 1;
    localStorage.setItem('settings', JSON.stringify(settings));
}

function initSettings() {
    // set default settings object
    var settings = {
        fontSize: 18
    }

    localStorage.setItem('settings', JSON.stringify(settings));
}

