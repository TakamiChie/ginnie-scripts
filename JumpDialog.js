ImportFile("./Libs/lib.js");
var doc = Documents.NewDocument();
var fso = new ActiveXObject("Scripting.FileSystemObject");
var scriptFN = format("/JumpDialog/{0}.js", doc.DocumentType);
if(fso.fileExists(App.ScriptDir + scriptFN)){
  // 該当DocTypeのオブジェクトを読み込む
  ImportFile("." + scriptFN);
  // トークンリストを受け取る
  var list = createTokenList(doc);
  
  if(list.length > 0){
  	// フォーム生成
	var form = App.NewVCLObject("VCLForm");
	var dlist = App.NewVCLObject("VCLListBox", form);
	var panel = App.NewVCLObject("VCLPanel", form);
	var okbutton = App.NewVCLObject("VCLButton", panel);
	var cancelbutton = App.NewVCLObject("VCLButton", panel);
	form.onInitialize = "formOnInitialize";
	dlist.align = 5;
	panel.align = 2;
	panel.height = 25;
	okbutton.align = 3;
	okbutton.defaultmode = true;
	okbutton.caption = "ジャンプ";
	okbutton.onclick = "buttonOnClick"
	cancelbutton.align = 4;
	cancelbutton.cancelmode = true;
	cancelbutton.caption = "キャンセル";
	cancelbutton.onclick = "buttonOnClick"
	// トークンリスト読み込み
  	for(var i = 0; i < list.length; i++){
		dlist.items.add(list[i][0] + "(" + (list[i][1] + 1) + "行)");
		if(doc.caret.line >= list[i][1]){
			dlist.itemindex = i;
		}
  	}
  	form.showmodal();
  }
}else{
  Dialogs.alert("JumpDialogはこの文章形式には対応していません");
}

App.Quit();

function buttonOnClick(sender){
  if(sender == okbutton){
  	// トークンに移動
    doc.caret.line = list[dlist.itemindex][1];
    doc.caret.scrollCaret();
  }
  form.close();
}

function formOnInitialize(sender){
  sender.caption = "トークン一覧";
  sender.borderStyle = 3;
  sender.position = 6;
  okbutton.width = panel.width / 2;
  cancelbutton.width = panel.width / 2;
}
