;
(function($) {
	//@author:ken
	//@time:2019-1-22
	"use strict";
	var serializeTb = function(el, options) {
		this.$element = el,
			this.defaults = {
				'filter': [], //过滤字段
				'bind': { //绑定的name,是否绑定
					name: 'bind',
					able: true
				},
				//'resultType': 'object',
			},
			this.settings = $.extend({}, this.defaults, options);
	}

	//定义serializeTb的方法
	serializeTb.prototype = {
		getAllValue: function() { //序列化值 封装为为json对象
			var _this = this.$element;
			var _settings = this.settings;
			var count = $(_this).find("tbody tr").length;
			//单行输入框的数量
			var nums = $(_this).find("tbody tr:first").find("input,textarea,select").length;
			if (nums < 0) {
				return null;
			}
			var dataArr = [];
			for (var i = 0; i < count; i++) {
				var arr = $(_this).find("tbody tr:eq(" + i + ")").find("input,textarea,select").serializeArray();
				var data = {};
				$.each(arr, function(i, obj) {
					if (_settings.filter.indexOf(obj.name) == -1) {
						var att = obj.name;
						data[att] = obj.value;
					}
				});
				if (!$.isEmptyObject(data)) { //对象是否为空
					dataArr.push(data);
				}
			}

			if (_settings.bind.able && _settings.bind.name != '') {
				var curObj = {};
				curObj[_settings.bind.name] = dataArr;
				return curObj;
			}
			return dataArr;
		},
		getSearchObj: function() {//序列化搜索栏的信息
			var item;
			var _this = this.$element;
			var _settings = this.settings;
			if (typeof(_settings.resultType) == 'undefined' || _settings.resultType== 'string') { //默认为字符串
				item='';
			}else{
				item={};
			}
			var arr = $(_this.selector + " :input,textarea,select").serializeArray();

			if (arr.length <= 0) {
				return item;
			}
		
			arr.forEach(function(obj, ind) {
				if(typeof(item)== 'object' && _settings.filter.indexOf(obj.name) == -1){
					item[obj.name]=obj.value;
				}	
				if (typeof(item)== 'string' && _settings.filter.indexOf(obj.name) == -1) {
					item += obj.name + "=" + obj.value + "&";
				}

			});
			
			if (typeof(item)== 'string') { //默认为对象
				item = item.substring(0, item.length - 1);
			}
 			return item;
		}
	}

	$.fn.serializeTable = function(options) {
		var ser = new serializeTb(this, options);
		if (options.hasOwnProperty('getAllValue')) {
			options.getAllValue(ser.getAllValue());//回调函数 getAllValue--无参  
		}
		return ser.getAllValue();
	};


	$.fn.serializeSearch = function(options) {
		var ser = new serializeTb(this, options);
		return ser.getSearchObj();
	};


})(jQuery);
