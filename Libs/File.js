var File = {
  // FileSystemObject。プライベート
  _fso : new ActiveXObject("Scripting.FileSystemObject"),
  // テンポラリファイルを保存し、ファイル名を返す
  // text...保存するファイルを示す文字列
  // ext...拡張子。省略可能。省略した場合はtxtとなる
  // return...保存したテキストファイルのファイル名
  saveTemporaryFile: function(text, ext){
    if(ext == undefined) ext = "txt";
    var fn = format("{0}\\TempFile.{1}", App.GetSpecialDir("TEMP"), ext);
    File.writeFile(fn, text);
    return fn;
  },
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
  writeFile: function(filename, data){
    var f = this._fso.createTextFile(filename, true, false);
    try
    {
      f.write(data);
    }finally{
      f.close();
    }
  },
  VERSION: 1
}