/**
 *
 *@author ken
 *@dete 2019-09-29
 **/
(function($) {
	$.fn.extend({
		historyInfo: function(param) {
			param = param || {};
			param.field = param.field || "oldV";
			param.step = (param.step && param.step>=2)?param.step:2;//记录操作步骤2 代表前2步 3是记录前3步
			param.arr=[];
			
			$(this).change(function(even) {
				let c_this = this;
				let curV = $(c_this).val() || "";
				let curObj;
				let flag =true;
				for(var ind in param.arr){
					if(param.arr[ind].className==$(c_this).attr("class")){
						curObj =param.arr[ind];
						flag =false;
					}
				}
				
				curObj = curObj||{};
				let data = curObj.data||[];
				let mainId =curObj.mainId;
				data.push(curV);
				if(data.length>param.step){
					data.splice(0,data.length-param.step);
				}
				if(data.length<=1){
					data.splice(0, 0, "");
				}
				
				curObj.className = $(c_this).attr("class");
				curObj.data = data;
				
				if(flag){
					param.arr.push(curObj);
				}
				$(c_this).data(param.field, curObj.data[curObj.data.length-2]||"");
				$(c_this).attr(param.field, curObj.data[curObj.data.length-2]||"");
				$(c_this).data("_history_data", curObj.data);
				
				if (typeof param.done == "function") {
					console.log(param.arr);
					console.log(curObj.data.length);
					param.done(curObj.data[curObj.data.length-2]||"",curObj.data[curObj.data.length-1]||"", c_this);
				}
			})
			return param.arr;
		},
	});
})(jQuery);
