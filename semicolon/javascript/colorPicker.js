function toggleColorPicker() {
    var colorPickerDiv = document.getElementById('picker');

    if (colorPickerDiv.style.display === 'none') colorPickerDiv.style.display = 'inline';
    else { colorPickerDiv.style.display = 'none'; return; }

    if (document.getElementById('closeButton')) return;
    var closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('class', 'fontButton');
    closeButton.setAttribute('id', 'closeButton');
    closeButton.setAttribute('onclick', 'closeTogglePicker()');
    closeButton.innerHTML = 'close';
    colorPickerDiv.appendChild(closeButton);

}

function closeTogglePicker() {
    toggleColorPicker();
    firstColor = true;
}
