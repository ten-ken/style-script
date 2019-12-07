var EChartsUtil = function(params) {
	params.xy = typeof(params.xy) === 'boolean' ? params.xy : true; //默认是x-y轴
	this.params = params;

}


EChartsUtil.prototype = {
	constructor: EChartsUtil,
	//条形图------
	bar: function() {
		var params = this.params;
		var dom = document.getElementById("" + params.el);
		var myChart = echarts.init(dom);

		var option = {
			color: ['#003366', '#006699', '#4cabce', '#e5323e'],
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			title: {
				text: params.title || "",
				subtext: params.subtext || "",
			},
			toolbox: _getTools(params.tools),
			calculable: true,
			series: params.seriesData
		};

		this.defaultHander(option, params, myChart);
		return myChart;
	},
	//折线图-------
	line: function() {
		var params = this.params;
		var dom = document.getElementById("" + params.el);
		var myChart = echarts.init(dom);
		var option = {
			title: {
				text: params.title,
				subtext: params.subtext || ''
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				}
			},
			toolbox: _getTools(params.tools),
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			series: params.seriesData
		};
		this.defaultHander(option, params, myChart);
		return myChart;
	},
	//饼图
	pie: function() {
		var params = this.params;
		var dom = document.getElementById("" + params.el);
		var myChart = echarts.init(dom);

		var option = {
			title: {
				text: params.title,
				subtext: params.subtext,
				left: 'center',
				top: 20,
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
		};

		if (params.styleType != 'pie-nest') {
			option.series = _getDefaultPie(params);
		}

		this.defaultHander(option, params, myChart, false);
	},
	//仪表盘
	gauge: function() {
		var params = this.params;
		var dom = document.getElementById("" + params.el);
		var myChart = echarts.init(dom);
		var option = {
			title: {
				text: params.title,
				subtext: params.subtext,
			},
			toolbox: _getTools(params.tools),
			tooltip: {
				formatter: "{a} <br/>{b} : {c}%"
			},

		};

		if (params.resetConfig && typeof params.resetConfig === "object") {
			return this.defaultHander(option, params, myChart, false);
		} else {
			option.series = [{
				name: params.seriesData ? params.seriesData[0].name : '',
				type: params.seriesData ? params.seriesData[0].type : "gauge",
				detail: {
					formatter: '{value}%'
				},
				data: params.seriesData ? params.seriesData[0].data : null
			}];
		}

		myChart.setOption(option, true);
		this.options = option;
		return myChart;
		//this.defaultHander(option, params, myChart);
	},
	//漏斗图--最简单的
	funnel: function() {
		var params = this.params;
		var dom = document.getElementById("" + params.el);
		var myChart = echarts.init(dom);
		var option = {
			title: {
				text: params.title || '',
				subtext: params.subtext || ''
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c}%"
			},
			toolbox: _getTools(params.tools),
			calculable: true,
		};

		Object.assign(option, params.resetConfig || {});

		option.series = _getFunnelCfg(params);
		if (params.legendData) {
			option.legend = {};
			option.legend.data = params.legendData;
		}
		myChart.setOption(option, true);
		this.options = option;
		return myChart;
	},
	defaultHander: function(option, params, myChart, needXy) {
		params.resetConfig = params.resetConfig || {};
		var needXy = typeof(needXy) == 'boolean' ? needXy : true;

		//barLabelRotation
		var labelOption = {};

		//itemStyle
		var itemStyle = {};

		if (params.styleType == "barLabelRotation") {
			labelOption = _getEChartsBarLabelRotation();
		}

		if (params.styleType == "shadow") {
			itemStyle = _getShadow();
		}

		//圆环
		if (params.styleType == "ring") {
			// params.resetConfig =params.resetConfig||{};
			var defaultRing = _getdefaultRingStyle().series;
			params.resetConfig.series = params.resetConfig.series || {};
			var curConfig = JSON.parse(JSON.stringify(params.resetConfig.series));
			for (var serInd in defaultRing) {
				params.resetConfig.series[serInd] = params.resetConfig.series[serInd] || {};
				Object.assign(params.resetConfig.series[serInd], defaultRing[serInd], curConfig[serInd]);
			}
		}

		//多层圆环 ---》一般两层
		if (params.styleType == "pie-nest") {
			var defaultRing = _getPieNestCfg().series;
			params.resetConfig.series = params.resetConfig.series || {};
			for (var ind in params.seriesData) {
				Object.assign(defaultRing[ind], params.seriesData[ind]);
			}
			Object.assign(params.resetConfig.series, defaultRing);
		}

		var xycfg = needXy ? (params.xy ? _getX_YStyle(params) : _getY_XStyle(params)) : null;
		
		if(!params.resetConfig.xAxis && !params.resetConfig.yAxis){
			Object.assign(params.resetConfig, xycfg);
		}
		

		for (var ind in params.seriesData) {
			params.seriesData[ind].label = labelOption;
			params.seriesData[ind].itemStyle = itemStyle;
			if (params.seriesData.length == 1) { //只有一个数据 默认颜色为酒红色
				params.seriesData[ind].color = "#a51414";
			}
			if (params.styleType == "area") {
				params.seriesData[ind].areaStyle = {};
			}
		}

		if (params.legendData) {
			option.legend = {};
		}

		if (params.dataZoom) {
			option.dataZoom = _getDefaultZoom(params.dataZoom);
		}



		if (params.resetConfig && typeof params.resetConfig === "object") {
			// console.log(params.resetConfig.series)
			//这破玩意是个数组  会把存在的数据覆盖（消失了未设置的数据）使用纯对象来处理这部分的数据
			option.series = option.series || [];
			for (var serInd in params.resetConfig.series) {
				option.series[serInd] = option.series[serInd] || {};
				console.log(params.resetConfig.series[serInd]);
				Object.assign(option.series[serInd], params.resetConfig.series[serInd] || {});
				console.log(params.resetConfig.series[serInd]);
			}
			delete params.resetConfig.series;
			Object.assign(option, params.resetConfig);
			console.log(params.resetConfig)
		}

		//针对x轴的数据处理
		if (needXy && option.xAxis[0].data) {
			option.xAxis[0].data = params.names;
		}
		//针对y轴的数据处理
		if (needXy && option.yAxis[0].data) {
			option.yAxis[0].data = params.names;
		}


		if (option && typeof option === "object") {
			myChart.setOption(option, true);
		}
		this.options = option;
		return myChart;
	},
}


