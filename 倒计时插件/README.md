## 引入对应的v1.1版本 js

## 相关参数

| 参数       | 作用   |类型    |  默认值 |必填 |更新 |
| --------   | -----:  |-----:  | :----:  |--- |-----|
| downList  | 需要设置倒计时的对象或者json数组 |Array/Object  |  无  |是|旧|
| start      | 开始时间的属性名 |String  |   无   |是 |当前新增|
| end        | 结束时间的属性名 | String  |   无   |是 |当前新增|


## 相关事件/函数

| 事件       | 作用     |返回值类型    | 参数值 |必填 |
| --------   | -----:  |-----:  | :----:  |--- |
| setHight   | 设置高度 |Number|  无  |否|
| success    | 处理结束后的回调 | void |   返回处理后的数据源（downList） 和高度值    |需要 时间通过这个显示倒计时 |


## 版本引入和使用
### 引入 	<div style="color:orange"><script src="xx/util.down-time.v1.1.js"></script></div>


    数据源（实际从接口里面取）
    var downList = {
			adStartDate: "2019-10-09 11:01:24",
			adEndDate: "2019-10-11 20:31:28",
			isStart: 1 //此此属性可不要
		};

		//isStart 未开始/已开始 0,1
		var dt = new _DownTime({
			downList: downList,
			start:'adStartDate',
			end:'adEndDate',
			// setHight:function(){
			// 	return 3000;
			// },
			 success: function(data, calHg) {
          			//伪代码 返回结果会带入isStart  未开始/已开始 0,1
			   	 $(".placeholder").eq(0).html(data.downTimeArr.day + "天");
			 	  $(".placeholder").eq(1).html(data.downTimeArr.hour + "时");
			 	  $(".placeholder").eq(2).html(data.downTimeArr.min + "分");
			 	  $(".placeholder").eq(3).html(data.downTimeArr.sec + "秒");
			 }
		});
### 引入 <div style="color:blue">	import DownTime from '/../../utils/es6.down-time.js';		</div>

    与上面类似 只是new的对象是DownTime 不是_DownTime 这部分需要注意


旧版本

down-time.html（页面）	
es6.down-time.js（es6 普通版）	
es6.down-time.wx.js	（es6 小程序版）
util.down-time.js（普通版）
myui.css

js 引入旧版本其中一个即可（非小程序 不要引入es6.down-time.wx.js 这个版本）

| 参数       | 作用   |类型    |  默认值 |必填 |更新 |
| --------   | -----:  |-----:  | :----:  |--- |-----|
| downList  | 需要设置倒计时的对象或者json数组 |Array/Object  |  无  |是|旧|


## 相关事件/函数

| 事件       | 作用     |返回值类型    | 参数值 |必填 |
| --------   | -----:  |-----:  | :----:  |--- |
| setHight   | 设置高度 |Number|  无  |否|
| success    | 处理结束后的回调 | void |   返回处理后的数据源（downList） 和高度值    |需要 时间通过这个显示倒计时 |

引入方法参考上面（数据源需要adStartDate 、adEndDate 和 isStart 三个属性 分别代表开始时间 结束时间 和是否开始--isStart为0或1 ）

效果展示：
 
 <p><image src="https://github.com/ten-ken/image/blob/master/relate_img/down-time.png?raw=true"/></p>


