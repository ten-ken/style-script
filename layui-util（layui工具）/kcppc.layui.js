var LayDataTable = function() {
    var currentTable;
    var table;
    var ajaxParams = {}; // set filter mode
    return  {
        init: function(options) {
            the = this;
            options = $.extend(true,{
                //,url:ctx+ "/erpsy/baseinfo/twarehouseInfo/list.kcppc"
                request: {
                    pageName: 'start' //页码的参数名称，默认：page
                    ,limitName: 'length' //每页数据量的参数名，默认：limit
                }
                ,parseData: function(res){ //res 即为原始返回的数据
                    return {
                        "code": 0, //解析接口状态
                        "msg": res.message, //解析提示文本
                        "count": res.recordsTotal, //解析数据长度
                        "data": res.data ,//解析数据列表
                        "total" : res.parameter
                    };
                }
                ,toolbar: "#toolbarDemo"
                ,title: '用户数据表'
                ,defaultToolbar :  ['filter', 'print']
                ,page: {
                    first : '首页',
                    prev : '上一页',
                    next : '下一页',
                    last : '尾页',
                    groups : '6',
                    layout : ['count','first', 'prev', 'page','next','limit' ,'refresh','skip'],
                    theme : '#fe0627'

                } //是否显示分页
                ,limits: [10, 50, 100]
                ,limit: 10 //每页默认显示的数量
                ,skin: 'row' //表格风格
                ,even: true //开启隔行背景
                ,size: 'lg' //小尺寸的表格
                ,text: {
                    none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
                }
            },options)
            layui.use('table', function() {
                table = layui.table;
                currentTable = table.render(options);
                table.on('sort('+options.elem.replace("#","")+')', function(obj){
                    var order = " ";
                    if (obj.type != null && obj.type !=""&&obj.type!="null") {
                        if (obj.name != null && obj.name != "") {
                            order = order + obj.name + " " + obj.type;
                        } else {
                            order = order + obj.field + " " + obj.type;
                        }
                        the.setAjaxParam("orders", order);
                        the.search(obj);
                    }
                });
            });
        },
        getTable : function(){
            return table;
        },
        getCurrentTable : function(){
            return currentTable;
        },

        search: function(obj) {
            // the.setAjaxParam("action", tableOptions.filterApplyAction);
            var searchForm = $('#searchForm');
            // get all typeable inputs
            $('textarea, select, input:not([type="radio"],[type="checkbox"])', searchForm).each(function() {
                the.setAjaxParam($(this).attr("name"), $(this).val());
            });

            // get all checkboxes
            $('input.form-filter[type="checkbox"]:checked', searchForm).each(function() {
                the.addAjaxParam($(this).attr("name"), $(this).val());
            });

            // get all radio buttons
            $('input.form-filter[type="radio"]:checked', searchForm).each(function() {
                the.setAjaxParam($(this).attr("name"), $(this).val());
            });
            var data = {};
            $.each(ajaxParams, function(key, value) {
                data[key] = value;
            });
            if (obj != null && obj!="" && obj != undefined) {
                currentTable.reloadData({
                    initSort: obj
                    ,where: data
                    ,page: {
                        curr: 1//重新从第 1 页开始
                    }
                });
            } else {
                currentTable.reloadData({
                    where: data
                    ,page: {
                        curr: 1//重新从第 1 页开始
                    }
                });
            }

        },
        searchPageNotChange: function() {
            // the.setAjaxParam("action", tableOptions.filterApplyAction);
            var searchForm = $('#searchForm');
            // get all typeable inputs
            $('textarea, select, input:not([type="radio"],[type="checkbox"])', searchForm).each(function() {
                the.setAjaxParam($(this).attr("name"), $(this).val());
            });

            // get all checkboxes
            $('input.form-filter[type="checkbox"]:checked', searchForm).each(function() {
                the.addAjaxParam($(this).attr("name"), $(this).val());
            });

            // get all radio buttons
            $('input.form-filter[type="radio"]:checked', searchForm).each(function() {
                the.setAjaxParam($(this).attr("name"), $(this).val());
            });
            var data = {};
            $.each(ajaxParams, function(key, value) {
                data[key] = value;
            });
            currentTable.reloadData({
                where: data
            });
        },
        reset: function(data) {
            var searchForm = $('#searchForm');
            $('textarea, select, input', searchForm).each(function() {
                $(this).val("");
                $(this).select2("val", "");
            });
            $('input[type="checkbox"]', searchForm).each(function() {
                $(this).attr("checked", false);
            });

            the.clearAjaxParams();

            if (data != undefined && data != null && data != "") {
                ajaxParams = data;
            }

            currentTable.reloadData({
                where: ajaxParams
                ,page: {
                    curr: 1//重新从第 1 页开始
                }
            });
        },
        setAjaxParam: function(name, value) {
            ajaxParams[name] = value;
        },

        addAjaxParam: function(name, value) {
            if (!ajaxParams[name]) {
                ajaxParams[name] = [];
            }

            skip = false;
            for (var i = 0; i < (ajaxParams[name]).length; i++) { // check for duplicates
                if (ajaxParams[name][i] === value) {
                    skip = true;
                }
            }

            if (skip === false) {
                ajaxParams[name].push(value);
            }
        },

        clearAjaxParams: function(name, value) {
            ajaxParams = {};
        },
    }
}