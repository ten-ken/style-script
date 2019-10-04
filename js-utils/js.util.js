//===============================Array==================================//
/** 
 * @description 单纯的数组去重
 */
Array.prototype.unique = function() {
	var arr = []; //创建新数组
	for (var i = 0; i < this.length; i++) { //遍历当前数组
		if (arr.indexOf(this[i]) === -1) { //如果等于-1，那么也是就是新数组中没有一项和当前数组一样
			arr.push(this[i])
		}
	}
	return arr;
	//return [...new Set(this)];//这个兼容性不行
}
/** 
 * 单纯的数组删除某一项 也可能是多项
 * @param {String} let 要删除那一项的值
 */
Array.prototype.delByVal = function(val) {
	for (var i = 0; i < this.length; i++) { //遍历当前数组
		var index = arr.indexOf(val);
		if (index > -1) { //如果等于-1，那么也是就是新数组中没有一项和当前数组一样
			this.splice(index, 1);
		}
	}
}
/**
 * 直接追加可变形参作为新的数组
 */
Array.prototype.appendParams = function(...arr) {
	return this.concat(arr);
}
//===============================Date==================================//

/** 
 * 日期格式化
 * @param {String} format default 'yyyy-MM-dd hh:mm:ss'  'yyyy-MM-dd'
 */
Date.prototype.dateFormat = function(format = 'yyyy-MM-dd hh:mm:ss') {
	let o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S": this.getMilliseconds()
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (let k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return format;
}

/** 
 * 获取距离今天的N天的日期  N可正可负
 * @param {Number} interval default 0  -n 表示前几天  n表示后几天
 */
function getIntervalDate(interval = 0) {
	interval = Number(interval)
	let currentDate = new Date();
	currentDate.setDate(currentDate.getDate() + interval);
	let year = currentDate.getFullYear();
	let month = (currentDate.getMonth() + 1) < 10 ? "0" + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
	let day = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
	return year + "-" + month + "-" + day;
}

/** 
 * 时间戳格式化为日期格式
 * @param {Number} timestamp 时间戳
 * @param {String} format default 'yyyy-MM-dd hh:mm:ss'  'yyyy-MM-dd' 
 */
function timestampToDate(timestamp, format = 'yyyy-MM-dd hh:mm:ss') {
	return new Date(parseInt(timestamp) * 1000).DateFormat(format);
}

//===============================Object==================================//
/** 
 * 克隆对象
 * @param {Object} source 
 */
function cloneObj(source) {
	return JSON.parse(JSON.stringify(source))
}


/**
 * 设置样式
 * @param {HTMLElement} elem 需要设置的节点
 * @param {Object} prop      CSS属性，键值对象
 */
function setStyle(elem, prop) {
	if (!elem) {
		return false
	};
	for (let i in prop) {
		elem.style[i] = prop[i];
	}
};
/**
 * 获取节点css属性
 * @param  {HTMLElement} elem 需要获取的节点
 * @param  {String} name      css属性
 * @return {String}           属性值
 */
function getStyle(elem, name) { // 获取CSS属性函数
	if (elem.style[name] != '') return elem.style[name];
	if (!!window.ActiveXObject) return elem.currentStyle[name];
	return document.defaultView.getComputedStyle(elem, "").getPropertyValue(name.replace(/([A-Z])/g, "-$1").toLowerCase());
}

/**
 * 获取鼠标光标相对于整个页面的位置
 * @return {String} 值
 */
function getX(e) {
	e = e || window.event;
	let _left = document.documentElement.scrollLeft || document.body.scrollLeft;
	return e.pageX || e.clientX + _left;
}

function getY(e) {
	e = e || window.event;
	let _top = document.documentElement.scrollTop || document.body.scrollTop;
	return e.pageY || e.clientY + _top;
}

/**
 * 获取class命名的节点
 * @param  {String} className CSS命名
 * @param  {String} tag       标签名称/去全部标签时用 *
 * @param  {HTMLElement} parent    查找的范围，通常为包含内容的父节点
 * @return {Array}           返回筛选节点的数组集合
 */
function getElementsByClassName(className, tag, parent) {
	parent = parent || document;
	tag = tag || "*";
	let allTags = (tag === "*" && parent.all) ? parent.all : parent.getElementsByTagName(tag);
	let classElems = [];
	className = className.replace(/\-/g, "\\-");
	let regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
	for (let i = 0; i < allTags.length; i++) {
		elem = allTags[i];
		if (regex.test(elem.className)) {
			classElems.push(elem);
		};
	};
	return classElems;
};

// /**
//  * 为目标元素添加事件监听器
//  * @method on||addEvent
//  * @static
//  * @param {HTMLElement} elem 目标元素
//  * @param {String} type 事件名称 如：click|mouseover
//  * @param {Function} listener 需要添加的监听器
//  * @return 返回操作的元素节点
//  */
// function on(elem, type, listener) {
// 	type = type.replace(/^on/i, '').toLowerCase();
// 	let realListener = listener;
// 	// 事件监听器挂载
// 	if (elem.addEventListener) {
// 		elem.addEventListener(type, realListener, false);
// 	} else if (elem.attachEvent) {
// 		elem.attachEvent('on' + type, realListener);
// 	}
// 	return elem;
// };
// 
// let EventHandle = {
// 	addEvent: function(ele, type, handle) {
// 		if (ele.addEventListener) {
// 			ele.addEventListener(type, handle, false);
// 		} else if (ele.attachEvent) {
// 			ele.attachEvent("on" + type, handle);
// 		} else {
// 			ele["on" + type] = handle;
// 		}
// 	},
// 	deleteEvent: function(ele, type, handle) {
// 		if (ele.removeEventListener) {
// 			ele.removeEventListener(type, handle, false);
// 		} else if (ele.detachEvent) {
// 			ele.detachEvent("on" + type, handle);
// 		} else {
// 			ele["on" + type] = null;
// 		}
// 	}
// }
// 

/**
 * 千分位显示 常用于价格
 * @param {Number} num
 */
function toThousands(num) {
	return parseFloat(num).toFixed(2).replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, "$1,");
}


