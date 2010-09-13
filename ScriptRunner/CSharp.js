var ScriptRunner = {
  Extension: "cs",
  CanOption: true,
  PreProcess: function(file){
    var shell = new ActiveXObject("WScript.Shell");
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var path = "C:\\Windows\\Microsoft.NET\\Framework\\v3.5\\";
    var sourcedir = fso.getParentFolderName(file);
    var sourcename = fso.getBaseName(file);
    App.output.clear();
    var ret = 
      Proc.execute(format('{0}csc.exe /nologo /out:{1}\\{2}.exe "{3}"', 
        path, sourcedir, sourcename, file));
    var sc;
    if(ret[0] + ret[1] != "") App.Actions.OutputWindow.execute();
    sc  = outputlines(ret[0]);
    sc |= outputlines(ret[1]);
    if(sc)
    {
      return "";
    }
    else
    {
      return format("{0}\\{1}.exe", sourcedir, sourcename);
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
