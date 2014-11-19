// 
// JumpDialog用ReVIEW定義ファイル
// 
function createTokenList(doc){
  var list = [];
  var c = doc.caret;
  // 走査開始
  for(var i = 0; i < c.lineCount; i++){
    var l = c.lineString(i);
    switch(l.charAt(0)){
      case "=":
        // 見出し行コレクション(/columnは抜く)
        if(!l.contains("[/column]")){
          list.push([l, i]);
        }
        break;
      case "/":
        var m = l.match(/\w+/g);
        if(m != null){
          // ブロック構文チェック
          switch(m[0]){
            case "lead":
              list.push([" * リード文 * ", i]);
              break;
            case "table":
              list.push([format(" * テーブル({0}) *", m[1]), i ]);
              break;
            case "footnote":
              list.push([format(" * 注釈({0}) *", m[1]), i ]);
              break;
          }
        }
        break;
    }
  }
  return list;
}
