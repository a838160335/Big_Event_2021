// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)



$(function() { 
    $('#chooseImg').on('click', function () {
        console.log(1);
        // 触发input的点击事件 
        $('#file').click();
    })


$('#file').on('change', function(e) {
    const [file] = e.target.files;   // 结构 和下面一条相同的意思
    // const file = e.target.file[0];  

    if(!file) return layer.msg('请选择图片文件!');
    
    const imgURL = URL.createObjectURL(file);

    //  插件里面的方法 (复制过来就好了)        重新初始化裁剪区域
  $image
  .cropper('destroy') // 销毁旧的裁剪区域
  .attr('src', imgURL) // 重新设置图片路径
  .cropper(options) // 重新初始化裁剪区域

})


$('#btnUpload').on('click', function(){
    // 获取图片
    debugger
    var dataURL= $image
    .cropper('getCroppedCanvas',{
        // 创建一个 Canvas画布
        width:100,
        height:100
    }) 
    .toDataURL('image/png');

    $.ajax({
        method:'POST',
        url:'/my/update/avatar',
        data:{
            avatar:dataURL,
        },
        success (res) {
            if(res.status !== 0){
                return layer.msg('上传失败！');
            }
            layer.msg('上传成功！');
            window.parent.getUserInfo();
        }
    })
})


})