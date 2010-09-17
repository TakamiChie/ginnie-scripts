ImportFile("./Libs/lib.js");
var doc = Documents.newDocument()
doc.caret.selectWordFromCaret()
var menuEntries = FileUtils.readJSON(App.ScriptDir + "\\WebSearch\\searchEngines.json");
var pop = App.NewObject("Popup");
for (i = 0; i < menuEntries.length; i++)
  pop.Add(menuEntries[i][0] + "Ç≈åüçı");
i = pop.Execute();
if (i >= 0)
{
  setSearchEngine(menuEntries[i][0], menuEntries[i][1]);
}
App.Quit();

function setSearchEngine(name, url)
{
  var s = Dialogs.prompt(format("{0}Ç≈åüçı", name), "åüçı", doc.caret.selText);
  if(s != "")
  {
    var shell = new ActiveXObject("WScript.Shell");
    shell.run(url.replace("%s", App.toWebString(s)));
  }
}