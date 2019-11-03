<!doctype html>
<!--
Version: 1.0
Author: zhuzj
Contact: 1373722987@qq.com
-->
<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../../../../layout/base_list.jsp"%>
<!-- BEGIN BODY -->
<body class="bodyStyle">
<!--查询条件-->
<div class="row">
    <div class="col-md-12">
        <div class="portlet light">
            <div class="portlet-body form" >
                <!--  查询条件 一定要加上id="searchForm"-->
                <div class="form-horizontal" id="searchForm">
                    <div class="form-group">
                        <label class="control-label col-md-1">月份</label>
                        <div class="col-md-2">
                            <input type="text" id="month" name="month" class="form-control"  value="" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM',maxDate:'%y-%M'})" autoComplete="off">
                        </div>
                        <div class="col-md-3">
                            <button class="btn blue m-icon btn-square" id="btnSearch"><i class="fa fa-search"></i> 查询 </button>
                            <button class="btn blue m-icon btn-square" id="btnClear"><i class="fa fa-undo"></i> 重置</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--列表-->
<div class="row">
    <div class="col-md-12">
        <div class="portlet light">
            <div class="portlet-body">
                <table class="layui-hide" id="listTable" lay-filter="listTable"></table>
                <script type="text/html" id="toolbarTable">
                    <div class="layui-btn-container">
<shiro:hasPermission name="${PRIVILEGE.WORK_SHOP_COST_ADD}"><button class="btn green-meadow m-icon btn-square" lay-event="add"><i class="fa fa-plus"></i> 新增</button></shiro:hasPermission>
                        <shiro:hasPermission name="${PRIVILEGE.WORK_SHOP_COST_DELETE}"><button class="btn red-flamingo m-icon btn-square" lay-event="deletemany"><i class="fa fa-trash-o"></i> 批量删除</button></shiro:hasPermission>
                    </div>
                </script>
                <script type="text/html" id="barTable">
<shiro:hasPermission name="${PRIVILEGE.WORK_SHOP_COST_UPDATE}"><a href='javascript:;' class='table_operate'><i class='fa fa-edit font-blue' title='修改' lay-event="edit"></i></a></shiro:hasPermission>
<shiro:hasPermission name="${PRIVILEGE.WORK_SHOP_COST_DELETE}"><a href='javascript:;' class='table_operate'><i class='fa fa-trash-o font-red-flamingo' title='删除' lay-event="delete"></i></a></shiro:hasPermission>
                </script>
            </div>
        </div>
    </div>
</div>

<!-- END CORE PLUGINS -->
<script>
    var grid = new LayDataTable();
    $(function(){
        $("#month").val(getNowFormatDate());
        // 初期化按钮事件
        initButton();
        // 初期化table
        initTable();
    });

    function initTable() {
        grid.init({
            elem: '#listTable'
            ,url:ctx+ "/finance/tworkshopcost/list.kcppc"
            ,toolbar: "#toolbarTable"
            ,cellMinWidth: 80
            ,cols: [[
                {type: 'checkbox', fixed: 'left',unresize:true}
                ,{fixed: 'left', title:'操作',width:100, toolbar: '#barTable',align:"center",sort: false,unresize:true}
                ,{field:'month', title:'月份',width:100, sort: true}
                ,{field:'dividerSalary', title:'分检车间人员工资',width:160,sort: true}
                ,{field:'dividerCost', title:'分检车间制造费用',width:160,sort: true}
                ,{field:'boneSalary', title:'去骨车间人员工资', width:160,sort: true}
                ,{field:'boneCost', title:'去骨车间制造费用',width:160,sort: true}
                ,{field:'frozenSalary', title:'冻品车间人员工资',width:160,sort: true}
                ,{field:'frozenCost', title:'冻品车间制造费用',width:160,sort: true}
                ,{field:'semifinishedSalary', title:'半成品车间人员工资',width:180,sort: true}
                ,{field:'semifinishedCost', title:'半成品车间制造费用',width:180,sort: true}
                ,{field:'xinanSalary', title:'新安人员工资',width:180,sort: true}
                ,{field:'xinanCost', title:'新安制造费用',width:180,sort: true}
                ,{field:'remark', title:'备注',sort: false}
            ]],
            initSort: {
                field: 'month' //排序字段，对应 cols 设定的各字段名
                ,type: 'asc' //排序方式  asc: 升序、desc: 降序、null: 默认排序
            },
            where: {'month':$("#month").val()}

        });
        layui.use('table', function() {
            table = layui.table;
            //头工具栏事件
            table.on('toolbar(listTable)', function (obj) {
                var checkStatus = table.checkStatus(obj.config.id);
                switch (obj.event) {
                    case 'add':
                        //新增
                        var url = ctx + "/view/module/erpsy/finance/tworkshopcost/tworkshopcost_update.jsp";
                        dialog.show(url, "车间制造费用和人员工资信息添加");
                        break;
                    case 'deletemany':
                        //批量删除
                        var data = checkStatus.data;
                        if (data.length == 0) {
                            dialog.warn("请至少选择一条数据");
                            return;
                        }
                        var ids = [];
                        for (var i=0;i<data.length;i++) {
                            ids.push(data[i].id);
                        }
                        deleteRow(ids.join(','));
                        break;
                }
            });

            //监听行工具事件
            table.on('tool(listTable)', function(obj){
                var data = obj.data;
                //console.log(obj)
                if(obj.event === 'delete'){
                    deleteRow(data.id)
                } else if(obj.event === 'edit'){
                    edit(data.id)
                }
            });

        });
    }
    //初期化按钮事件
    function initButton() {
        // 查询
        $("#btnSearch").click(function() {
            grid.search();
        });
        // 重置
        $("#btnClear").click(function() {
            grid.reset();
        });
    }
    // 修改
    function edit(id) {
        var url= ctx +  "/finance/tworkshopcost/updateInit.kcppc?id="+id;
        dialog.show(url,"车间制造费用和人员工资信息修改");
    }
    // 查看
    /*  function detail(id) {
          var url= ctx +  "/contract/tarchives/detail.kcppc?id="+id;
          dialog.show(url,"查看详情");
      }*/
    // 删除
    function deleteRow(id) {
        dialog.confirm("确定要删除吗？",function(){
            $.kcppcajax(ctx + "/finance/tworkshopcost/delete.kcppc",
                {id:id},
                function(msg) {//msg为返回的数据，在这里做数据绑定
                    if (msg.success) {
                        dialog.success(msg.message,
                            function(){
                                grid.searchPageNotChange();
                            }
                        );
                    } else {
                        dialog.warn(msg.message);
                    }
                });
        });
    }
</script>
<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>