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
  App.StatusBar.Text(0) = format("�I���F{0} ���� �S�́F{1} ����", doc.caret.selLength,  doc.caret.text.length);
}