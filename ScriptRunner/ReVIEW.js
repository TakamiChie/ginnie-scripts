var OUTFILE = "output.html";
var ScriptRunner = {
  Extension: "re",
  PreProcess: function(file){
    var shell = new ActiveXObject("WScript.Shell");
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    App.output.clear();
    var nowdir = shell.currentDirectory;
    try{
      // コンパイル処理
      shell.currentDirectory = fso.getParentFolderName(file);
      var ret = 
        Proc.execute("cmd", "/C", "review-compile", "--target",  "html", fso.getFileName(file), "--output-file=" + OUTFILE); 
      var outfile = fso.buildpath(shell.currentDirectory, OUTFILE);

      if(ret[1] != "")
      {
        Dialogs.Alert(ret[1]);
      }else{
        // HTMLファイルを表示
        var shellapp = new ActiveXObject("Shell.Application");
        var shellwin = shellapp.Windows();
        var ie;
        for(var i = 0; i < shellwin.count; i++){
          var item = shellwin.item(i);
          if(item && item.fullName.match(/iexplore\.exe$/i)) {
            ie = item;
          }
        }
        
        // IEオブジェクトがないときは、新しく作成する
        if(ie == null){
          ie = new ActiveXObject("InternetExplorer.Application");
          ie.visible = true;
          ie.navigate(outfile);
        }else{
          // IEオブジェクトがあるときは、タブを操作する（新しいタブを作成）
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
