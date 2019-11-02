##前言 

  ### 封装版 ajax（提高开发效率）
  
  ### ken.ajax.v1.2.js
  

```
  通用参数  支持kenAjax 、kenGetAjax、kenPostAjax、kenPutAjax、kenDeleteAjax、kenJsonAjax
```
| 参数       | 作用   |类型    |  默认值 |必填 |
| --------   | -----:  |-----:  | :----:  |--- |
| method  | 请求类型|String  |   get/post/delete/push...|是|
| url     | 请求url地址 |String  |  'bind': { able: true}  |是 |
| async    | 是否同步 | Boolean  |  true   |否 |
| data    | 传递数据 | String/Array/Json |     |是 |
| success    | 执行成功回调方法 | data  |  |   |否 |
| fail    | 执行失败回调方法| data  |  |   |否 |
|complete | 执行完成回调方法 | data |  |   |否  |
| contentType    | 请求内容类型 | 编译后台正常的解析内容  |'application/x-www-form-urlencoded;charset=utf-8'|   |否 |
| sendType    | 传递数据d的类型 | object/json/form（表单序列化的字符串） | 通用ajax默认类型为对象 |   |否  |
| progress    | 上传进度的回调方法 |  | 返回进度值 uploadAjax方法专用参数|   |否  |
| el    | 上传控件的id或者class名称为#id 或者.class |  String uploadAjax方法专用参数| uploadAjax方法专用参数| 默认为#fileupload  |否 |
| size    | 单个文件的上传大小 | 单位kb |  uploadAjax方法专用参数|   |否  |
| maxNums    | 最多上传数量 | 个 |  uploadAjax方法专用参数| 默认为1 单文件上传  |否  |
| type    | 上传文件的类型 | all(所有文件)/image(图片) /video(影音) /excel(excel) /word /powerpoint /zip(压缩文件 rar也支持) |  uploadAjax方法专用参数|   |否  |
| error    | 针对文件类型错误的重写 |  | 此方法 写了 type相当无意义 |   |否  |

     
  ```   
		var arrList = []; var obj;
    
		for (var i = 0; i < 3; i++) {
		  	obj = {};
		  	obj.commodityId = i;
			  obj.nums = 18 + i;
			  obj.price = 2 + i * 5;
		  	arrList.push(obj);
	  	}
		//单纯的集合(json数组)
		var main = arrList;
		$.kenAjax({
			method: 'post',
			url: 'http://192.168.0.106:8080/qyxt/miniprogram/testlist',
			data:main ,
			sendType:"json",
			// timeout:1,
			success: function(data) {
				console.log("成功--");
				console.log(data);
			},
			fail:function(data){
				console.log("失败--");
				// console.log(data);
			},
			complete:function(data){
				console.log("完成--");
			}
		});
		
	
		//对象数组(json数组)
		var main1 ={customerId:99,businessHall:82,orderNo:"812342816"}
		main1.lstCommodity = JSON.parse(JSON.stringify(arrList));
		//对象数组(json数组)
		$.kenAjax({
			method: 'post',
			url: 'http://192.168.0.106:8080/qyxt/miniprogram/testobj',
			data:main1 ,
			sendType:"json",
			// timeout:1,
			success: function(data) {
				console.log("成功--");
				console.log(data);
			},
			fail:function(data){
				console.log("失败--");
				// console.log(data);
			},
			complete:function(data){
				console.log("完成--");
			}
		});
		//单纯的对象
		$.kenAjax({
			method: 'post',
			url: 'http://192.168.0.106:8080/qyxt/miniprogram/testobj',
			data:{customerId:99,businessHall:82,orderNo:"812342816","payPrice":21} ,
			success: function(data) {
				console.log("成功--");
				console.log(data);
			},
			fail:function(data){
				console.log("失败--");
				// console.log(data);
			},
			complete:function(data){
				console.log("完成--");
			}
		});
		//单纯的对象(含数组)
		var arr = [91, 28, 37];
		$.kenAjax({
			method: 'post',
			url: 'http://192.168.0.106:8080/qyxt/miniprogram/testobj',
			data: {
				customerId: 99,
				businessHall: 82,
				orderNo: "812342816",
				arr: arr
			},
			success: function(data) {
				console.log("成功--");
				console.log(data);
			},
			fail: function(data) {
				console.log("失败--");
				// console.log(data);
			},
			complete: function(data) {
				console.log("完成--");
			}
		});
		//表单序列化
		$("#btn").click(function() {
			var formstr = $("form").serialize();
			console.log(formstr)
			$.kenAjax({
				method: 'post',
				url: 'http://192.168.0.106:8080/qyxt/miniprogram/testobj',
				data:formstr,
				sendType:"form",//表单序列化类型
				success: function(data) {
					console.log("成功--");
					console.log(data);
				},
				fail: function(data) {
					console.log("失败--");
					// console.log(data);
				},
				complete: function(data) {
					console.log("完成--");
				}
			});
		});
    
   //get Ajax
     $.kenGetAjax({
			url: 'http://192.168.0.106:8080/qyxt/miniprogram/testobj',
			data:{customerId:99,businessHall:82,orderNo:"812342816","payPrice":21} ,
			success: function(data) {
				console.log("成功--");
				console.log(data);
			},
			fail:function(data){
				console.log("失败--");
			},
			complete:function(data){
				console.log("完成--");
			}
		});
    
    //post Ajax
   $.kenPostAjax({
			url: 'http://192.168.0.106:8080/qyxt/miniprogram/testobj',
			data:{customerId:99,businessHall:82,orderNo:"812342816","payPrice":21} ,
			success: function(data) {
				console.log("成功--");
				console.log(data);
			},
			fail:function(data){
				console.log("失败--");
				// console.log(data);
			},
			complete:function(data){
				console.log("完成--");
			}
		});
    
    //json数据传递
      $.kenJsonAjax({
			  url: 'http://192.168.0.106:8080/qyxt/miniprogram/testobj',
		  	data:{customerId:99,businessHall:82,orderNo:"812342816","payPrice":21} ,
			  success: function(data) {
				  console.log("成功--");
				  console.log(data);
		  	},
		  	fail:function(data){
				console.log("失败--");
				  // console.log(data);
		  	},
		  	  complete:function(data){
			    	console.log("完成--");
		  	}
		  });
    
    //上传ajax
    $.kenUploadAjax({
				url: 'http://192.168.31.232:8080/index/upload',
				el:"#fileuploads",//上传控件的id或者class名称为#id 或者.class 默认为#fileupload
				type:"zip",//上传文件格式为压缩文件 默认是all 即任意格式
				size：1024*20,//单个文件最大20M 默认是10M
				maxNums:5,//默认是1 代表单文件上传
				error:function(msg){
				},//错误信息的回调
				//definedTypeError：function(file){ //coding },针对文件类型错误的重写/覆写  此部分写了type就无意义
				success: function(data) {
					console.log("成功--");
					console.log(data);
				},
				fail: function(data) {
					console.log(data);
					console.log("失败--");
				},
				progress:function(progress){
					console.log(progress);
				}
			});
  ```
