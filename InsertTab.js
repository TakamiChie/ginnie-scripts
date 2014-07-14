//
// ソフトタブの設定にかかわらずタブを入力するスクリプト
//
var doc = Documents.NewDocument();
doc.caret.seltext = "\t";
App.Quit();
