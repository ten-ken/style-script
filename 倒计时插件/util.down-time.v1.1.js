var _DownTime= function (params) {
	//注意：1. 后台返回的集合单个对象 或者 后台返回的对象
	 //里面的属性必须要有adEndDate（开始时间） 和 adStartDate(结束时间) 且为字符串
	//2.对象里面的timeId很重要  是计时器id  用此可以停止计时器
	//3.success方法 定义了 会返回 处理过的downList（集合或者单个对象）和 处理过的高度
	//4. 默认设置的高度不合适 可以覆写 setHight（自定义函数内容）
	// params.downList = params.downList;
	params.success = params.success || null;
	params.timeId = 0;//计时器id  用此可以停止计时器
	if(params.downList.constructor == Array){
		params.dataType ="Array";
	}
	if(params.downList.constructor == Object){
		params.dataType ="Object";
	}
	if(!params.dataType){
		throw new Error("参数downList需为数组对象或者对象");
	}
	if(!params.start){
		throw new Error("参数start需要设置为对应开始时间字段");
	}
	if(!params.end){
		throw new Error("参数end需要设置为对应结束时间字段");
	}
	
	params.setHight = params.setHight||this.setHight;
	params.height = 0;
	Object.assign(this,params);  
	this.init();
}


_DownTime.prototype = {
	constructor: _DownTime,
	init: function() {//初始化方法 
		var _this = this;
		var _downList = this.downList;
		clearInterval(_this.timeId);
		// let calHg = 0;
		var len =_this.dataType=="Object"?"1":_downList.length;
		_this.height =_this.setHight(len);
		
		var timeOutId = setInterval(function() {
			// 获取当前时间，同时得到活动结束时间数组
			var newTime = new Date().getTime();
			// 对结束时间进行处理渲染到页面
			if(_this.dataType=="Object"){
				_this.handSeckill(_downList,newTime,_this);
			}else{
				_downList.forEach(function(o){
					// console.log(o)
					_this.handSeckill(o, newTime, _this);
				})
			}
			if (typeof _this.success == "function") {
				_this.success(_downList,_this.height);
			}
			_this.timeId = timeOutId;
		}, 1000);
		
	},
	timeFormat: function(param) { //小于10的格式化函数
		return param < 10 ? '0' + param : param;
	},
	setHight:function(len){//设置高度 给移动端适配 如默认单位高度是412 不合适 重写方法setHight 在函数参数里面
		return len * 412;
	},
	handSeckill:function(o,newTime,_this) {
		var endTime = new Date(o[_this.end].replace(/-/g, "/")).getTime();
		var startTime = new Date(o[_this.start].replace(/-/g, "/")).getTime();
		var isStart = 0;
		var obj = null;
		//未开始
		if(startTime-newTime>0){
			obj = _this.handTime(startTime,newTime,_this);
			o.isStart =0;
		}else if(startTime-newTime<=0 && endTime-newTime>=0){//已开始未结束
			obj = _this.handTime(endTime,newTime,_this);
			o.isStart =1;
		}else { //活动已结束，全部设置为'00'
			obj = {
				day: '00',
				hour: '00',
				min: '00',
				sec: '00'
			}
		}
		o.downTimeArr = obj;
	},
	handTime:function (o_time,newTime,_this){
		var time = (o_time - newTime) / 1000;
		// 获取天、时、分、秒
		var day = parseInt(time / (60 * 60 * 24));
		var hour = parseInt(time % (60 * 60 * 24) / 3600);
		var min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
		var sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
		var obj = {
			day: _this.timeFormat(day),
			hour: _this.timeFormat(hour),
			min: _this.timeFormat(min),
			sec: _this.timeFormat(sec)
		}
		return obj;
	}
}



//解决ie9不兼容的Object.assign问题 
if (typeof Object.assign != 'function') {
	Object.assign = function(target) {
		'use strict';
		if (target == null) {
			throw new TypeError('Cannot convert undefined or null to object');
		}

		target = Object(target);
		for (var index = 1; index < arguments.length; index++) {
			var source = arguments[index];
			if (source != null) {
				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}
		}
		return target;
	};
}


