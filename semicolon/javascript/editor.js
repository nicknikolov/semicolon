var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: 'text/x-processing',
    lineNumbers: true,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    autofocus: true,
    theme: 'ambiance',
    smartIndent: true,
    indentUnit: 2,
    tabSize: 2,
});

// rerender Processing sketch on code change
editor.on('change', renderSketch);

var lastSelection = { start: 0, end: 0, code: ''};
// forget last selection after 2 times
var forgetCounter = 0;

editor.on('cursorActivity', function() {
    // a bit of a hack but, keep last marked
    // chunk of text so I can do stuff with it
    // e.g. wrap for or while loops around it
    var doc = editor.getDoc();
    var start = doc.getCursor(true);
    var end = doc.getCursor(false);
    var newSelection = doc.getRange(start, end);
    if (newSelection || forgetCounter === 2) {
        lastSelection.start = start;
        lastSelection.end = end;
        lastSelection.code = newSelection;
        forgetCounter = 0;
    } else {
        forgetCounter++;
    }
});

CodeMirror.registerHelper("hint", "processing", function (cm, options) {
    if (words = cm.getHelper(cm.getCursor(), "hintWords")) {
        if (words) {
            var index = words.indexOf('rect');

            var customWords = [
                'rect',
                'ellipse',
                'triangle',
                'line',
                'quad',
                'arc',
                'point'
            ];

            // Now someone replace those prompts with some live shapes
            // and Bret Victor would be all over this
            var completions = {
                'rect': {
                    displayText: 'rect',
                    hint: function(cm, data, completion) {
                        var paramsStr = prompt("Please specify (seperated by spaces):" +
                                                "\n x y width height\n"+
                                                "optional:\n radiiAllCorners" +
                                                " rTopLeft rTopRight \n rDownLeft " +
                                                "rDownRight", "");

                        var params = paramsStr.replace(/ /g, ', ');
                        editor.replaceRange("rect(" + params +');',
                                            completion.from || data.from,
                                            completion.to || data.to, "complete");
                    }
                },

                'ellipse': {
                    displayText: 'ellipse',
                    hint: function(cm, data, completion) {
                        var paramsStr = prompt("Please specify (seperated by spaces): " +
                                                "\n x y width height", "");

                        var params = paramsStr.replace(/ /g, ', ');
                        editor.replaceRange("ellipse(" + params +');',
                                            completion.from || data.from,
                                            completion.to || data.to, "complete");
                    }
                },

                'triangle': {
                    displayText: 'triangle',
                    hint: function(cm, data, completion) {
                        var paramsStr = prompt("Please specify (seperated by spaces): " +
                                                "\n x1 y1 x2 y2 x3 y3", "");

                        var params = paramsStr.replace(/ /g, ', ');
                        editor.replaceRange("triangle(" + params +');',
                                            completion.from || data.from,
                                            completion.to || data.to, "complete");
                    }
                },

                'line': {
                    displayText: 'line',
                    hint: function(cm, data, completion) {
                        var paramsStr = prompt("Please specify (seperated by spaces):" +
                                                "\n x1 y1 x2 y2 (optional:z1 z2)", "");

                        var params = paramsStr.replace(/ /g, ', ');
                        editor.replaceRange("line(" + params +');',
                                            completion.from || data.from,
                                            completion.to || data.to, "complete");
                    }
                },

                'quad': {
                    displayText: 'quad',
                    hint: function(cm, data, completion) {
                        var paramsStr = prompt("Please specify (seperated by spaces):" +
                                                "\n x1 y1 x2 y2 x3 y3 x4 y4", "");

                        var params = paramsStr.replace(/ /g, ', ');
                        editor.replaceRange("quad(" + params +');',
                                            completion.from || data.from,
                                            completion.to || data.to, "complete");
                    }
                },

                'arc': {
                    displayText: 'arc',
                    hint: function(cm, data, completion) {
                        var paramsStr = prompt("Please specify (seperated by spaces):" +
                                                "\n x y wdith height" +
                                                "\n startAngle stopAngle", "");

                        var params = paramsStr.replace(/ /g, ', ');
                        editor.replaceRange("arc(" + params +');',
                                            completion.from || data.from,
                                            completion.to || data.to, "complete");
                    }
                },

                'point': {
                    displayText: 'point',
                    hint: function(cm, data, completion) {
                        var paramsStr = prompt("Please specify (seperated by spaces): " +
                                                "\n x y z", "");

                        var params = paramsStr.replace(/ /g, ', ');
                        editor.replaceRange("point(" + params +');',
                                            completion.from || data.from,
                                            completion.to || data.to, "complete");
                    }
                }
            }
            var customizedWords = [];
            customizedWords = R.map(function (word) {
                if (R.contains(word)(customWords)) {
                    return completions[word];
                }
                return word;
            }, words);

            var cur = cm.getCursor(), token = cm.getTokenAt(cur);
            var found = [];
            for (var i = 0; i < customizedWords.length; i++) {
                var word = customizedWords[i];
                if (R.is(Object, word)) {
                    if (word.displayText.slice(0, token.string.length) == token.string)
                        found.push({
                            text: word.text,
                            displayText: word.displayText,
                            hint: word.hint
                        });
                } else {
                    if (word.slice(0, token.string.length) == token.string)
                        found.push({text: word});
                }
            }

            if (found.length) return {
                list: found,
                from: CodeMirror.Pos(cur.line, token.start),
                to: CodeMirror.Pos(cur.line, token.end)
            };
        }
    }
});

editor.on('inputRead', function(e) {
    CodeMirror.showHint(editor, CodeMirror.hint.processing,
            { 'completeOnSingleClick': true });
});
