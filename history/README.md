## 前言
  仅支持ie11、谷歌70+
  
  
 ## 相关参数
 
      field   ==》 绑定dom属性
			param.step ==》最多记录前多少步 类型数字
			done==》回调函数（参数分别是旧值 、新值、 当前触发事件的对象)
      
  ## 示例
       $(".abc").historyInfo({
			field: "",
			step: 3,
			done: function(oldV, newV, _this) {
				console.log(oldV);
				console.log(newV);
				console.log($(_this).data("_history_data"));
			}
		});
