$(function () {
  // const { form } = layui;

  // var form = layui.form
  const form = layui.form;
  const layer = layui.layer

  form.verify({
    nickname: function (value) {
      // console.log(value.length);
      if (value.length > 6) {
        // console.log("昵称不能超过6位");
        return '昵称不能超过6位';
      }
    },
  });

  initUserInfo();

  function initUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success (res) {
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败!");
        }
        console.log(res);
        console.log(res.data);


        form.val('formUserInfo', res.data);
      },
    });
  }

  $("#btn_Reset").on("click", function (e) {
    e.preventDefault();
    initUserInfo();
  });

});

$(".layui-form").on('submit',function (e) {
  e.preventDefault();
  $.ajax({
    method: 'POST',
    url: '/my/userinfo',
    data: $(this).serialize(),
    success(res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("更新成功");
      window.parent.getUserInfo();
      //成功
    },
  });
});
