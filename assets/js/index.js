$(function () {
  getUserInfo();
  // 调用getUserInfo 获取用户基本信息

  $("#btn_LogOut").on("click", function () {
    // 弹出框
    layer.confirm("确定退出?", { icon: 1, tittle: "提示" }, function (index) {
      // 清除本地存储

    //   localStorage.items = ""; //错误

      localStorage.removeItem('token');

      location.href = '/login.html';

    //   关闭 confirm询问框
      layer.close(index);
    });
  });
});

function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    headers: {
      Authorization: localStorage.token,
    },
    success(res) {
      // console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg(res.message);
      }
      renderAvatat(res.data);
    },
    
  });
}

function renderAvatat(user) {
  // 获取用户名

  const name = user.nickname || user.username;

  //  欢迎
  $("#welcome").html("欢迎" + name);

  // 处理文字头像和图片头像

  if (user.user_pic) {
    // 图片头像

    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 文字头像

    $(".layui-nav-img").hide();
  }

  const first = name[0].toUpperCase();

  // 渲染文字头像

  $(".text-avatar").html(first).show;
}
