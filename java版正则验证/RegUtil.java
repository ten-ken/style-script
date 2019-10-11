/******************************************************************************

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * <ul>
 * <li>Description: TODO </li>
 * <li>Copyright: Copyright (c) 2018</li>
 * <li>Company: http://www.jiangqiaotech.com/</li>
 * </ul>
 * <url>
 *     <name>Java正则表达式的语法与示例</name>
 *     <value>https://www.cnblogs.com/lzq198754/p/5780340.html</value>
 * </url>
 *
 * @author ken
 * @version 匠桥ERP系统V1.0
 * @date 2019/2/13 0013 下午 15:23
 */
public class RegUtil {

    //  [\w-] 就是匹配任意字母和符号- (减号)
    //  \. = 就是匹配符号. (点)
    // $ 代表结束 匹配输入字符串的结束位置
    //? 匹配前面的子表达式零次或一次。例如，“do(es)?”可以匹配“do”或“does”中的“do”。?等价于{0,1}。
    //+ 匹配前面的子表达式一次或多次(大于等于1次）。例如，“zo+”能匹配“zo”以及“zoo”，但不能匹配“z”。+等价于{1,}。
    //像\\s 和\\w这个之类匹配"-" 把多个结果合在一起 要用[]包裹起来  后面要加上?/+/{}这样匹配 不然就是0匹配

    /****邮箱匹配方式一**/
    public static final String emailCheckone ="^[A-Za-z0-9]+@([A-Za-z0-9]+\\.){1,2}[A-Za-z0-9]+$";//不允许有下划线
    /****邮箱匹配方式二**/
    public static final String emailChecktwo ="^\\w+@(\\w+\\.){1,2}\\w+$";//允许有下划线
    /****邮箱匹配方式三**/
    public static final String emailCheckThree ="^[0-9a-zA-Z]\\w+@\\w{2,5}\\.\\w{2,5}$";//允许有下划线,但首位不得是下划线(自己写的)

    /****身份证号匹配方式一**/
    public static final String idCardCheck="^(\\d{6})(18|19|20)?(\\d{2})([01]\\d)([0123]\\d)(\\d{3})(\\d|X|x)?$";
    //18|19|20 这部分代表是1800-1899 1900-1999 2000-2099 暂时不会用到21
    //[01]\d代表月份  缺点能匹配超过12月的月份  下面换成了0[1-9]|1[0-2]  0后面匹配1-9  1后面匹配0-2 所以范围一直在01-12月内
    //[0123]\d 代表月份中 月份  这里面 最大值可以是39 下面换成了[012]\d|3[0-1]  最大值只会是31 有一定出错概率 比这个要好多了

    /****身份证号匹配方式二**/
    public static final String idCardCheckTwo="^(\\d{6})(18|19|20)?(\\d{2})(0[1-9]|1[0-2])([012]\\d|3[0-1])(\\d{3})(\\d|X|x)?$";//自己改进的

    public static void main(String[] args) {
        String[] arr = {"1_23516@qq.com","servicexsoft@lab.net","34123162371272812","340825199312290277","14916232535",
                "123415488330","13846973380","18228842798","132288427984","1237812kjasdh","1244530741",
                "812@12","1237218","230000","1244563@qq.com","https://y.qq.com/portal/player.html",
                "https://www.cnblogs.com/xhj123/p/6032683.html","https://www.baidu.com/s?wd=%E5%93%88%E5%93%88"
        ,"8712 83 8 ","-128","0","0891","jkadshjsaghbda82716738e5t gb &#$%&*&^$%^&"};
//        Matcher matcher =setPublicConfig("[01]\\d","19");
//        System.out.println(matcher.matches());
//        String reg="^[+-]?[1-9\\d|0]+$";
//        String strs="-128";
//        Matcher matcher= setPublicConfig(reg,strs);
//        if(matcher.matches()){
//            System.out.println(strs+" 通过");
//        }


        for(String str:arr){
            if(checkEmail(str,emailCheckThree)){
                System.out.println(str+" 通过");
            }
           // System.out.println(replaceNumber(str,""));
            //System.out.println(replaceTrim(str));
        }
    }

