;
(function($) {
	//@author:ken
	//@time:2019-09-04
	//@version:v1.1 优化参数 简化代码20行
	"use strict";
	var serializeTb = function(el, options) {
		    this.$element = el,
			this.defaults = {
				'bind':'',
				filter: []
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
			var nums = $(_this).find("tbody tr:first").find("input,textarea,select").not(".need_ingore").length;
			if (nums < 0) {
				return null;
			}
			var dataArr = [];
			var data = null;
			for (var i = 0; i < count; i++) {
				var arr = $(_this).find("tbody tr:eq(" + i + ")").find("input,textarea,select").not(".need_ingore").serializeArray();
				data = {};
				$.each(arr, function(i, obj) {
					if (_settings.filter.indexOf(obj.name) == -1) {
						data[obj.name] = obj.value;
					}
				});
				if (!$.isEmptyObject(data)) { //对象是否为空
					dataArr.push(data);
				}
			}
			if (_settings.bind) {
				var curObj = {};
				curObj[_settings.bind] = dataArr;
				return curObj;
			}
			return dataArr;
		},
		getSearchObj: function() { //序列化搜索栏的信息  简化方法  过滤使用 not方法 设定class为 need_ingore
			var item = {};
			var _this = this.$element;
			var _settings = this.settings;
			if (typeof(_settings.resultType) == 'undefined' || _settings.resultType == 'string') { //默认为字符串
				return $(_this.selector + " :input,textarea,select").not(".need_ingore").serialize();
			}
			var arr = $(_this.selector + " :input,textarea,select").not(".need_ingore").serializeArray();
			arr.forEach(function(obj, ind) {
				item[obj.name] = obj.value;
			});
			return item;
		}
	}

	$.fn.serializeTable = function(options) {
		var ser = new serializeTb(this, options||{});
		return ser.getAllValue();
	};

	$.fn.serializeSearch = function(options) {
		var ser = new serializeTb(this, options||{});
		return ser.getSearchObj();
	};

})(jQuery);
