layui.use(['table'],function(){
    var table = layui.table
        ,$ =layui.jquery
        ,form = layui.form
        ,layer = layui.layer
        ,laydate = layui.laydate;
    //执行一个laydate实例
    laydate.render({
        elem: '#hiredate' //指定元素
        ,type: 'date'
        ,calendar: true
        ,format: 'yyyy-MM-dd HH:mm:ss' //可任意组合
    });
    var currentPage=1;

    var selJSONEmp={};
    //初始化加载部门数据
    loadAllDept();
    //初始化加载员工函数
    loadEmpAndDept();

    //工具条事件
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        console.log("data:",data)
        if(layEvent === 'detail'){ //查看
            //do somehing
        } else if(layEvent === 'del'){ //删除
            layer.confirm('真的删除行么', function(index){
                //向服务端发送删除指令
                delEmpByEmpno(obj);
                //关闭窗口
                layer.close(index);
            });
        } else if(layEvent === 'edit'){ //编辑
            //1.回显要修改的员工原有数据
            //给表单赋值
            form.val("updEmpFormFilter",{
                //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                "empno":data.empno
                ,"ename" : data.ename
                ,"job" : data.job
                ,"mgr" : data.mgr
                ,"sal" : data.sal
                ,"hiredate" : data.hiredate
                ,"comm" : data.comm
                ,'deptno' : data.dept.deptno
            });
            //2.弹出修改页面
            layer.open({
                type:1,  //弹出类型
                title:"员工添加界面",  //弹框标题
                area:['480px','520px'],  //弹框高度
                anim: 4,  //弹出的动画效果
                shade:0.5,  //阴影遮罩
                content:$("#updEmpDiv")  //弹出的内容
            });
            //3.点击修改提交，完成表单的修改
            form.on('submit(demo2)', function(updData){
                console.log(updData.field);
                //执行修改
                modifyEmp(updData.field);
                layer.closeAll(); //关闭当前页面中所有弹框
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });
           /* //修改条件的表单提交
            form.on('submit(demo2)', function(data){
                //就是添加的数据
                console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
                //调用员工的函数
               var  modifyJSONEmp={};//保存修改员工的json对象
                modifyJSONEmp['empno'] = data.field.empno;
                modifyJSONEmp['ename'] = data.ename;
                modifyJSONEmp['job'] = data.job;
                modifyJSONEmp['mgr'] = data.mgr;
                modifyJSONEmp['sal'] = data.sal;
                modifyJSONEmp['hiredate'] = data.hiredate;
                modifyJSONEmp['comm'] = data.comm;
                modifyJSONEmp['deptno'] = data.emp.dept.dname;


                modifyEmp(modifyJSONEmp);
                //关闭所有的弹出窗口
                layer.closeAll();
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });*/
            //同步更新缓存对应的值
           /* obj.update({
                username: '123'
                ,title: 'xxx'
            });*/
        }
    });
