ImportFile("./Libs/lib.js");
var doc = Documents.NewDocument();
var fso = new ActiveXObject("Scripting.FileSystemObject");

function build(){
  var scriptFN = format("/AddonRunner/{0}.js", doc.DocumentType);
  if(fso.fileExists(ScriptDir + scriptFN))
  {
    // 該当DocTypeのオブジェクトを読み込む
    ImportFile("." + scriptFN);
    for(var i = 0; i < Items.length; i++){
      var c = Items[i].caption;
      var b = Items[i].body;
      switch(typeof(b)){
        case "string":
          // 文字列挿入メニューを追加
          addMenu(c, function(doc, b){ insertStringFunc(doc, b); }, b);
          break;
        case "function":
          // function実行メニューを追加
          addMenu(c, b);
          break;
        default:
          // no supported type
      }
    }
  }
}

// 実行用メソッド

// 文字列挿入処理を行う
// doc...挿入対象のドキュメントオブジェクト
// text...挿入対象のテキスト。以下のトークンが有効
//   ||...このトークンがあった場合、現在選択されているテキストをトークンの前の語と後の語で挟む
//   %TEXT%...このトークンがあった場合、挿入直前に入力ダイアログが表示され、そこで入力された語にトークンが置き換えられる
function insertStringFunc (doc, text){
  // プリプロセス
  while(text.match(/%%(([^%:]+)(:(\w+))?)%%/) != null){
    var s = Dialogs.Prompt(RegExp.$2);
    if(s.length > 0){
      text = text.split("%%" + RegExp.$1 + "%%").join(s);
      if(RegExp.$4 != ""){
        text = text.split("%%" + RegExp.$4 + "%%").join(s);
      }
    }else{
      // キャンセルとみなす
      return;
    }
  }
  // テキスト挿入
  var texts = text.split("||");
  if(texts.length == 1){
    // その場に挿入
    doc.caret.selText = texts[0];
  }else{
    // 選択範囲を挟む形で挿入
    var ss = doc.caret.selStart;
    var sl = doc.caret.selLength;
    doc.caret.selText = texts[0] + doc.caret.selText + texts[1];
    doc.caret.selStart = ss + texts[0].length - sl;
    doc.caret.selLength = sl;
  }
}
// Utility

var menuProcs = [];
function addMenu(caption, func, param){
  menuProcs.push({
    caption: caption,
    func: func,
    param: param});
}

function showMenu(){
  Dialogs.SelectBox.Clear();
  if(menuProcs.length > 0){
    for(var i = 0; i < menuProcs.length; i++){
      Dialogs.SelectBox.Add(menuProcs[i].caption);
    }
    Dialogs.SelectBox.ItemIndex = 0;
    var index = Dialogs.SelectBox.Execute();
    if(index >= 0){
      menuProcs[index].func(doc, menuProcs[index].param);
    }
  }
}
build();
showMenu();
App.Quit();