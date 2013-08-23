// �萔
var OUTFILE = "output.html";
var CONFIG  = "config.yml";

// 
var ScriptRunner = {
  Extension: "re",
  PreProcess: function(file){
    var shell = new ActiveXObject("WScript.Shell");
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var nowdir = shell.currentDirectory;
    try{
      // �R���p�C������
      shell.currentDirectory = fso.getParentFolderName(file);
      // yaml�t�@�C���͂��邩�H
      var yaml = "";
      if(fso.fileExists(fso.buildPath(shell.currentDirectory, CONFIG))){
        yaml = "--yaml=" + CONFIG;
      }
      // ���s
      var ret = 
        Proc.execute("cmd", "/C", "review-compile", "--target",  "html", fso.getFileName(file), "--output-file=" + OUTFILE, yaml); 
      var outfile = fso.buildpath(shell.currentDirectory, OUTFILE);

      if(ret[1] != "")
      {
        Dialogs.Alert(ret[1]);
      }else{
        // HTML�t�@�C����\��
        var shellapp = new ActiveXObject("Shell.Application");
        var shellwin = shellapp.Windows();
        var ie;
        // http://takuya-1st.hatenablog.jp/entry/20071112/1194887535
        for(var i = 0; i < shellwin.count; i++){
          var item = shellwin.item(i);
          if(item && item.fullName.match(/iexplore\.exe$/i)) {
            ie = item;
          }
        }
        
        // IE�I�u�W�F�N�g���Ȃ��Ƃ��́A�V�����쐬����
        if(ie == null){
          ie = new ActiveXObject("InternetExplorer.Application");
          ie.visible = true;
          ie.navigate(outfile);
        }else{
          // IE�I�u�W�F�N�g������Ƃ��́A�^�u�𑀍삷��i�V�����^�u���쐬�j
          ie.navigate2(outfile);
        }
      }
    }finally{
      shell.currentDirectory = nowdir;
    }
  }
}

function outputlines(lines)
{
  if(lines)
  {
    var s = lines.split("\n");
    for(var i = 0; i < s.length; i++)
    {
      App.output.add(s[i]);
    }
  }
  return lines != "";
}