/**************************自定义layui函数*********************/
    function loadEmpAndDept() {
        //第一个实例
        table.render({
            elem: '#demo'  //表示跟表格容器的id进行绑定
            , height: 400 //表格容器的高度
            //  默认会自动传递两个参数：?page=1&limit=30  page 代表当前页码、limit 代表每页数据量
            , url: '/emp/loadDataByParams' //数据接口, 用来访问到后端控制器中，获取数据返回 （JSON数据）
            , page: true //开启分页
            ,width:1300
            ,limits: [5, 10, 15, 20, 100] //自定义分页条数
            ,limit: 5  //默认每页显示5条记录
            ,where: selJSONEmp //where 表示查询条件
            ,even: true  //隔行变色效果
            ,cols: [[ //表头
                /*
                      表示当前一列数据：
                 field : 字段， 跟返回的JSON对象的属性的名字完全一致！！！
                 title : 表示标题
                 width ： 列的宽度
                 sort ： 是否支持排序 true支持
                 fixed: 'left'  ： 向左悬浮
                 * */
                {type: 'checkbox', fixed: 'left'}
                , {field: 'empno', title: '员工编号', width: 130, sort: true, fixed: 'left'}
                , {field: 'ename', title: '员工名称', width: 160}
                , {field: 'job', title: '职业', width: 130, sort: true}
                , {field: 'mgr', title: '上司', width: 130}
                , {field: 'hiredate', title: '入职日期', width: 180, sort: true}
                , {field: 'sal', title: '工资', width: 100}
                , {field: 'comm', title: '奖金', width: 100}
                , {field: 'dname', title: '部门名称', width: 160, templet: '<div>{{d.dept.dname}}</div>'}
                , {field: 'loc', title: '部门地址', width: 160, templet: '<div>{{d.dept.loc}}</div>'}
                /*toolbar:'#barDemo'关联到工具条ID*/
                , {field: 'right', title: '操作', width: 160, toolbar: '#barDemo'}
            ]]
            //渲染完毕后的函数回调
            ,done: function(res, curr, count){
                //如果是异步请求数据方式，res即为你接口返回的信息。
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                console.log(res);

                //得到当前页码
                console.log(curr);
                currentPage=curr;
                //得到数据总量
                console.log(count);
            }
        });
    }
    //查询条件的表单提交
    form.on('submit(demo1)', function(data){
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        //把查询条件复制给selJSONEmp
        selJSONEmp=data.field
        //调用查询员工的函数
        loadEmpAndDept();
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //添加条件的表单提交
    form.on('submit(formDemo)', function(data){
        //就是添加的数据
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        //调用员工的函数
        saveEmp(data.field);
        //关闭所有的弹出窗口
        layer.closeAll();
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });


//表单的自定义验证
    form.verify({
        ename: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
                return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
                return '用户名不能全为数字';
            }
        },
        mgr:function(value, item){ //value：表单的输入框的值、item：表单的输入框DOM对象
            if(value>9999||value<1001){
                return "上司编号请输入1001 ~ 9999 之间的数字！";  //验证提示
            }
        },
        sal:function(value, item){ //value：表单的输入框的值、item：表单的输入框DOM对象
            if(value>20000||value<5000){
                return "工资只能在5000 ~ 20000之间";  //验证提示
            }
        },
        comm:function(value, item){ //value：表单的输入框的值、item：表单的输入框DOM对象
            if(value>4500||value<1500){
                return "奖金只能在1500 ~ 4500之间";  //验证提示
            }
        },
    });
    /**********************************标签事件绑定***********************/
    $("#batchEmpBtn").click(function () {
        //layer.msg("点死你！");
        var checkStatus = table.checkStatus('demo'); //idTest 即为基础参数 id 对应的值
        console.log(checkStatus.data) //获取选中行的数据
        console.log(checkStatus.data.length) //获取选中行数量，可作为是否有选中行的条件
        var arrEmp=checkStatus.data;
        if (arrEmp.length === 0){
            return layer.msg("请选择需要删除的员工数据！",{icon: 7,time:2000,anim: 3,shade:0.5});
        }

        layer.confirm('真的批量删除员工数据么！', function(index){
            //springmvc 能够接收字符串类型的数字，以，号分隔，springmvc会自动转换Integer的数组
            var empnoStr="";
            for(var i=0;i<arrEmp.length;i++){
                empnoStr += arrEmp[i].empno + ",";
            }
            empnoStr=empnoStr.substring(0,empnoStr.length-1);
            //向服务端发送删除指令
            delBatchEmpByEmpno(empnoStr);
            //关闭窗口
            layer.close(index);
        });
    })

    /*添加事件*/
    $("#saveEmpBtn").click(function () {
        //在弹出框之前，清空表单数据
        $("#saveEmpForm").find("input").val("");
        //弹出添加页面
        layer.open({
            type:1,  //弹出类型
            title:"员工添加界面",  //弹框标题
            area:['480px','520px'],  //弹框高度
            anim: 4,  //弹出的动画效果
            shade:0.5,  //阴影遮罩
            content:$("#saveEmpDiv")  //弹出的内容
        });
    })
    
    /***********************************自定义函数******************************/
    function loadAllDept() {
        //异步请求加载部门数据
        $.post(
            "/dept/loadAllT",//请求的url路径
            function (data) {
                console.log("deptData:",data)
                //动态生成下拉框的option选项
              var optionStr = "<option value=''>===请选择===</option>";
                //遍历data
                //jquery的遍历
                //
                $.each(data,function (i, dept) {
                    optionStr += "<option value ='"+dept.deptno+"'>"+dept.dname+"</option>"
                });
                //把生成好的选项加入到下拉框中
                $("#selDept").html(optionStr);
                //把生成好的数据渲染到添加功能下拉框
                $("#saveDept").html(optionStr);
                $("#updDept").html(optionStr);
                form.render('select'); //刷新select选择框渲染
            },"json"
        ).error(function () {
            lay.msg("数据请求异常！");
        })
    }

    //根据员工编号删除信息
    function delEmpByEmpno(obj) {
        //异步请求加载部门数据
        $.post(
            "/emp/delTById",//请求的url路径
            { "id":obj.data.empno},
            function (data) {
                if (data === 'success'){
                    //2.成功-删除DOM，更新缓存
                    obj.del();
                    layer.msg("删除成功！",{icon: 1,time:2000,anim: 4,shade:0.5});
                }else{
                    layer.msg("删除失败！",{icon: 2,time:2000,anim: 4,shade:0.5});
                }
            },"text"//text：表示后端响应的是文本
        ).error(function () {
            layer.msg("服务器异常！！！",{icon: 3,time:2000,anim: 6,shade:0.5});
        })
    }

    //根据员工编号进行批量删除
    function delBatchEmpByEmpno(empnoStr) {
        //异步请求加载部门数据
        $.post(
            "/emp/delBatchTByIds",//请求的url路径
            { "ids":empnoStr},//传递到后端的参数
            function (data) {
                if (data === 'success'){
                    layer.msg("删除成功！",{icon: 1,time:2000,anim: 4,shade:0.5});
                   //重新加载员工数据
                   // loadEmpAndDept();
                    table.reload('demo', {
                       page: {
                            curr: currentPage //重新从第 1 页开始
                        }
                    }); //只重载数据
                }else{
                    layer.msg("删除失败！",{icon: 2,time:2000,anim: 4,shade:0.5});
                }
            },"text"//text：表示后端响应的是文本
        ).error(function () {
            layer.msg("服务器异常！！！",{icon: 3,time:2000,anim: 6,shade:0.5});
        })
    }
    function saveEmp(saveJSONEmp) {
            $.post(
                "/emp/saveT",//请求的url路径
               saveJSONEmp,//传递到后端的参数
                function (data) {
                    if (data === 'success'){
                        layer.msg("添加成功！",{icon: 1,time:2000,anim: 4,shade:0.5});
                        //重新加载员工数据
                        loadEmpAndDept();
                    }else{
                        layer.msg("添加失败！",{icon: 2,time:2000,anim: 4,shade:0.5});
                    }
                },"text"//text：表示后端响应的是文本
            ).error(function () {
                layer.msg("服务器异常！！！",{icon: 3,time:2000,anim: 6,shade:0.5});
            })
    }

    function modifyEmp(modifyJSONEmp) {
        $.post(
            "/emp/updT",//请求的url路径
            modifyJSONEmp,//传递到后端的参数
            function (data) {
                console.log(data)
                if (data === 'success'){
                    layer.msg("修改成功！",{icon: 1,time:2000,anim: 4,shade:0.5});
                    //数据表格重载
                    table.reload('demo', {  //demo为table表格容器id
                        page: {
                            curr: currentPage //重新从第 currentPage(当前页) 页开始
                        }
                    }); //只重载数据
                }else{
                    layer.msg("修改失败！",{icon: 2,time:2000,anim: 4,shade:0.5});
                }
            },"text"//text：表示后端响应的是文本
        ).error(function () {
            layer.msg("数据异常！！！",{icon: 3,time:2000,anim: 6,shade:0.5});
        })
    }
})