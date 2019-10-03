(function($) {

	$.extend({
		kenAjax: function(param) {
			realHandler(param)
		}
	});

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
			xhr = new ActiveXObject("MSXML2.XMLHTTP.3.0"); // 出自微软官方,不适用自己调
		}

		xhr.timeout = param.timeout || 3000;

		var params = [];
		var postData;

		if (param.sendType == "json") {
			param.contentType="application/json;charset=UTF-8";
			postData = JSON.stringify(param.data);
		} else if (param.sendType == "form") {
			postData = param.data;
		} else {
			for (var key in param.data) {
				params.push(key + '=' + param.data[key]);
			}
			postData = params.join('&');
			console.log(postData);
		}

		if (param.method.toUpperCase() === 'POST') {
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



})(jQuery);
