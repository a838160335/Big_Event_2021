$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net'+options.url;

    //包含了 my的地址 就可以和本地存储合并地址
    
    if(options.url.includes('/my/')){
        options.headers ={
            Authorization:localStorage.token ||'',
        };

        options.complete = function (response) {
        
            console.log(response);
    
            if(
                response.responseJSON.status ===  1 &&
                response.responseJSON.message === '身份认证失败!'
            ){
                // 说明没有权限
                location.href = '/login.html';
            }
        }

    }
})