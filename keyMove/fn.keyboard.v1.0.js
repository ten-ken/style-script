/**
 *
 *@author ken
 *@dete 2019-09-29
 **/
(function($) {
	$.extend({
		keyboardMove: function(params) {
			var _this = this;
			_this.defaults = {
					keydowns: ['up-down', 'left-right']
				};
			_bindParams(params, _this);
			_bindEven(_this);
		},
	});

	//实际执行的方法
	var _bindParams = function(params, _this) {
		params = params || {};
		if (!params.id) {
			throw new Error("参数id不能为空,对应被监控区域父id");
		}
		if (!params.pId) {
			throw new Error("参数pId不能为空,对应被监控区域id");
		}
		if (!params.lastEl) {
			throw new Error("参数lastEl不能为空，且是行元素的标签或者class属性,table使用tr作为值");
		}
		if (params.keydowns && params.keydowns.constructor != Array) {
			throw new Error("参数keydowns需要为数组，例如['up-down','left-right'] ==上下 左右");
		}
		if (!params.el ) {
			throw new Error("参数el不能为空,为单行控制聚焦的单元的class名字 具有相对唯一性");
		}
		_this.params = $.extend({}, _this.defaults, params);
	}

	var _bindEven = function(_this) {
		var _params = _this.params;
		var id = _params.pId;
		var listenId = _params.id;
		var lastEl = _params.lastEl == "tr" ? " tbody tr" : _params.lastEl;
		var lastEl_ = _params.lastEl == "tr" ? "tr" : _params.lastEl;
		var keydowns = _params.keydowns;
		var updown = keydowns.indexOf("up-down") != -1 ? true : false;
		var leftRight = keydowns.indexOf("left-right") != -1 ? true : false;
		var el = _params.el;;
		$("#" + id).on('keydown', "#" + listenId, function() {
			var ccol = $("#" + listenId + " " + lastEl +" "+el+":focus").parents(lastEl_).find(el+":visible").index($("#" + listenId + " " + lastEl +
				" "+el+":focus"));
			var crow = $("#" + listenId + " " + lastEl +" "+el+":focus").parents(lastEl_).index("#" + listenId + " " + lastEl);	
// 			//上下键盘
			if ((event.keyCode == 38 || event.keyCode == 40) && updown) { //上
				crow = event.keyCode == 38?crow-1:crow+1;
				$('#' + listenId + ' ' + lastEl + ':eq(' + crow + ') '+el+':visible').eq(ccol).focus();
			}
			//左右键盘
			if ((event.keyCode == 37 || event.keyCode == 39) && leftRight) { 
				ccol = event.keyCode == 37?ccol-1:ccol+1;
				ccol = ccol<0? 0:ccol;
				$('#' + listenId + ' ' + lastEl + ':eq(' + crow + ') '+el+':visible').eq(ccol).focus();
			}
			// console.log("行数:"+crow);
			// console.log("列数:"+ccol);
		})
	}


})(jQuery);
