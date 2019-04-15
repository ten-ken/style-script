/*
 * @time:2019-03-30
 * @author:swc
 * */
var CombinationStruct = (function(_options) {
	this._options = {};

	var result = [];
	var resultCode = []; //对应code存储
	var resultCodes = [];
	var resultTxt = []; //对应文字存储
	var resultTxts = [];
	var mainId = [];
	var mainIds = []; //主要id或区分存储

	/**
	 * 重置数据
	 */
	function resetData() {
		results = [];
		result = [];
		resultCode = [];
		resultCodes = [];
		resultTxt = [];
		resultTxts = [];
		mainId = [];
		mainIds = [];
	}


	//获取行tr
	function getRowTd() {
		var rowData = [];
		var data = getTableData();
		if (data.length > 0) {
			var arr = data[0];
			var reg = /-([(^t)|(^id)])*$/; //匹配-t 或- id结尾的
			for (row in arr) {
				if (!row.match(reg)) {
					rowData.push(row);
				}
			}
		}
		return rowData;
	}


	//主方法
	function getTableData() {
		resetData();
		var arrays = [];
		$(this._options.select_info).each(function(ind, obj) {
			if ($(obj).val() != null && $(obj).val() != '') {
				var object = {};
				var name = $(obj).attr("name");
				object.name = name;
				object.txtV = getSelectTxtArr(obj);
				object.value = $(obj).val();
				object.mainId = setMainId($(obj).val(), $(obj).attr("typeId"));
				arrays.push(object);
			}
		});
		if (arrays.length > 0) {
			doCombination(arrays);
			var datas = getTableRowData();
			return datas;
		}
		return [];
	}


	//将数据组合--默认从第一个数组开始排列组合
	function doCombination(arr, index = 0) {
		if (arr.length > 0) {
			var code = arr[index].name;
			var txtV = arr[index].txtV;
			var cur_arr = arr[index].value;
			var cur_mainIds = arr[index].mainId;
			for (var i = 0; i < cur_arr.length; i++) {
				result[index] = cur_arr[i];
				resultCode[index] = code;
				resultTxt[index] = txtV[i];
				mainId[index] = cur_mainIds[i];
				if (index != arr.length - 1) {
					doCombination(arr, index + 1)
				} else {
					results.push(result.join(','));
					resultCodes.push(resultCode.join(','));
					resultTxts.push(resultTxt.join(','));
					mainIds.push(mainId.join(','));
				}
			}
		}

	}


	/**获取封装的table数据 每行 为一个对象
	 *参考数据：   无特殊的字符的对象属性为实际值  “-id”：如有为一一对应的主表id 或者 区分表
	 * "-t"为对应的文本格式
	size:"101"
	size-id:"10087"
	size-t:"39"
	 */
	function getTableRowData(infoIds) {
		var data = [];
		var codes = resultCodes[0]; //对应的标识
		for (var i = 0; i < results.length; i++) {
			var arr = results[i].split(",");
			var arrTxt = resultTxts[i].split(",");
			var mainIdArr = mainIds[i].split(",");
			var rowobj = {};
			//rowobj.type_id=infoIds[i];
			for (var j = 0; j < arr.length; j++) {
				rowobj[resultCode[j]] = arr[j]; //值
				var flagV = resultCode[j] + "-t"; //文本字段
				var flag_mid = resultCode[j] + "-id"; //对应的id 注意字段
				rowobj[flagV] = arrTxt[j];
				rowobj[flag_mid] = mainIdArr[j];
			}
			data.push(rowobj);
		}
		return data;
	}

	/**
	 * 获取下拉选择框的对象：键值对-- key:实值 value：文本值
	 * 
	 */
	function getSelectObj(item) {
		var selectObj = {};
		$(item).find("option").each(function(int, item) {
			selectObj[$(item).val()] = $(item).text();
		});
		return selectObj;
	}

	//获取下拉选择框 对应值的文本值数组
	function getSelectTxtArr(item) {
		var textArr = [];
		var values = $(item).val();
		var select = getSelectObj(item);
		for (index in values) {
			textArr.push(select[values[index]]);
		}
		return textArr;

	}

	//位置补空,让主id能一一对应
	function setMainId(array, value) {
		var arr = [];
		for (ind in array) {
			arr.push(value);
		}
		return arr;
	}

	/**
	 * 初始化参数
	 */
	function init(options) {
		this._options=options;
		console.log(this._options);
	}
	
	/**
	 * 检查是否初始化参数
	 */
	function checkoption() {
		if(typeof(this._options.select_info)=='undefined'){
			throw  new Error("初始化未定义参数-select_info");
		}
	}

	return function() {
		this.tableData = function() {
			checkoption();
			return getTableData();
		};
		this.rowTd = function() {
			checkoption();
			return getRowTd();
		};
		this.init = function(_options) {
			init(_options);
		};
	}
})();

CombinationStruct.prototype = {
	constructor: CombinationStruct,
	getTableData: function() { //获取table数据
		return this.tableData();
	},
	getRowTd: function() { //tr行数据
		return this.rowTd();
	},
	init: function(_options) {
		init(_options);
	}
}
