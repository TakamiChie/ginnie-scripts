var Proc = {
  escape: true,
  exec: function(){
    var s = "";
    for(var i = 0; i < arguments.length; i++)
    {
      if(arguments[i].indexOf(" ") != -1 && escape){
        s += "\"" + arguments[i] + "\" ";
      }else{
        s += arguments[i] + " ";
      }
    }
    return new ActiveXObject("WScript.Shell").exec(s);
  },
  execute: function(){
    var proc = Proc.exec();
    proc.stdIn.Close();
    while(proc.exitCode != 0)
    {
      App.Sleep(10);
    }
    return [proc.stdOut.readAll(), proc.stdErr.readAll()];
  },
  VERSION: 2
};
