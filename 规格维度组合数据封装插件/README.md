#### 完整版1.2  其他属于过度版本 引入1.2版本即可 此版本需要引入vue看现实效果
## 1.2版本的展示效果图

##  浏览器
   支持谷歌 火狐 iE9+(包含IE9) 等


###



```
  	var comb = new CombinationStruct();
		comb.init({
			select_info: ".select-infoH",
			extra: {
				"weight": {
					value: "",
					name: "weight",
					showV: "重量",
					topId: "",
					topText: "重量",
					edit: true //是否需要编辑
				},
				"stock": {
					value: "",
					name: "stock",
					showV: "库存",
					topId: "",
					topText: "库存",
					edit: true //是否需要编辑
				}
			},
			extraParam: true
		});
```
| 参数       | 作用   |类型    |  默认值 |必填 |版本|
| --------   | -----:  |-----:  | :----:  |--- |--- |
|  select_info  | 绑定的class |String  |   '' (例如上面的‘.select-infoH’ 针对选择生成规格组合的dom结构class名称 具有相对唯一性)   |是||
| extra     | 额外的选项参数| object |  {}|否 | 1.2+|
| extraParam    | 是否启用额外选项参数 | 布尔  |  false   |否 ||



| 方法       | 参数   |作用    | 
| --------   | -----:  |-----:  | 
| getRowTd    | 获取单行数据（头部信息） | 用于生成数据后生成table（表格） 头部  | 
| getTableData    | 获取组合好数据（所有规格的组合） | 用于生成数据后生成table（表格） 数据部分  | 


 

 <p align="center"><img src="https://github.com/ten-ken/image/blob/master/relate_img/%E6%8E%92%E5%88%97%E5%90%88%E6%88%90%E8%A7%84%E6%A0%BC.png?raw=true" alt="" ></p>	
