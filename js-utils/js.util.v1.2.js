
//===============================String==================================//

String.prototype.isNotEmpty = function() {
	if (this !== null && this !== undefined && this !== '') {
		return true;
	}
	return false;
}

String.prototype.isNotBlank = function() {
	var _param = this.trim();
	if (_param !== null && _param !== undefined && _param !== '') {
		return true;
	}
	return false;
}




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
function makeUpArray(oldArr, ...arr) {
	oldArr = (oldArr && oldArr.constructor == Array) ? oldArr : [];
	return oldArr.concat(arr);
}

/******set集合--不含重复值********/
var _Set = (function() {
	return function() {
		this._dataStore = [];
	}
})();

_Set.prototype = {
	constructor: _Set,
	add: function(data) { //向集合中添加元素
		if (this._dataStore.indexOf(data) < 0) {
			this._dataStore.push(data);
			return this;
		}
		return false;
	},
	remove: function(data) { //从集合中移除元素
		var pos = this._dataStore.indexOf(data);
		if (pos > -1) {
			this._dataStore.splice(pos, 1);
			return this;
		}
		return false;
	},
	contains: function() { //检查一个元素是否在集合中
		if (this._dataStore.indexOf(data) > -1) {
			return true;
		} else {
			return false;
		}
	},
	size: function() {
		return this._dataStore.length
	}, //返回集合的长度
	union: function(set) { //返回与另一个集合的并集
		var tempSet = new Set();
		for (var i = 0; i < this._dataStore.length; ++i) {
			tempSet.add(this._dataStore[i]);
		}
		for (var i = 0; i < set.dataStore.length; ++i) {
			if (!tempSet.contains(set.dataStore[i])) {
				tempSet.dataStore.push(set.dataStore[i]);
			}
		}
		return tempSet;
	},
	intersect: function(set) { //返回与另一个集合的交集
		var tempSet = new Set();
		for (var i = 0; i < this._dataStore.length; ++i) {
			if (set.contains(this._dataStore[i])) {
				tempSet.add(this._dataStore[i]);
			}
		}
		return tempSet;
	},
	subset: function(set) { //判断集合是否其他集合的子集
		if (this.size() > set.size()) {
			return false;
		} else {
			this._dataStore.foreach(function(member) {
				if (!set.contains(member)) {
					return false;
				}
			})
		}
		return true;
	},
	difference: function(set) { //返回与另一个集合的补集
		var tempSet = new Set();
		for (var i = 0; i < this._dataStore.length; ++i) {
			if (!set.contains(this._dataStore[i])) {
				tempSet.add(this._dataStore[i]);
			}
		}
		return tempSet;
	},
	show: function() { //显示集合中的元素
		return this._dataStore;
	}
}
/*******字典---重复的会被覆盖*******/
function _Dictionary() { //字典的构造函数
	this._datastore = new Array();
}

_Dictionary.prototype = {
	constructor: _Dictionary,
	add: function(key, value) {
		this._datastore[key] = value;
		return this;
	}, //增加一条键值对
	find: function(key) {
		return this._datastore[key]
	}, //查找指定key，返回对应value的值
	remove: function(key) {
		delete this._datastore[key];
		return this;
	}, //删除指定key的键值对
	showAll: function() { //打印字典的所有键值对
		//若需排序可以给Object.keys(this._datastore)数组追加sort方法
		Object.keys(this._datastore).forEach(function(key) {
			console.log(key + " -> " + this._datastore[key]);
		}.bind(this))
	},
	count: function() { //返回字典所含键值对数量
		var n = 0;
		for (var key in this._datastore) {
			++n;
		}
		return n;
	},
	clear: function() { //清空字典
		Object.keys(this._datastore).forEach(function(key) {
			delete this._datastore[key];
		}.bind(this))
	},
	show: function() {
		return this._datastore;
	}
}

/****栈的封装代码 栈是一种后入先出 的数据结构****/

function _Stack() { //栈的构造函数
	this._dataStore = []; //初始化一个空数组来保存列表元素
	this._top = 0; //记录栈顶的位置
}

_Stack.prototype = {
	constructor: _Stack,
	clear: function() { //清空栈
		delete this._dataStore;
		this._dataStore = [];
		this._top = 0;
	},
	push: function(element) {
		this._dataStore[this._top++] = element;
		return this;
	}, //向栈内添加元素
	pop: function() {
		return this._dataStore[--this._top];
	}, //从栈内取出元素
	peek: function() {
		return this._dataStore[this._top - 1]
	}, //查看栈顶元素
	length: function() {
		return this._top;
	} //获取列表的中元素的个数
}
