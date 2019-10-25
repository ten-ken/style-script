
## 前言

  首先构建项目结构：
  
      ---easyui-plus
        -----css (放置的是easyui的css文件)
        -----js (此文件夹下直接放easyui-datagrid.js 根据需要引入对应的版本)
          ----easyui (备注js下文件  放在的是easyui的js文件)
        -----json (放置json文件)
<p style="height:200px"><image src="https://github.com/ten-ken/image/blob/master/relate_img/easyui-grid-structure.jpg?raw=true"/></p>



```
  var tables = $("#listTable").serializeSearch({'bind': { able: false}});//封装格式化 多table部分  
```
| 参数       | 作用   |类型    |  默认值 |必填 |
| --------   | -----:  |-----:  | :----:  |--- |
|  el  | 绑定的id |String  |   '' (例如上面的‘#listTable’)   |是|
| bind     | 绑定封装后的对象属性 |Object  |  'bind': { able: true}  |是 |
| able    | bind下的属性 | Boolean  |  true   |否 |
| filter    | 过滤不要的封装字段 | Array  |  []   |否 |



```
 ##var mains = $("#mainContent").serializeSearch({'resultType':"object"});//封装格式化 多搜索区域 将其变成url后参数或者整个对象
```
| 参数       | 作用   |类型    |  默认值 |必填 |
| --------   | -----:  |-----:  | :----:  |--- |
|  el  | 绑定的id |String  |   '' (例如上面的‘#mainContent’)   |是|
| bind     | 绑定封装后的对象属性 |Object  |  'bind': { able: true}  |否|
| able    | bind下的属性 | Boolean  |  true   |否 |
| filter    | 过滤不要的封装字段 | Array  |  []   |否 |
| resultType    | 结果类型 | Oject/String(默认)  |  实例score=100&age=10 |否 |




这个目的在于传递参数或对象时 不需要挨个$（"xx"）.val()的方式 同时也避免了form的序列化方法把一些隐藏域传入 造成不必要的麻烦。
