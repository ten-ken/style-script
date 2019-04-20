## 前言
本仓库放置的是java的工具类或者相关插件
## 交流
		  

## RegUtils.java
顾名思义就是java的正则表达式的工具类
```
    /**
     * 功能描述: 正则表达的设置
     * @param reg  正则
     * @param str  匹配的字符串
     * @return: java.util.regex.Matcher
     * @author: swc
     * @date: 2019/2/14 0014 下午 16:14
    */
    public static Matcher setPublicConfig(String reg, String str) {
        Pattern pattern=Pattern.compile(reg);
        Matcher matcher= pattern.matcher(str);
        return  matcher;
    }
```
## tableSerialize.js :序列化-封装搜索区或者table内输入框下拉框内容的小插件 
```
  var tables = $("#listTable").serializeTable({'bind': { able: false}});//封装格式化 多table部分  
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
			  

