ImportFile("./Libs/lib.js");
function onDocumentCaretChange(tabIndex, row, col, char)
{
  updateCaretInfo();
}

function onDocumentChange( tabIndex )
{
  updateCaretInfo();
}

function onDocumentKeyPress( tabIndex, key)
{
  var VK_BACK = 0x8;
  var VK_ENTER = 0xd;
  var VK_SHIFT = 0x10;
  // ReView編集モードの時に限り、オートインデントチェック
  var doc = Documents.NewDocument();
  switch(doc.DocumentType){
    case "ReVIEW":
      var l = doc.caret.lineString(doc.caret.line);
      switch(key){
        case VK_BACK:
            // 箇条書きを削除(シフトキー同時押しの時は削除しない)
            if(!App.keyState(VK_SHIFT)){
              var m = l.match(/^\s*(\*+|\d\.)\s*$/);
              if(m != null){
                  doc.caret.selStart = doc.caret.selStart - m[0].length;
                  doc.caret.selLength = m[0].length;
                  doc.caret.deleteSelected();
                  return 0;
              }
            }
            break;
        case VK_ENTER:
            // 箇条書き中に改行したら、次の行も箇条書きに
            var m = l.match(/^\s*(\*+|\d\.)\s*/);
            if(m != null){
              doc.caret.selText = "\n" + m[0];
              return 0;
            }
            // ブロック文をはじめたら、ブロック文を閉じる
            var m = l.match(/^\/\/\w+\{/);
            if(m != null){
              doc.caret.selText = "\n\n//}\n";
              doc.caret.selStart = doc.caret.selStart - 5;
              return 0;
            }
            break;
      }
      break;
    case "JScript":
      var l = doc.caret.lineString(doc.caret.line);
      switch(key){
        case VK_BACK:
            // 箇条書きを削除(シフトキー同時押しの時は削除しない)
            if(!App.keyState(VK_SHIFT)){
              var m = l.match(/^\s*\/\/\s*$/);
              if(m != null){
                  doc.caret.selStart = doc.caret.selStart - m[0].length;
                  doc.caret.selLength = m[0].length;
                  doc.caret.deleteSelected();
                  return 0;
              }
            }
            break;
        case VK_ENTER:
            // コメント中に改行したら、次の行もコメントに
            var m = l.match(/^\s*\/\/\s*/);
            if(m != null){
              doc.caret.selText = "\n" + m[0];
              return 0;
            }
            break;
      }
    break;
  }
  return key;
}

function updateCaretInfo()
{
  var doc = Documents.NewDocument();
  App.StatusBar.Text(0) = format("選択：{0} 文字 全体：{1} 文字", doc.caret.selLength,  doc.caret.text.length);
}