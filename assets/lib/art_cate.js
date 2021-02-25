$(function () {
    const { form, layer } = layui;
    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr)
            }
        })
    };
    //
    // var layer = layui.layer;
    //声明一个变量
    var indexIlay = null;
    $('#btnAddCate').on('click', function () {
        //弹出层
        indexIlay = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加类别',
            //渲染弹出层
            content: $('#dialog-add').html()
        })
    });
    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        const str = $(this).serialize();
        $.post('/my/article/addcates', str, function (res) {
            if (res.status !== 0) {
                return layer.msg('新增失败')
            }
            layer.msg('新增成功');
            initArtCateList();
            //根据索引删除 弹出层
            layer.close(indexIlay);
        })
    });
    var indexIlayer = null;
    $('tbody').on('click', '.btn-edit', function () {
        indexIlayer = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章分类',
            //渲染弹出层
            content: $('#dialog-edit').html()
        })
        const id = $(this).data('id');
        console.log(id);
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                console.log(res);
                form.val('form-edit', res.data);
            }
        })
    });

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        const str = $(this).serialize()
        $.post('/my/article/updatecate', str, function (res) {
            if (res.status !== 0) {
                return layer.msg('修改失败')
            }
            layer.msg('修改成功');
            initArtCateList();
            //根据索引删除 弹出层
            layer.close(indexIlayer);

        })
    });
    $('tbody').on('click', '.btn-delet', function () {
        const id = $(this).data('id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功');
                    initArtCateList();
                    //根据索引删除 弹出层
                    layer.close(indexIlayer);
                }
            })
        })
    });
    
})