$(function () {
    const { form, layer } = layui;
    //校验密码规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码不符合规则'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    });
    //
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        const str = $(this).serialize();//查询字符串=> key=value&key=value
        $.post('/my/updatepwd', str, function (res) {
            if(res.status !== 0){
                return layer.msg('修改密码失败！'); 
            }
            layer.msg('修改密码成功！');
            console.log(res);
            //重置表单 reset()是原生js的一种方法 jquery[0]转换成原生js
            $('.layui-form')[0].reset();
        })
    })
})