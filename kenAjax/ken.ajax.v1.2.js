/**
 *
 *@author ken
 *@dete 2019-09-29
 **/
(function($) {
	var requestType = ["POST", "PUT", "DELETE"];

	$.extend({
		//通用的ajax
		kenAjax: function(param) {
			realHandler(param)
		},
		//get请求
		kenGetAjax: function(param) {
			param.method = 'get';
			realHandler(param)
		},
		//post请求
		kenPostAjax: function(param) {
			param.method = 'post';
			realHandler(param)
		},
		//put请求
		kenPutAjax: function(param) {
			param.method = 'put';
			realHandler(param)
		},
		//delete请求
		kenDeleteAjax: function(param) {
			param.method = 'delete';
			realHandler(param)
		},
		//json格式的ajax请求 固定是post请求
		kenJsonAjax: function(param) {
			param.method = 'post';
			param.sendType = 'json';
			realHandler(param)
		},
		//上传文件
		kenUploadAjax: function(param) {
			// alert(999);
			uploadAjax(param);
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


		if (requestType.indexOf(param.method.toUpperCase()) != -1) {
			xhr.open(param.method, param.url, param.async);
			xhr.setRequestHeader('Content-Type', param.contentType);
			otherHander(param, xhr); //处理超时
			xhr.send(postData);
		} else if (param.method.toUpperCase() === 'GET') {
			xhr.open(param.method, param.url + '?' + postData, param.async);
			xhr.setRequestHeader('Content-Type', param.contentType);
			otherHander(param, xhr); //处理超时
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
		xhr.onprocess = function(event) {
			console.log(event);
			if (event.lengthComputable) {
				param.progress(Math.ceil(event.loaded * 100 / event.total));
			}
		};
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

	//上传的主方法
	var uploadAjax = function(param) {
		param = param || {};
		param.url = param.url || "";
		param.async = param.async || true; //默认异步
		param.success = param.success || function() {};
		param.fail = param.fail || function() {};
		param.complete = param.complete || function() {};
		param.progress = param.progress || function() {};
		param.el = param.el || "#fileupload"; //默认上传的控件id


		//获取上传文件信息
		var data = document.querySelectorAll(param.el);
		var formData = new FormData();
		for (var ind in data[0].files) {
			formData.append("file", data[0].files[ind]);
		}

		var xhr = null;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject("MSXML2.XMLHTTP.3.0"); // 出自微软官方,不适用 自己调
		}
		xhr.timeout = param.timeout || 5000;
		otherHander(param, xhr); //处理超时
		xhr.open("POST", param.url, param.async);
		xhr.send(formData);

		// xhr.upload.addEventListener("progress", function(event) {
		// 	if (event.lengthComputable) {
		// 		param.progress(Math.ceil(event.loaded * 100 / event.total));
		// 	}
		// }, false);

		// $.ajax({
		// 	url: param.url,
		// 	dataType: 'json',
		// 	type: 'POST',
		// 	data: formData,
		// 	async:param.async,
		// 	processData: false, // 使数据不做处理
		// 	contentType: false, // 不要设置Content-Type请求头
		// 	success: function(data) {
		// 		if(param.success){
		// 			param.success(data);
		// 		}
		// 	},
		// 	error: function(response) {
		// 		if(param.fail){
		// 			param.fail(data);
		// 		}
		// 	}
		// });
	}


})(jQuery);
