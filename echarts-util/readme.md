
相关链接版本链接:

https://pan.baidu.com/s/1KpwF4vbRgmzLD0bppOlVQQ


## 兼容性
   pc--web版的支持 IE9+  谷歌65+ 等浏览器（都用上图表了还考个啥IE8一下的兼容性啊,注意IE8不兼容啊）
## 前言
  为了便于使用，echarts的参数实在很多 ，不同页面使用各个页面重写代码 长期冗余很多，对于不太了解前端的后端开发人员来说，更是比较麻烦。故此将常用的报表类型及相关参数进行封装。常规使用仅5-12行代码即可完成功能。
	

## 相关参数

| 参数       | 作用   |类型    |  默认值 |必填 |相关 |
| --------   | -----:  |-----:  | :----:  |--- |-----|
| el  | 生成报表绑定dom元素的id |String |  无  |是||
| subtext      | 报表子标题 |String  |   无   |否 ||
| title        | 报表标题| String  |   无   |否||
| styleType        | 风格样式| String  |   无   |否 |barLabelRotation（针对柱图，参考官网）/area（面积区域化，针对折线图，参考官网）/pie-nest（多层饼图--针对饼图）/shadow(阴影展示)/ring(圆环--针对饼图)|
| xy        | 以x轴还是y轴为类别轴| String  |   'x'   |否 |默认是x轴是相关类别 y轴是值|
| legendData   | 图例数据| Array  |   无   |否 |展示不同数据对应的示例，点击对应颜色 可隐藏该类别数据的展示|
| names        | 主轴对应的各个名称（如不同年份）| Array  |    |是 |针对饼图可以不填|
| tools        | 特征工具（可参考官网）| Array  |   无   |否 |支持"saveAsImage","dataView","magicType","restore"，分别代表下载图片/数据视图/图表类型转换/重置（更多可以参考官网写入数组）|
| dataZoom        | 以x/y轴显示滚动条 | String  |   无   |否 |值有'x'或者'y' 分别代表以哪个轴出现滚动条|
| resetConfig        | 设置配置可以覆盖原有配置| object  |   无   |是 |格式参考官网的option格式属性，具体的查看echarts.js的内部对应的属性书写|
| radius        | 设置设置圆环的空心范围| Array  |   ['50%', '70%']   |否 ||

## 相关事件

| 事件       | 作用     |返回值类型    | 参数值 |必填 |
| --------   | -----:  |-----:  | :----:  |--- |
| formatterVal   | 对值的处理（一般是名字太长进行换行设置 内部方法是单行显示7个字符）|  无  |否|

## 方法

| 方法       | 作用     |返回值类型    | 参数值 |
| --------   | -----:  |-----:  | :----:  |
| line   |生成折线图 |返回chart对象 就是echart调用init的对象 |无|
| bar   |生成条形图 |返回chart对象 就是echart调用init的对象 |无|
| pie   |生成饼图 |返回chart对象 就是echart调用init的对象 |无|
| gauge   |生成仪表图 |返回chart对象 就是echart调用init的对象 |无|
| funnel   |生成漏斗图 |返回chart对象 就是echart调用init的对象 |无|


### 折线图演示:
		 
		
		var seriesData1 = [{
				name: '邮件营销',
				type: 'line',
				stack: '总量',
				// areaStyle: {},
				data: [120, 132, 101, 134, 90, 230, 210]
			}
		];
		var EChartsUtil1 = new EChartsUtil({
			el: 'container1',//必填项
			subtext:"子标题",
			seriesData: seriesData1,//必填项
			// styleType:'area',//样式类型 ---shadow(鼠标上移有阴影)  和 barLabelRotation(条形标签旋转) 和 area(仅仅针对折线图)
			// xy:true,//是x-y的样式 还是 y-x的样式 默认是xy轴  true
			title: '柱状图',//必填项
			legendData: [],//需要可填[]
			names: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],//必填项
			tools:["saveAsImage","dataView","magicType","restore"],//特征工具
			dataZoom:"x"
			// resetConfig:resetConfig
		});
		
		var mycharts1 = EChartsUtil1.line();


 <p><image src="https://github.com/ten-ken/image/blob/master/relate_img/line-img1.png?raw=true"/></p>