//获取默认的条形标签旋转---官网 Bar Label Rotation示例
function _getEChartsBarLabelRotation() {
	var app = {};
	var posList = [
		'left', 'right', 'top', 'bottom',
		'inside',
		'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
		'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
	];
	app.configParameters = {
		rotate: {
			min: -90,
			max: 90
		},
		align: {
			options: {
				left: 'left',
				center: 'center',
				right: 'right'
			}
		},
		verticalAlign: {
			options: {
				top: 'top',
				middle: 'middle',
				bottom: 'bottom'
			}
		},
		position: {
			options: echarts.util.reduce(posList, function(map, pos) {
				map[pos] = pos;
				return map;
			}, {})
		},
		distance: {
			min: 0,
			max: 100
		}
	};

	app.config = {
		rotate: 90,
		align: 'left',
		verticalAlign: 'middle',
		position: 'insideBottom',
		distance: 15,
		onChange: function() {
			var labelOption = {
				normal: {
					rotate: app.config.rotate,
					align: app.config.align,
					verticalAlign: app.config.verticalAlign,
					position: app.config.position,
					distance: app.config.distance
				}
			};
			myChart.setOption({
				series: [{
					label: labelOption
				}, {
					label: labelOption
				}, {
					label: labelOption
				}, {
					label: labelOption
				}]
			});
		}
	};
	var labelOption = {
		normal: {
			show: true,
			position: app.config.position,
			distance: app.config.distance,
			align: app.config.align,
			verticalAlign: app.config.verticalAlign,
			rotate: app.config.rotate,
			formatter: '{c}  {name|{a}}',
			fontSize: 16,
			rich: {
				name: {
					textBorderColor: '#fff'
				}
			}
		}
	};
	return labelOption;
}

/**
 * 获取默认的阴影样式 鼠标悬浮
 */
function _getShadow() {
	var itemStyle = {
		normal: {},
		emphasis: {
			barBorderWidth: 1,
			shadowBlur: 10,
			shadowOffsetX: 0,
			shadowOffsetY: 0,
			shadowColor: 'rgba(0,0,0,0.5)'
		}
	};
	return itemStyle;
}


//获取y-x的样式 普通情况xy轴颠倒
function _getY_XStyle(pamars) {
	var num=5;
	var yx = {
		xAxis: [{
			type: 'value',
		}],
		yAxis: [{
			type: 'category',
			axisTick: {
				show: false
			},
			axisLabel: {
				formatter: pamars.formatterVal||function(value){return value}
			},
			data: '$$'
		}],
	};
	return yx;
}



