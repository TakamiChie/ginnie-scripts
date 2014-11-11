ImportFile("./Libs/lib.js");
var doc = Documents.NewDocument();
var text = doc.caret.Text;
var m = text.match(/@\<kw\>\{[^}]+\}/g)

// UIフォームの作成
var form = App.NewVCLObject("VCLForm");
var toplabel = App.NewVCLObject("VCLLabel", form);
var list = App.NewVCLObject("VCLListBox", form);
var panel = App.NewVCLObject("VCLPanel", form);
var combo = App.NewVCLObject("VCLComboBox", panel);
var okbutton = App.NewVCLObject("VCLButton", panel);
toplabel.align = 1;
list.align = 5;
panel.align = 2;
panel.height = 50;
combo.align = 5;
okbutton.align = 2;
// トップラベルの設定
toplabel.caption = "以下のキーワードが抽出されました";
// コンボボックスの設定
combo.items.add("見出しレベル2として作成");
combo.items.add("見出しレベル3として作成");
combo.items.add("見出しレベル4として作成");
combo.items.add("見出しレベル5として作成");
combo.items.add("見出しレベル6として作成");
combo.items.add("箇条書き(順序無し)として作成");
combo.items.add("箇条書き(順序有り)として作成");
combo.style = 2;
combo.itemindex = 0;
// リストの設定
var altext = "";
for(var i = 0; i < m.length; i++){
  var tok = m[i].slice(6, -1).split(",")[0];
  if(!altext.contains(tok)){
    list.items.add(m[i].slice(6, -1).split(",")[0]);
  }
  altext = altext + tok + ",";
}
// ボタンキャプション
okbutton.caption = "クリップボードに貼り付け";
okbutton.onClick = "okbuttonClick";
form.onInitialize = "formOnInitialize";
form.showModal();
App.Quit();

function formOnInitialize(sender){
  sender.caption = "抽出されたキーワード";
  sender.borderStyle = 3;
  sender.position = 6;
}

function okbuttonClick(sender){
  var tokens = ["==", "===", "====", "=====", "======", " *", " 1."];
  var token = tokens[combo.itemindex] + " ";
  var text = "";
  for(var i = 0; i < list.items.count; i++){
    text = text + token + list.items.strings(i) + "\n";
  }
  App.clipboard.asText = text;
  form.close();
}

App.Quit();
