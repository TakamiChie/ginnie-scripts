var File = {
  // FileSystemObject�B�v���C�x�[�g
  _fso : new ActiveXObject("Scripting.FileSystemObject"),
  // �e���|�����t�@�C����ۑ����A�t�@�C������Ԃ�
  // text...�ۑ�����t�@�C��������������
  // ext...�g���q�B�ȗ��\�B�ȗ������ꍇ��txt�ƂȂ�
  // return...�ۑ������e�L�X�g�t�@�C���̃t�@�C����
  saveTemporaryFile: function(text, ext){
    if(ext == undefined) ext = "txt";
    var fn = format("{0}\\TempFile.{1}", App.GetSpecialDir("TEMP"), ext);
    File.writeFile(fn, text);
    return fn;
  },
  readFile: function(filename)
  {
    var t = this._fso.OpenTextFile(filename, 1);
    try
    {
      return t.ReadAll();
    }finally{
      t.close();
    }
  },
  writeFile: function(filename, data){
    var f = this._fso.createTextFile(filename, true, false);
    try
    {
      f.write(data);
    }finally{
      f.close();
    }
  },
  VERSION: 1
}