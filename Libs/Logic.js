// ループ処理などを行うスタティッククラス
var Logic = {
  // 指定回数ループを行う
  // 引数codeの第一引数に、カウンタ値が入る
  loop : function(count, code)
    {
      for(var i = 0; i < count; i++)
      {
        code(i);
      }
    },

  // 指定した分が経過するまでループを行う
  // 引数codeの第一引数に、ループ回数が入る
  loopminute : function(minute, code)
  {
    var mstime = minute * 60 * 1000;
    var start = new Date();
    var i = 0;
    while(new Date().getTime() - start.getTime() < mstime)
    {
      code(i++);
    }
  },

  // 引数codeの処理にかかった時間を返す。
  timecount : function(code)
  {
    var start = new Date();
    code();
    return new Date().getTime() - start.getTime();
  },

  // 引数objをEnumratableなオブジェクトとみなし、列挙する。
  // 引数funcの第一引数には、各アイテムが格納される。
  each : function(obj, func)
  {
    var en = new Enumerator(obj);    
    for(;!en.atEnd();en.moveNext())
    {
      func(en.item());
    }
  }
}
