ImportFile("./Libs/lib.js");
var doc = Documents.NewDocument();
if(doc.caret.selected)
  Dialogs.Alert(format("選択文字列サイズ：{0}\nテキストサイズ：{1}",
    doc.caret.sellength, doc.caret.text.length));
else
  Dialogs.Alert(format("テキストサイズ：{0}", doc.caret.text.length));

App.Quit();