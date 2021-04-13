$(function () {
  var form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/,'密码必须为6到12位，且不能出现空格!'],
    samePwd: function(value) {
        // debugger
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同!';
      }
    },
    rePwd: function(vale) {
        if (value !== $('[name=newPwd]').val()) {
          return '两次输入的新密码不相同!';
        }
      },
  });
});


$(function(){
    $('.layui-form').on('submit', function(e){
        console.log('1');
        e.preventDefault();
        $.ajax({
            method:'POST',
            url: '/my/updatepwd',
            data:$(this).serialize(),
            success (res) {
                if(res.status !== 0){
                    return layer.msg('密码更新失败！');
                }
                layer.msg('密码更新成功！');
            }
        })
        $('.layui-form')[0].reset();
    })
})
