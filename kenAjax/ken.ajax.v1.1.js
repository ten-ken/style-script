/**
*
*@author ken
*@dete 2019-09-29
**/
(function($) {
	var requestType =["POST","PUT","DELETE"];
	
	$.extend({
		//通用的ajax
		kenAjax: function(param) {
			realHandler(param)
		},
		//get请求
		kenGetAjax: function(param) {
			param.method='get';
			realHandler(param)
		},
		//post请求
		kenPostAjax: function(param) {
			param.method='post';
			realHandler(param)
		},
		//put请求
		kenPutAjax: function(param) {
			param.method='put';
			realHandler(param)
		},
		//delete请求
		kenDeleteAjax: function(param) {
			param.method='delete';
			realHandler(param)
		},
		//json格式的ajax请求 固定是post请求
		kenJsonAjax: function(param) {
			param.method='post';
			param.sendType='json';
			realHandler(param)
		}
	});

	//实际执行的方法
	var realHandler = function(param) {
		param = param || {};
		param.method = (param.method || "POST").toUpperCase();
		param.url = param.url || "";
		param.async = param.async || true; //默认异步
		param.data = param.data || null;
		param.success = param.success || function() {};
		param.fail = param.fail || function() {};
		param.complete = param.complete || function() {};
		param.contentType = param.contentType || 'application/x-www-form-urlencoded;charset=utf-8';
		param.sendType = (param.sendType || 'string').toLowerCase();

		var xhr = null;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject("MSXML2.XMLHTTP.3.0"); // 出自微软官方,不适用 自己调
		}

		xhr.timeout = param.timeout || 5000;

		var params = [];
		var postData;

		if (param.sendType == "json") {
			param.contentType = "application/json;charset=UTF-8";
			resolveObj(param.data, null);
			postData = JSON.stringify(param.data);
		} else if (param.sendType == "form") {
			postData = resolveObj(param.data, null, true);
			// param.data;
		} else {
			console.log(param.data);
			resolveObj(param.data, params);
			postData = params.join('&');
			console.log(params);
			console.log(postData);
		}
		
		
		if (requestType.indexOf(param.method.toUpperCase())!=-1) {
			xhr.open(param.method, param.url, param.async);
			xhr.setRequestHeader('Content-Type', param.contentType);
			otherHander(param, xhr); //处理超时和上传进度等事件
			xhr.send(postData);
		} else if (param.method.toUpperCase() === 'GET') {
			xhr.open(param.method, param.url + '?' + postData, param.async);
			xhr.setRequestHeader('Content-Type', param.contentType);
			otherHander(param, xhr); //处理超时和上传进度等事件
			xhr.send(null);
		} 

		xhr.onreadystatechange = function() {
			//必须判断xhr.readyState是否等于4 不然重复调用方法
			if (xhr.readyState == 4 && xhr.status == 200) {
				param.success(xhr.responseText);

			}
			if (xhr.readyState == 4 && xhr.status != 200 && xhr.status != 404) {
				console.log("status:" + xhr.status);
				param.fail(xhr.responseText);
			}
		}
	}

	//处理加载事件 超时事件和进度事件等
	var otherHander = function(param, xhr) {
		xhr.onload = function(e) {
			param.complete(xhr.responseText);
		};
		xhr.ontimeout = function(e) {
			console.log("请求超出，当前超时时间设置为:" + xhr.timeout + " 毫秒");
		};
		// xhr.upload.onprogress = function(ev) {
		// 	var percent = (ev.loaded / ev.total) * 100 + '%';
		// console.log(percent);
		// progress.style.width = percent;
		// };
	}

	//简单数据处理 过滤未定义的数据
	var resolveObj = function(data, params, ishand) {
		var ishand = ishand || false;
		if (ishand) {
			console.log(ishand);
			return data.replace("undefined", "");
		}
	
		for (var key in data) {
			//简单处理下 字段为undefined 防止后端接收异常
			if (data[key] == undefined || data[key] == "undefined") {
				delete data[key];
			}
			if (params) {
				params.push(key + '=' + data[key]);
			}
		}
	}


})(jQuery);
