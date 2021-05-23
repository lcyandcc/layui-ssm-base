<%--
  Created by IntelliJ IDEA.
  User: 皮皮怪
  Date: 2021/5/6
  Time: 23:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <!--http://localhost:8080/-->
    <% //java代码片段，获取动态变化的基础路径
        //request.getScheme()可以返回当前页面使用的协议，http 或是 https;
        //request.getServerName()可以返回当前页面所在的服务器的名字;
        //request.getServerPort()可以返回当前页面所在的服务器使用的端口;
        //request.getContextPath()可以返回当前页面所在的应用的名字;
        String path = request.getContextPath();
        String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    %>

    <!--引用基础路径-->
    <base href="<%=basePath%>"/>
    <link rel="stylesheet" href="statics/layui/css/layui.css">

</head>
<body>
<center>
    <h1>员工部门数据分页显示页面</h1>
    <br><br>
    <form class="layui-form" action="" style="margin-top: 20px;margin-bottom: -20px;">
        <%--添加--%>
        <div class="layui-form-item">
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button type="button" class="layui-btn layui-btn-radius layui-btn-normal" id="saveEmpBtn"><i class="layui-icon">&#xe654;</i>添加</button>
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <%--批量删除--%>
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button type="button" class="layui-btn layui-btn-radius layui-btn-danger" id="batchEmpBtn"><i class="layui-icon">&#xe640;</i>批量删除</button>
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">员工姓名</label>
                <div class="layui-input-inline">
                    <input type="text" name="ename" autocomplete="off" class="layui-input" placeholder="请输入员工姓名">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">工作</label>
                <div class="layui-input-inline">
                    <input type="text" name="job" placeholder="请输入员工工作" autocomplete="off" class="layui-input">
                </div>
            </div>
                <div class="layui-inline">
                    <label class="layui-form-label">部门</label>
                    <div class="layui-input-inline">
                        <select name="deptno" id="selDept"></select>
                    </div>
                </div>
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button type="submit" class="layui-btn" lay-submit="" lay-filter="demo1"><i class="layui-icon">&#xe615;</i>查询</button>
                </div>
            </div>
        </div>
    </form>
    <!--表示表格容器，用来展示动态表格的数据-->
    <table id="demo" lay-filter="test"></table>
    <jsp:include page="saveEmp.jsp"/>
    <jsp:include page="updEmp.jsp"/>
    <script src="statics/layui/layui.js"></script>
    <%--引入showEmp.js--%>
    <script src="statics/js/showEmp.js"></script>
    <!--自定义工具条-->
    <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-xs" lay-event="edit"><i class="layui-icon">&#xe642;</i>编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon">&#xe640;</i>删除</a>
    </script>
</center>
</body>
</html>
