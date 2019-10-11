// export default 
class DownTime {
	constructor(params) {
		params.success = params.success || null;
		params.timeId = 0; //计时器id  用此可以停止计时器
		if (params.downList.constructor == Array) {
			params.dataType = "Array";
		}
		if (params.downList.constructor == Object) {
			params.dataType = "Object";
		}
		if (!params.dataType) {
			throw new Error("参数downList需为数组对象或者对象");
		}
		if (!params.start) {
			throw new Error("参数start需要设置为对应开始时间字段");
		}
		if (!params.end) {
			throw new Error("参数end需要设置为对应结束时间字段");
		}

		params.setHight = params.setHight || this.setHight;
		params.height = 0;
		Object.assign(this, params);
		this._init();
	};
	_init() { //初始化方法 
		let _this = this;
		let _downList = this.downList;
		clearInterval(_this.timeId);
		// let calHg = 0;
		let len = _this.dataType == "Object" ? "1" : _downList.length;
		_this.height = _this.setHight(len);

		let timeOutId = setInterval(function() {
			// 获取当前时间，同时得到活动结束时间数组
			let newTime = new Date().getTime();
			// 对结束时间进行处理渲染到页面
			if (_this.dataType == "Object") {
				_this.handSeckill(_downList, newTime, _this);
			} else {
				_downList.forEach(o => {
					_this.handSeckill(o, newTime, _this);
				})
			}
			if (typeof _this.success == "function") {
				_this.success(_downList, _this.height);
			}
			_this.timeId = timeOutId;
		}, 1000);

	};
	timeFormat(param) { //小于10的格式化函数
		return param < 10 ? '0' + param : param;
	};
	setHight(len) { //设置高度 给移动端适配 如默认单位高度是412 不合适 重写方法setHight 在函数参数里面
		return len * 412;
	};
	handSeckill(o, newTime, _this) {
			let endTime = new Date(o[_this.end].replace(/-/g, "/")).getTime();
		let startTime = new Date(o[_this.start].replace(/-/g, "/")).getTime();
		let isStart = 0;
		let obj = null;
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
	};
	handTime(o_time,newTime,_this){
			let time = (o_time - newTime) / 1000;
			// 获取天、时、分、秒
			let day = parseInt(time / (60 * 60 * 24));
			let hour = parseInt(time % (60 * 60 * 24) / 3600);
			let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
			let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
			let obj = {
				day: _this.timeFormat(day),
				hour: _this.timeFormat(hour),
				min: _this.timeFormat(min),
				sec: _this.timeFormat(sec)
			}
			return obj;
		}
}

// export {DownTime};
