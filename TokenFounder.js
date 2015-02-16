/**
 * トークンの一覧表示を行うユーザードッキングウィンドウを表示するスクリプト
 */
ImportFile("./Libs/lib.js");
User.onInitialize = "onInitialize";
User.onFinalize = "onFinalize";

var edit;
var list;
var label;

/**
 * Form
 */
function onInitialize(sender){
  sender.caption = "トークン一覧";
  edit = App.NewVCLObject("VCLEdit", sender);
  list = App.NewVCLObject("VCLListBox", sender);
  label = App.NewVCLObject("VCLLabel", sender);
  edit.align = 1;
  edit.onChange = "editOnChange";
  list.align = 5;
  list.onDblClick = "listOnDblClick";
  list.onKeyPress = "listOnKeyPress";
  label.align = 2;
  label.font.color = 0x0000FF;
  label.visible = false;
}

function onFinalize(sender){
}

/**
 * List
 */
function listOnDblClick(sender){
  moveToIndex();
}

function listOnKeyPress( sender, key ){
  var VK_ENTER = 0xd;
  if(key == VK_ENTER){
    moveToIndex();
  }
}

/*
 * Edit
 */
function editOnChange(sender){
  findCurrentEditor(edit.text);
}

/**
 * リストボックスで選択している項目行にジャンプする
 */
function moveToIndex(){
  var doc = Documents.NewDocument();
  var n = parseInt(list.items.strings(list.itemIndex).split(":", 2)[0]);
  doc.caret.line = n - 1;
  doc.caret.scrollCaret();
}

/**
 * 特定の語を正規表現検索
 */
function findCurrentEditor(findText){
  var doc = Documents.NewDocument();
  var re;
  try{
    var c = doc.caret;
    list.items.beginUpdate()
    try{
      list.items.clear();
      re = new RegExp(findText)
      label.visible = false;
      if(findText != ""){
        // 走査開始
        for(var i = 0; i < c.lineCount; i++){
          var l = c.lineString(i);
          if(re.test(l)){
            list.items.append((i + 1) + ": " + l);
          }
        }
      }
    }finally{
      list.items.endUpdate();
    }
  }catch(e){
    label.visible = true;
    label.caption = e.message;
  }
}