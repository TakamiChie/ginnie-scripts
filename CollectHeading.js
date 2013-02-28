ImportFile("./Libs/Lib.js");
var INDENT = 2;
var INDENT_CHAR = "\t";

var doc = Documents.NewDocument();
var lines = doc.caret.LineCount;
var count = 0;
var data = "";

for(var i = 0; i < lines; i++)
{
  var s = doc.caret.LineString(i);
  if(s.match(/^(\*+)([^*].*)/))
  {
    var tabcount = RegExp.$1.length - INDENT;
    for(var l = 0; l < tabcount; l++)
    {
      data += INDENT_CHAR;
    }
    data += RegExp.$2 + "\n";
    count++;
  }
}

App.Clipboard.AsText = data;
Dialogs.MsgBox(format("{0}行の見出しリストをクリップボードにコピーしました。", count), undefined, 0x0040 );
App.Quit();
