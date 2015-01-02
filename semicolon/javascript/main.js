
var editor = ace.edit("editor");

editor.setTheme("ace/theme/processing");
editor.getSession().setMode("ace/mode/java");
editor.getSession().setUseWrapMode(true);
editor.setFontSize(15);

console.log(editor.getSession().getDocument().getAllLines());
