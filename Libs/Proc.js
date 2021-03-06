var Proc = {
  escape: true,
  exec: function(){
    // 引数組み立て
    var s = App.NewObject("StringBuilder");
    for(var i = 0; i < arguments.length; i++)
    {
      if(arguments[i].indexOf(" ") != -1 && Proc.escape){
        s.Append("\"" + arguments[i] + "\"");
      }else{
        s.Append(arguments[i]);
      }
      s.Append(" ");
    }
    return Proc._exec(s.ToString());
  },
  execute: function(){
    // 引数組み立て
    var s = App.NewObject("StringBuilder");
    for(var i = 0; i < arguments.length; i++)
    {
      if(arguments[i].indexOf(" ") != -1 && Proc.escape){
        s.Append("\"" + arguments[i] + "\"");
      }else{
        s.Append(arguments[i]);
      }
      s.Append(" ");
    }
    // 実行
    var proc = Proc._exec(s.ToString());
    proc.stdIn.Close();
    while(proc.exitCode != 0)
    {
      App.Sleep(10);
    }
    return [proc.stdOut.readAll(), proc.stdErr.readAll()];
  },
  _exec: function(cmdline){
    return new ActiveXObject("WScript.Shell").exec(cmdline)
  },
  VERSION: 2.1
};
