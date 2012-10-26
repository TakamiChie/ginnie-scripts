ImportFile("./Libs/lib.js");
function onDocumentCaChange(tabIndex, row, col, char)
{
  updateCaretInfo();
}

function onDocumentChange( tabIndex )
{
  updateCaretInfo();
}

function updateCaretInfo()
{
  var doc = Documents.NewDocument();
  App.StatusBar.Text(0) = format("選択：{0} 文字 全体：{1} 文字", doc.caret.selLength,  doc.caret.text.length);
}