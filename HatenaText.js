ImportFile("./Libs/Lib.js");
var fn = FileUtils.saveTempFile("txt", false);
var out = Proc.execute(format('perl "{0}\\HatenaText\\Converter.pl" "--file={1}"', App.ScriptDir, fn));

if(out[1]) throw new Error(0, out[1]);
var doc = Documents.CreateDocument("HTML")
doc.caret.text = out[0];
doc.modified = false;
App.Quit();
