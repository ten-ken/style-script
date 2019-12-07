## 使用示例
   				 $.keyboardMove({
					el: '.keydown',//被监控的的最小单位dom的id或者class名称
					id: 'inner',//需要监控的区域id
					pId: 'out',//被监控的区域的父id
					lastEl: '.row',//这片区域的需要控制的行的dom的class属性
					keydowns: ['up-down','left-right']//默认是上下  左右  up-down代表上下键 left-right左右键
				});
				$.keyboardMove({
					el: '.keydown',
					id: 'listguige',
					pId: 'head',
					lastEl: 'tr',
					// keydowns:  ['left-right']
				});
