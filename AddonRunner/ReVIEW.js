var Items = [
  {
    caption: "画像",
    body: "//image[%%画像IDは？%%][%%キャプションは？%%]"
  },
  {
    caption: "画像(参照)",
    body: "@<img>{%%画像IDは？%%}"
  },
  {
    caption: "引用",
    body: "//quote{\n||\n//}"
  },
  {
    caption: "コマンドライン",
    body: "//cmd{\n||\n//}"
  },
  {
    caption: "テーブル",
    body: "//table[%%識別子は？%%][%%キャプションは？%%]{\n||\n\n//}"
  },
  {
    caption: "注釈",
    body: "@<fn>{%%識別子は？:fn%%}\n//footnote[%%fn%%][%%解説文は？%%]||\n"
  }
]