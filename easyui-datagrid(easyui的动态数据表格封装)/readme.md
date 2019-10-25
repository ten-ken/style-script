
## 前言

  首先构建项目结构：
  
      ---easyui-plus
        -----css (放置的是easyui的css文件)
        -----js (此文件夹下直接放easyui-datagrid.js 根据需要引入对应的版本)
          ----easyui (备注js下文件  放在的是easyui的js文件)
        -----json (放置json文件)
<p style="height:200px"><image src="https://github.com/ten-ken/image/blob/master/relate_img/easyui-grid-structure.jpg?raw=true"/></p>



```
  	var easyGrid = new EasyGrid({
			collapsible:true,
			filterBtnIconCls: 'icon-filter',
			toolbar: "#tb", //操作工具条
			fitColumns: true,
			// filterMenu:false,//***作者新增属性 设置默认的语句菜单
			el: "#dg", //table id---***作者新增属性
			url: 'json/data.json', //后台访问地址
			// autoWidth:true,//***作者新增属性  宽度自动--autoWidth设置为true 会影响到fitColumns 宽度铺满 单元格铺满
			actionConfig: { //***作者新增属性  操作行
				// need: true,
				location: 0, //-1是最后
				field: 'action',
				width: 180,
				align: 'center',
				title: "action",
				fixed: true, //冻结行  此部分会排在行属性前面 由此属性location以冻结列为准
				// formatter:formatAction//不写按默认的来  写了按你的样式来
			},
			// columns: columns,
			clickCellEdit: true,
			rownumbers: true,
			showFooter: true,
			//后面两项需要 引入datagrid-filter.js
			enableFilter:true,//***作者新增属性  开启过滤器
			filterConfig:filterConfig(), //***作者新增属性  过滤器的配置
		});
```
| 参数       | 作用   |类型    |  默认值 |必填 |版本|
| --------   | -----:  |-----:  | :----:  |--- |--- |
|  el  | 绑定的id |String  |   '' (例如上面的‘#listTable’)   |是||
| filterMenu     | 是否开启语境菜单(详情看easyui demo) | 布尔 |  true|否 | |
| autoWidth    | 是否自动宽度 | 布尔  |  false   |否 ||
| actionConfig    | 操作列的配置属性（下面会针对详解） | Object  |  {}  |否 | |
| clickCellEdit    | 是否开启点击单元格编辑事件 | 布尔  |  false  |否 || |
| enableFilter    | 是否开启列的过滤器（查询器） | Array  |  []   |否（需要 引入datagrid-filter.js） | 1.2+|
| filterConfig    | 列的过滤器配置（enableFilter为true才生效） | Object  |  [{}]   |否 （需要 引入datagrid-filter.js）|1.2+|
| fixed    | 是否固定 | 布尔  | 否  |否（为columns里面的column的扩展属性 用于固定列 冻结列 不需要在写frozenColumns配置 当然也可以写 这个  需要移除fixed避免冲突） | |



| 方法       | 参数   |作用    |  demo |必填 |
| --------   | -----:  |-----:  | :----:  |--- |
| onEndEdit    | 编辑后事件 | 用于编辑后的处理事件（已内置 可重写覆盖）  |   | 否|

```
 ##actionConfig的详细参数
```
| 参数       | 作用   |类型    |  默认值 |必填 |
| --------   | -----:  |-----:  | :----:  |--- |
|  need  | 是否需要开启（false 为开启操作列） |boolean  |  false   |否|
| location     | 操作列的位置| 数字（-1为生成在最后） |  0|否 |
| field    | 同easyui里面column的属性field| String  | ''   |是|
| width    | 同easyui里面column的属性width | String  | ''   |否|
| align    | 同easyui里面column的属性align| String  | ''   |否|
| title    | 同easyui里面column的属性title | String  | ''   |否|
| fixed    | 是否固定 | 布尔  | 否  |否（为columns里面的column的扩展属性 用于固定列 冻结列 不需要在写frozenColumns配置 当然也可以写 这个  需要移除fixed避免冲突） |