    /**
     * 功能描述: 正则表达的设置
     * @param reg  正则
     * @param str  匹配的字符串
     * @return: java.util.regex.Matcher
     * @author: ken
     * @date: 2019/2/14 0014 下午 16:14
    */
    public static Matcher setPublicConfig(String reg, String str) {
        Pattern pattern=Pattern.compile(reg);
        Matcher matcher= pattern.matcher(str);
        return  matcher;
    }

//    /**
//     * 功能描述: 验证纯数字(无正负号)
//     * @param str
//     * @return: boolean
//     * @author: ken
//     * @date: 2019/2/13 0013 下午 15:43
//    */
//    public static boolean getChunNumber(String str){
//        String reg="\\d+";//
//        Matcher matcher=setPublicConfig(reg,str);
//        return  matcher.matches();
//    }

    /**
     * 功能描述: 邮编验证
     * @param str
     * @return: boolean
     * @author: ken
     * @date: 2019/2/13 0013 下午 15:49
    */
    public static boolean checkPostcodes(String str){
        String reg="^[1-9]\\d{5}$";//
        Matcher matcher=setPublicConfig(reg,str);
        return  matcher.matches();
    }

    /**
     * 功能描述: 汉字验证(无英文 @/&/#等特殊符号  中文逗号分号可以有)
     * @param str
     * @return: boolean
     * @author: ken
     * @date: 2019/2/13 0013 下午 15:50
    */
    public static boolean checkChineseCharacters(String str){
        String reg="^[\\u0391-\\uFFE5]+$";
        Matcher matcher=setPublicConfig(reg,str);
        return  matcher.matches();
    }

    /**
     * 功能描述: 验证qq号码
     * @param str
     * @return: boolean
     * @author: ken
     * @date: 2019/2/13 0013 下午 16:03
    */
    public static boolean checkQQ(String str){
        String reg="^[1-9]\\d{4,10}$";
        Matcher matcher=setPublicConfig(reg,str);
        return  matcher.matches();
    }

    /**
     * 功能描述: 验证邮箱
     * @param str
     * @param reg
     * @return: boolean
     * @author: ken
     * @date: 2019/2/13 0013 下午 16:27
    */
    public static boolean checkEmail(String str,String reg){
        Matcher matcher=setPublicConfig(reg,str);
        return  matcher.matches();
    }

    /**
     * 功能描述: 这部分只验证手机号码长度和正常的号段
     * @param str
     * @return: boolean
     * @author: ken
     * @date: 2019/2/13 0013 下午 16:35
    */
    public static boolean checkPhone(String str){
        String reg="^1[3-9]{1}[0-9]\\d{8}$";
        Matcher matcher=setPublicConfig(reg,str);
        return  matcher.matches();
    }

    /**
     * 功能描述: 验证身份证号
     * @param str
     * @return: boolean
     * @author: swc
     * @date: 2019/2/13 0013 下午 16:43
    */
    public static boolean idCardCheck(String str){
        Matcher matcher=setPublicConfig(idCardCheckTwo,str);
        return  matcher.matches();
    }

    /***
     * 功能描述: 验证是否是url
     * @param str
     * @return: boolean
     * @author: ken
     * @date: 2019/2/13 0013 下午 17:20
    */
    public static boolean urlCheck(String str){
        //String reg="^((http|https)://)?([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=]*)?$";
        String reg="^(http|https)://?([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=]*)?$";
        Matcher matcher=setPublicConfig(reg,str);
        return  matcher.matches();
    }

    /**
     * 功能描述: 验证是否是正整数
     * @param str
     * @return: boolean
     * @author: ken
     * @date: 2019/2/14 0014 下午 16:35
    */
    public static boolean positiveIntegerCheck(String str){
        String reg="^[1-9]{1}\\d+$";
        Matcher matcher =setPublicConfig(reg,str);
        return matcher.matches();
    }

    /**
     * 功能描述: 验证是否是数字
     * @param str
     * @return: boolean
     * @author: ken
     * @date: 2019/2/14 0014 下午 16:35
     */
    public static boolean numberCheck(String str){
        String reg="^[+-]?[1-9\\d|0]+$";
        Matcher matcher =setPublicConfig(reg,str);
        return matcher.matches();
    }


    /**
     * 功能描述: 替换字符串中空格、制表符、换页符的其中任意一个 （去内容的空格和换行）
     * @param str
     * @return: java.lang.String
     * @author: ken
     * @date: 2019/2/14 0014 下午 16:22
    */
    public static String replaceTrim(String str){
        String reg="\\s*";
        return  str.replaceAll(reg, "");
    }

    /**
     * 功能描述: 将字符串里数字替换掉
     * @param str
     * @param replace 替换后的内容
     * @return: java.lang.String
     * @author: ken
     * @date: 2019/2/14 0014 下午 16:29
    */
    public static String replaceNumber(String str,String replace){
        return str.replaceAll("\\d+",replace);
    }





}
