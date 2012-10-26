ImportFile("./Libs/lib.js");
ImportFile("./Libs/File.js");
var fso = new ActiveXObject("Scripting.FileSystemObject");
var dataDir = fso.buildPath(App.ScriptDir, "ExecCommand");
var dataFile = fso.buildPath(dataDir, "\\command.txt");
if(!fso.folderExists(dataDir)){
  fso.createFolder(dataDir);
}
var prevCmd;
if(fso.fileExists(dataFile)){
  prevCmd = File.readFile(dataFile);
}
var command = Dialogs.Prompt("コマンド", "実行するコマンドを指定してください", prevCmd);
if(command != ""){
  var doc = Documents.NewDocument();
  var file = File.saveTemporaryFile(doc.Caret.SelText);
  try
  {
    Proc.escape = false;
    var res = Proc.execute(command, "\"" + file + "\"");
    var ss = doc.caret.selStart;
    var sl = doc.caret.selLength;
    doc.caret.SelText = res[0];
    doc.caret.selStart = ss;
    doc.caret.selLength = sl;
    File.writeFile(dataFile, command);
  }catch(e){
    Dialogs.Alert(e.message);
  }
}
App.Quit();