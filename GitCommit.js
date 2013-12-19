ImportFile("./Libs/lib.js");
var wsh = new ActiveXObject("WScript.Shell");
var fso = new ActiveXObject("Scripting.FileSystemObject");
var command = App.ParamCount > 0 ? App.Params(0) : "commit";
var path = fso.buildPath(wsh.RegRead("HKCU\\Software\\GitExtensions\\InstallDir"), "GitExtensions.exe")
if(fso.fileExists(path)){
  // .git�t�H���_��T��
  var doc = Documents.newDocument();
  if(doc.save()){
    var folder = fso.getFolder(fso.getParentFolderName(doc.fileName))
    try{
      while(!fso.folderExists(fso.buildPath(folder.path, ".git"))){
        folder = folder.parentFolder;
      }
      var shell = new ActiveXObject("WScript.Shell");
      shell.run(format("\"{0}\" {1} \"{2}\"", path, command, folder.path));
    }catch(e){
      Dialogs.Alert("���|�W�g�����[�g�t�H���_�������ł��܂���ł����B���|�W�g���ł͂Ȃ��\��������܂�\n" + e.message);
    }
  }
}else{
  Dialogs.Alert("Git Extensions���C���X�g�[������Ă��܂���");
}

App.Quit();
