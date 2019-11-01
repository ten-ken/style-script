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
		param.size = param.size||1024*10;//默认单个文件最大的大小为10M
		param.maxNums =param.maxNums||1;//默认上传一个文件
		param.type = param.type||"all";//默认上传图片 // all(所有文件) image(图片) video(影音) excel(excel) word ppt()
		param.error =param.error || function() {};//错误处理的回调
		// param.definedTypeError =param.definedTypeError || false//类型错误的外部接口

		//获取上传文件信息
		var data = document.querySelectorAll(param.el);
		var formData = new FormData();
		var errData =[];
		var errTypeData =[];
		
		var tip ;
		var lindex=0 ;
		tip = param.type=="image"?"图片":(param.type=="video"?"影音文件":(param.type=="sheet"?"excel文件":(param.type=="word"?"word文件":(param.type=="powerpoint"?"ppt文件":"文件"))));

		if(param.maxNums<data[0].files.length){
			param.error("每次最多可以上传"+param.maxNums+"个"+tip);
			return;
		}
		var haveError=false;
		if(param.definedTypeError){
			haveError = param.definedTypeError(data[0].files);
		}
		
		var fileType ="";
		for (var ind=0; ind<data[0].files.length;ind++) {
			//走这个接口(外部类型函数 未定义 走的还是下面的这个部分 与 尺寸的限制这部分的代码不相干 不冲突)
			fileType = data[0].files[ind].type;
			if (param.type!= "all" && !param.definedTypeError && fileType.indexOf(param.type)==-1){
				errTypeData.push("第"+(ind+1)+"个文件不是"+tip);
				continue;
			}
			
			if(Number(data[0].files[ind].size)>param.size){
				errData.push("第"+(ind+1)+"个文件尺寸超过最大尺寸;");
			}else{
				formData.append("file", data[0].files[ind]);	
			}
		}
		
		//外部接口反馈有错误
		if(haveError){
			return;
		}
		
		//上传类型错误
		if(errTypeData.length>0 && !param.definedTypeError){
			param.error(errTypeData.join("\t\n"));
			return;
		}
		//文件限制大小
		if(errData.length>0){
			errData.splice(0, 0, "文件最大为"+param.size+"kb");
			param.error(errData.join("\t\n"));
			return;
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
