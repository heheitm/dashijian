$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });
    //密码校对
    const form = layui.form;
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    });
    //注册 点击事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        const str = $(this).serialize()
        $.post('/api/reguser', str, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            //console.log(res);
            //提供的属性
            layer.msg('注册成功');
            //系统点击
            $('#link_login').click();
        })
    });
    //登录 点击事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        const str = $(this).serialize();
        $.post('/api/login', str, function (res) {
            if (res.status !== 0) {
                return layer.msg('登录失败！')
            }
            // console.log(res);
            layer.msg('登录成功');
            //本地存贮
            localStorage.setItem('token', res.token);// res.token相当于一个密钥 便于跳转
            location.href = '/index.html'
        })
    });
    
})