var Lib_Version = "0.2";
ImportFile("./Libs/Proc.js");
ImportFile("./Libs/Logic.js");

// format
function format(string)
{
  var text = string;
  for(var i = 1; i < arguments.length; i++)
  {
    text = text.replace("{" + (i - 1) + "}", arguments[i]); 
  }
  return text;
}

var FileUtils = {
  // FileSystemObject。プライベート
  _fso : new ActiveXObject("Scripting.FileSystemObject"),
  // テキストファイルを読み込み、それを返す。
  readFile: function(filename)
    {
      var t = this._fso.OpenTextFile(filename, 1);
      try
      {
        return t.ReadAll();
      }finally{
        t.close();
      }
    },
  // JSONファイルを読み込み、それを返す。
  readJSON: function(filename){ return eval("(" + FileUtils.readFile(filename) + ")"); },
  include: function(filename){ eval(FileUtils.readFile(filename)); },
  saveTempFile: function(ext, movecurdir){
    var doc = Documents.NewDocument();
    var fn;
    if(this._fso.fileExists(doc.fileName))
    {
      fn = doc.fileName;
      doc.save();
      if(movecurdir){ shell.currentDirectory = this._fso.getParentFolderName(fn); }
    }else{
      fn = format("{0}\\TempFile.{1}", App.GetSpecialDir("TEMP"), ext);
      f = this._fso.createTextFile(fn, true, false);
      f.write(doc.caret.text);
      f.close();
    }
    return fn;
  },
  
  // 指定ディレクトリ配下のファイルを取得するeach
  lsfile : function(dir, func, pattern)
    {
      if(!pattern) pattern = "";
      trace("search target dir:" + dir);
      Logic.each(this._fso.getFolder(dir).files, function(f)
        {
          trace("found:" + f.name);
          var show = false;
          switch(typeof(pattern))
          {
            case "string": 
              show = f.name.match(pattern) != null;
              break;
            case "function":
              show = pattern(f);
              break;
          }
          if(show)
          {
            func(f);
          }
        });
    }
}

function runFile(execName, fileName)
{
  var shell = new ActiveXObject("WScript.Shell");
  var command = "cmd /C " + execName + ' "' + fileName + '" & pause';
  shell.run(command);
}
