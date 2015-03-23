// hack to show cursor on mobile
if (Hammer.defaults.cssProps.hasOwnProperty("userSelect")) {
    delete Hammer.defaults.cssProps.userSelect;
}

var editorDiv = document.getElementsByClassName('CodeMirror')[0];
var mc = new Hammer.Manager(editorDiv, {
    transform: false
});
var canvas = document.getElementById('pjs');
var sketchVisible = true;
var selectedSketch = 'Default Sketch';
var instance;

// add gestures
var doubleswipeLeft =  new Hammer.Swipe({
    event: 'doubleswipe-left',
    pointers: 2,
    direction: Hammer.DIRECTION_LEFT,
    threshhold: 3,
    velocity: 0.1
});

var swipeLeft = new Hammer.Swipe({
    event: 'swipe-left',
    pointers: 1,
    direction: Hammer.DIRECTION_LEFT,
    threshhold: 3,
    velocity: 0.1
});

var doubleswipeRight = new Hammer.Swipe({
    event: 'doubleswipe-right',
    pointers: 2,
    direction: Hammer.DIRECTION_RIGHT,
    threshhold: 3,
    velocity: 0.1
});

var swipeRight = new Hammer.Swipe({
    event: 'swipe-right',
    pointers: 1,
    direction: Hammer.DIRECTION_RIGHT,
    threshhold: 3,
    velocity: 0.1
});

var tap = new Hammer.Tap({
    event: 'tap',
    taps: 1,
    pointers: 1
});

var doubletap = new Hammer.Tap({
    event: 'doubletap',
    taps: 2,
    pointers: 1
});

var tripletap = new Hammer.Tap({
    event: 'tripletap',
    taps: 3,
    pointers: 1
});


mc.add([tripletap,
        doubletap,
        tap,
        doubleswipeLeft,
        swipeLeft,
        swipeRight,
        doubleswipeRight,
]);

tripletap.recognizeWith([doubletap, tap]);
doubletap.recognizeWith(tap);

doubletap.requireFailure(tripletap);
tap.requireFailure([tripletap, doubletap]);

mc.on("doubletap", function(ev) {
    // kill word
    editor.execCommand('delWordBefore');
    editor.execCommand('delWordAfter');
});

mc.on('doubleswipe-left', function(e) {
    // doubleswipe to the left undo's the last action
    editor.execCommand('undo');
});

mc.on('doubleswipe-right', function(e) {
    // doubleswipe to the left undo's the last action
    editor.execCommand('redo');
});

mc.on('swipe-left', function(e) {
    // go one word left
    editor.execCommand('goWordLeft');
});

mc.on('swipe-right', function(e) {
    // go one word right
    editor.execCommand('goWordRight');
});

mc.on('tap', function(e) {
    // common helper, for now only color
    if (e.center.x < 50) {
        toggleCodeSnippets();
        return;
    };
    var word = editor.findWordAt(editor.getCursor());
    var wordStr = editor.getRange(word.anchor, word.head);
    if (!R.contains(wordStr)(['background', 'fill', 'stroke'])) return;
    toggleColorPicker();
    clickedWord = wordStr;
});

mc.on('tripletap', function(e) {
    // code snippets box
//    toggleCodeSnippets();
});
