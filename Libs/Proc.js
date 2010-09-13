var Proc = {
  execute : function(command){
    var proc = new ActiveXObject("WScript.Shell").exec(command);
    proc.stdIn.Close();
    while(proc.exitCode != 0)
    {
      App.Sleep(10);
    }
    return [proc.stdOut.readAll(), proc.stdErr.readAll()];
  }
};