//默认是x轴
function _getX_YStyle(params) {
	var xy = {
		xAxis: [{
			type: 'category',
			axisTick: {
				show: false
			},
			axisLabel: {
				formatter:params.formatterVal||formatterVal
			},
			data: '$$'
		}],
		yAxis: [{
			type: 'value'
		}]
	};
	return xy;
}

//获取特征--工具 （数据格式转换 图形转换）
function _getTools(arr) {
	var feature = {};
	var arrs = arr || [];
	//"mark"
	// ["saveAsImage","dataView","magicType","restore"];
	//保存为图片 ,数据视图,数据类型（下面分了四类 折线图/柱形图/堆叠/平铺）,还原
	for (var ind in arrs) {
		feature[arrs[ind]] = {};
		feature[arrs[ind]].show = true;
		if (arrs[ind] === "magicType") {
			feature[arrs[ind]].type = ['line', 'bar', 'stack', 'tiled'];
		}
	}
	// if(arrs.indexOf("mark")==-1){
	// 	feature.mark={show:true};
	// }
	var defaultC = {
		show: true,
		orient: 'vertical', //垂直方向
		left: 'right',
		top: 'top',
		feature: feature
	};
	return defaultC;
}

//获取默认圆环的样式
function _getdefaultRingStyle() {
	var seriesStyle = {
		series: [{
			radius: ['40%', '60%'],
			avoidLabelOverlap: false,
			label: {
				normal: {
					show: false,
					position: 'center'
				},
				emphasis: {
					show: true,
					textStyle: {
						fontSize: '30',
						fontWeight: 'bold'
					}
				}
			},
			labelLine: {
				normal: {
					show: false
				}
			},
		}]
	};

	return seriesStyle;
}

//获取两层的环形饼图结构 配置
function _getPieNestCfg() {
	var multipleRings = {
		series: [{
				type: 'pie',
				selectedMode: 'single',
				radius: [0, '30%'],
				label: {
					normal: {
						position: 'inner'
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
			},
			{
				type: 'pie',
				radius: ['40%', '55%'],
				label: {
					normal: {
						formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
						backgroundColor: '#eee',
						borderColor: '#aaa',
						borderWidth: 1,
						borderRadius: 4,
						rich: {
							a: {
								color: '#999',
								lineHeight: 22,
								align: 'center'
							},
							hr: {
								borderColor: '#aaa',
								width: '100%',
								borderWidth: 0.5,
								height: 0
							},
							b: {
								fontSize: 16,
								lineHeight: 33
							},
							per: {
								color: '#eee',
								backgroundColor: '#334455',
								padding: [2, 4],
								borderRadius: 2
							}
						}
					}
				},
			}
		]
	};
	return multipleRings;
}


//默认的饼图series配置
function _getDefaultPie(params) {
	var series = [{
		name: params.title,
		type: 'pie',
		radius: '55%',
		center: ['50%', '50%'],
		data: params.seriesData
	}]
	return series;
}



//获取基础的漏斗图series配置
function _getFunnelCfg(params) {
	var series = [{
		name: '漏斗图',
		type: 'funnel',
		left: '10%',
		top: 60,
		bottom: 60,
		width: '35%',
		height: '70%',
		min: 0,
		max: 100,
		minSize: '0%',
		maxSize: '100%',
		sort: 'descending',
		gap: 2,
		label: {
			show: true,
			position: 'inside'
		},
		labelLine: {
			length: 10,
			lineStyle: {
				width: 1,
				type: 'solid'
			}
		},
		itemStyle: {
			borderColor: '#fff',
			borderWidth: 1
		},
		emphasis: {
			label: {
				fontSize: 20
			}
		},
		data: params.seriesData
	}];
	return series;
}

//获取默认的滚动条
function _getDefaultZoom(xyF) {
	// console.log(xyF)
	xyF = xyF || "x";
	if (xyF == "x") {
		return [{
			id: 'dataZoomX',
			type: 'slider',
			xAxisIndex: [0],
			filterMode: 'filter',
			showDetail: false,
			maxValueSpan: 11, //最多12个
			start: 0,
			// end:100,
			bottom: -3,
			height: 10
		}, ];
	} else {
		return [{
			id: 'dataZoomY',
			type: 'slider',
			yAxisIndex: [0],
			filterMode: 'filter',
			showDetail: false,
			maxValueSpan: 11, //最多12个
			start: 0,
			// end:80,
			right: '3%',
			width: 10
		}, ];
	}
}

//默认的格式话 x/y轴 文字的方法
function formatterVal(value){
	return value.replace(/(.{5})/g, '$1\n');
}