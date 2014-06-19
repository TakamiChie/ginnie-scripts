//
// ソフトタブの設定にかかわらずタブを入力するスクリプト
//
var doc = Documents.NewDocument();
doc.caret.add("\t");
App.Quit();
