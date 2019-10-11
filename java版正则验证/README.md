
## RegUtils.java
顾名思义就是java的正则表达式的工具类
```
    /**  示例
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

### 此部分不再维护  写入java-wheel仓库
