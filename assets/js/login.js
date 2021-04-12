$(function () {
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
});

// // var form = layui.form

// const { form } = layui;
// // 不含有空格.
// form.verifty({
//   pwd: [/^[\S]{6,12}$/,'密码不符合规则'],
//   repwd: function (value) {
//     // value||234;
//     const pwd = $('.reg-box [name=password]').val();
//     if (value !== pwd) {
//       return "两次密码不一致";
//     }
//   },
// });

var form = layui.form;

form.verify({
  // 自定义了一个叫做 pwd 校验规则
  pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  // 校验两次密码是否一致的规则
  repwd: function (value) {
    // 通过形参拿到的是确认密码框中的内容
    // 还需要拿到密码框中的内容
    // 然后进行一次等于的判断
    // 如果判断失败,则return一个提示消息即可
    var pwd = $(".reg-box [name=password]").val();
    if (pwd !== value) {
      return "两次密码不一致！";
    }
  },
});

$("#form_reg").submit( function (e) {
  // 1.阻止默认请求
  e.preventDefault();
  // 2.发起ajax的post请求
  var data = {
    username: $("#form_reg [name=username]").val(),
    password: $("#form_reg [name=password]").val()
  };

  $.ajax({
    type:'POST',
    url: '/api/reguser',
    data:data,
    success(res){
      if (res.status !== 0) {
        console.log(res)
      return layer.msg(res.message);
      
    }
    layer.msg('注册成功，请登录！')
    // 模拟人的点击行为
    $('#link_login').click()
    }
  })
  
});


$('#form_login').submit(function(e) {
  e.preventDefault();

  $.ajax({
    url:'/api/login',
    method:'POST',
    data:$(this).serialize(),
    success(res){
      if(res.status !==0){
        console.log(res);
        return layer.msg('登录失败!')
      }
      layer.msg('登录成功!')

      // 存储到本地
      localStorage.setItem('token',res.token)
      //跳转到主页
      location.href= '/index.html';
    }
  })
})