### 条形图演示:

	var seriesData1 = [{
				name: '其他',
				type: 'bar',
				barWidth: "30",
				// stack: '搜索引擎',
				data: [62, 82, 91, 84, 109, 110, 120, 221, 824, 59, 170, 35, 886]
			}];

			var EChartsUtil1 = new EChartsUtil({
				el: 'container1', //必填项
				// styleType:'barLabelRotation',
				subtext: "子标题",
				seriesData: seriesData1, //必填项
				title: '简单柱状图', //必填项
				legendData: ['Forest', 'Steppe'],
				names: ['终南山下活死人墓', '22', '33', '44', '55', '66', '77', '88', '99', '110', '111', '112', '113'],
				dataZoom: "x",
				// resetConfig: conf
				// formatterVal:function(value){
				// 	return value.replace(/(.{2})/g, '$1\n');
				// }
			});
			var echars1 = EChartsUtil1.bar();	
 
  
  p><image src="https://github.com/ten-ken/image/blob/master/relate_img/bar-img1.png?raw=true"/></p>

### 饼图演示:

		var seriesData1 = [{
					value: 335,
					name: '直接访问'
				},
				{
					value: 310,
					name: '邮件营销'
				},
				{
					value: 274,
					name: '联盟广告'
				},
				{
					value: 235,
					name: '视频广告'
				},
				{
					value: 400,
					name: '搜索引擎'
				}
			];

			var EChartsUtil1 = new EChartsUtil({
				el: 'container1', //必填项
				subtext: "子标题",
				seriesData: seriesData1, //必填项
				title: '简单柱状图', //必填项
				legendData: [],
			});
			var echars1 = EChartsUtil1.pie();
			
 <p><image src="https://github.com/ten-ken/image/blob/master/relate_img/pie-img1.png?raw=true"/></p>			
			
 ### 仪表图演示:

		var seriesData1 = [{
				name: '业务指标',
				type: 'gauge',
				detail: {
					formatter: '{value}%'
				},
				data: [{
					value: 50,
					name: '完成率'
				}]
			}];


			var EChartsUtil1 = new EChartsUtil({
				el: 'container1', //必填项
				subtext: "子标题",
				seriesData: seriesData1, //必填项---如果写了resetConfig  此项可以省略 利用重写的配置去实现效果
				title: '简单仪表器', //必填项
				tools:["saveAsImage","dataView","restore"],//特征工具
			});
			
			var myChart = EChartsUtil1.gauge();
 <p><image src="https://github.com/ten-ken/image/blob/master/relate_img/gauge-img1.png?raw=true"/></p>			
  
  ### 漏斗图演示:

		var seriesData1 = [
                   {value: 60, name: '访问'},
                   {value: 40, name: '咨询'},
                   {value: 20, name: '订单'},
              	   {value: 80, name: '点击'},
             	   {value: 100, name: '展现'}
         	   ];


		var EChartsUtil1 = new EChartsUtil({
			el: 'container1', //必填项
			subtext: "子标题",
			seriesData: seriesData1, //必填项---如果写了resetConfig  此项可以省略 利用重写的配置去实现效果
			title: '简单漏斗表', //必填项
			tools:["saveAsImage","dataView","restore"],//特征工具
			legendData:['展现', '点击', '访问', '咨询', '订单'],
		});
			
		var myChart = EChartsUtil1.funnel();

 
 <p><image src="https://github.com/ten-ken/image/blob/master/relate_img/funnel-img1.png?raw=true"/></p>


### 更多示例 下载项目运行起来即可 ，正常情况下所以的80%的折线图-饼图-条形图都能生成