/**
 * 动态加载 CSS 样式文件
 */
function LoadStyle(url) {
	try {
		document.createStyleSheet(url);
	} catch (e) {
		let cssLink = document.createElement('link');
		cssLink.rel = 'stylesheet';
		cssLink.type = 'text/css';
		cssLink.href = url;
		let head = document.getElementsByTagName('head')[0];
		head.appendChild(cssLink);
	}
}


/**
 * 返回浏览器版本
 */

function getExplorerInfo() {
	let explorer = window.navigator.userAgent.toLowerCase();
	// ie
	if (explorer.indexOf("msie") >= 0) {
		let ver = explorer.match(/msie ([\d.]+)/)[1];
		return {
			type: "IE",
			version: ver
		};
	}
	// firefox
	else if (explorer.indexOf("firefox") >= 0) {
		let ver = explorer.match(/firefox\/([\d.]+)/)[1];
		return {
			type: "Firefox",
			version: ver
		};
	}
	// Chrome
	else if (explorer.indexOf("chrome") >= 0) {
		let ver = explorer.match(/chrome\/([\d.]+)/)[1];
		return {
			type: "Chrome",
			version: ver
		};
	}
	// Opera
	else if (explorer.indexOf("opera") >= 0) {
		let ver = explorer.match(/opera.([\d.]+)/)[1];
		return {
			type: "Opera",
			version: ver
		};
	}
	// Safari
	else if (explorer.indexOf("Safari") >= 0) {
		let ver = explorer.match(/version\/([\d.]+)/)[1];
		return {
			type: "Safari",
			version: ver
		};
	}
}


/**
 * 判断是否移动设备
 */
function isMobile() {
	if (navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/webOS/i) ||
		navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/iPod/i) ||
		navigator.userAgent.match(/BlackBerry/i) ||
		navigator.userAgent.match(/Windows Phone/i)
	) {
		return true;
	}
	return false;
}



/**
 * 判断是否移动设备访问
 */
function isMobileUserAgent() {
	return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i
		.test(window.navigator.userAgent.toLowerCase()));
}

/**
 * 组合成数组 不区分是不区分是单纯数组还是json数组  第一个是旧数组 没有则为空 将后面可变数组追加在后面
 */
function makeUpArray(oldArr,...arr) {
	oldArr = (oldArr && oldArr.constructor == Array )?oldArr:[];
	return oldArr.concat(arr);
}
