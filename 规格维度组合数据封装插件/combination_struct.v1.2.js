/*
 * @time:2019-03-30
 * @updateTime :2019-10-03 
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
	var topText =[];//主特征信息
	var topTexts =[];//主特征信息集合

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
		topText =[];
		topTexts =[];
	}


	//获取行tr
	function getRowTd() {
		var rowData = [];
		var data = getTableData();
		if (data.length > 0) {
			var arr = data[0];
			var obj;
			for (row in arr) {
				obj ={};
				obj.topId =arr[row].topId||"";
				obj.topText =arr[row].topText||"";
				rowData.push(obj);
			}
		}
		return rowData;
	}


	//主方法
	function getTableData() {
		resetData();
		var arrays = [];

		// input框部分
		$("" + this._options.select_info + ":not(select,textarea)").each(function(ind, obj) {
			var checked =$(obj).find("input:checked").val();
			if (checked) {
				var object = {};
				var name = $(obj).attr("name");
				object.name = name;
				object.txtV = getInputTxt(obj,"_text_");
				object.value = getInputTxt(obj);
				object.mainId = getInputTxt(obj,$(obj).attr("typeId"));
				object.topText = getInputTxt(obj,$(obj).attr("topText"));
				arrays.push(object);
			}
		});
		
		//下拉框部分
		$("" + this._options.select_info + ":not(input)").each(function(ind, obj) {
			if ($(obj).val() != null && $(obj).val() != '') {
				var object = {};
				var name = $(obj).attr("name");
				object.name = name;
				object.txtV = getSelectTxtArr(obj);
				object.value = $(obj).val();
				object.mainId = setMainId($(obj).val(), $(obj).attr("typeId"));
				object.topText =setMainId($(obj).val(),$(obj).attr("topText")) ;
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
			var cur_topTexts = arr[index].topText;
			for (var i = 0; i < cur_arr.length; i++) {
				result[index] = cur_arr[i];
				resultCode[index] = code;
				resultTxt[index] = txtV[i];
				mainId[index] = cur_mainIds[i];
				topText[index] = cur_topTexts[i];
				if (index != arr.length - 1) {
					doCombination(arr, index + 1)
				} else {
					results.push(result.join(','));
					resultCodes.push(resultCode.join(','));
					resultTxts.push(resultTxt.join(','));
					mainIds.push(mainId.join(','));
					topTexts.push(topText.join(','));
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
			var topTextArr = topTexts[i].split(",");
			var rowobj = {};
			for (var j = 0; j < arr.length; j++) {
				rowobj[resultCode[j]] = {};
				rowobj[resultCode[j]].value = arr[j];
				rowobj[resultCode[j]].showV = arrTxt[j];
				rowobj[resultCode[j]].topId = mainIdArr[j];
				rowobj[resultCode[j]].name = resultCode[j];
				rowobj[resultCode[j]].topText = topTextArr[j];
			}

			if (this._options.extraParam) {
				$.extend(rowobj, this._options.extra);
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

	//设置文本 主id等
	function getInputTxt(item,flag){
		var arr =[];
		$(item).find("input:checked").each(function(int, item) {
			if(flag =="_text_"){
				arr.push($(this).attr("showValue"));
			}else if(flag!=null && flag !="text"){
				arr.push(flag);
			}else{
				arr.push($(this).val());
			}
		});
		return arr;
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
		this._options = $.extend({}, options);
		this._options.extra = this._options.extra || {};
		this._options.extraParam = this._options.extraParam || false;
		console.log(this._options);
		// console.log(extraIndex);
		// console.log(extra);
	}

	/**
	 * 检查是否初始化参数
	 */
	function checkoption() {
		if (typeof(this._options.select_info) == 'undefined') {
			throw new Error("初始化未定义参数-select_info");
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
