ImportFile("./Libs/lib.js");
var wsh = new ActiveXObject("WScript.Shell");
var fso = new ActiveXObject("Scripting.FileSystemObject");
var path = fso.buildPath(wsh.RegRead("HKCU\\Software\\GitExtensions\\InstallDir"), "GitExtensions.exe")
if(fso.fileExists(path)){
  // .gitフォルダを探索
  var doc = Documents.newDocument();
  if(doc.save()){
    var folder = fso.getFolder(fso.getParentFolderName(doc.fileName))
    try{
      while(!fso.folderExists(fso.buildPath(folder.path, ".git"))){
        folder = folder.parentFolder;
      }
      var shell = new ActiveXObject("WScript.Shell");
      shell.run(format("\"{0}\" commit \"{1}\"", path, folder.path));
    }catch(e){
      Dialogs.Alert("リポジトリルートフォルダが発見できませんでした。リポジトリではない可能性があります\n" + e.message);
    }
  }
}else{
  Dialogs.Alert("Git Extensionsがインストールされていません");
}

App.Quit();
