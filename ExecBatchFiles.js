ImportFile("./Libs/lib.js");
/*
 * 現在開いているファイルと同一ディレクトリにあるバッチファイル的ファイル(*.bat, *.ps1, *.js, *.wsf, *.exe)を実行するメニュー表示
 */
var popup = App.NewObject("Popup");
var doc = Documents.NewDocument();
var fso = FileUtils._fso;
var dirname = fso.getParentFolderName(doc.FileName);

/* 列挙開始 */
FileUtils.lsfile(dirname, function(f){
    popup.Add(fso.getFileName(f));
  }, "\.(bat|ps1|js|wsf|exe)");

// 表示
var i = popup.Execute();

if(i >= 0){
  var f = fso.buildPath(dirname, popup.Strings(i));
  trace(f);
  var ret = Proc.exec(f);
}
App.Quit();
