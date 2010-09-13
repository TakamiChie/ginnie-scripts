ImportFile("./Libs/lib.js");
// ���J���Ă���t�@�C�������ꂼ��̃G���W����
var doc = Documents.NewDocument();
var shell = new ActiveXObject("WScript.Shell");
var fso = new ActiveXObject("Scripting.FileSystemObject");
if(!ExecuteMode())

{
  ScriptMode();
}
App.Quit();

function ExecuteMode()
{
  // ���[�h�g�p�\����
  if(!fso.fileExists(doc.fileName)) return false;
  var fn = doc.fileName;
  doc.save();
  shell.currentDirectory = fso.getParentFolderName(fn);
  text = "";
  for(var i = 0; i < 5; i++)
  {
    text += doc.caret.lineString(i);
  }
  var match = text.match(/\[\[scriptcommand\:(.*?)\]\]/);
  if(!match) return;
  // ����
  var runcommand = eval(format("({0})", match[1]));
  var runner = "";
  if(runcommand["execute"]) runner += runcommand["execute"] + " ";
  runFile(runner, false, true);
  if(runcommand["execafter"]) shell.run(runcommand["execafter"]);
  return true;
}

function ScriptMode()
{
  var scriptFN = format("/ScriptRunner/{0}.js", doc.DocumentType);
  if(fso.fileExists(ScriptDir + scriptFN))
  {
    // �Y��DocType�̃I�u�W�F�N�g��ǂݍ���
    ImportFile("." + scriptFN);
    var fn = SaveTempFile(ScriptRunner.Extension);
    if(ScriptRunner.PreProcess)
    {
      fn = ScriptRunner.PreProcess(fn);
      if(!fn) return;
    }
    var runner = ""
    if(ScriptRunner.Runner) runner += ScriptRunner.Runner + " ";
    if(ScriptRunner.RequireOption) runner += ScriptRunner.RequireOption + " ";
    /*
    if(ScriptRunner.CanOption)
    {
      var arg = Dialogs.Prompt("��������͂��ĉ�����");
      if(arg)
        runner += arg + " "
    }
    */
    // run
    if(ScriptRunner.ExecuteOnScriptDirectory)
    {
      shell.currentDirectory = ScriptDir
    }
    runFile(runner, fn);
    result = true;
    return true;
  }else{
    Dialogs.Alert("ScriptRunner�ŃT�|�[�g����Ă��Ȃ��t�@�C���^�C�v�ł��B\n�t�@�C���^�C�v���ēx�m�F���ĉ������B");
    return false;
  }
}

function SaveTempFile(ext)
{
  var fn;
  if(fso.fileExists(doc.fileName))
  {
    fn = doc.fileName;
    doc.save();
    shell.currentDirectory = fso.getParentFolderName(fn);
  }else{
    fn = format("{0}\\TempFile.{1}", App.GetSpecialDir("TEMP"), ext);
    f = fso.createTextFile(fn, true, false);
    f.write(doc.caret.text);
    f.close();
  }
  return fn;
}

function runFile(execName, fileName, wait)
{
  var command = "cmd /C ";
  if(execName) command += format("{0} ", execName);
  if(fileName) command += format("{0} ", fileName);
  command += "& pause";
  shell.run(command);
}
