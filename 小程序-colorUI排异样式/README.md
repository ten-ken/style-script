## 前言

 由于colorUI作者的css是全局引入 造成了 两个地方的css污染 ，
 
 一个是字体，使用全局性的colorUI字体 导致引入其他字体被覆盖（引入 iconV1.0.wxss即可 ，使用colorUi的样式 需要class上加上cuIcon 不然引用不了colorUi的font样式）
 
 二是input switch checkBox这几个控件的样式完全被colorUi的样式控制 不能使用默认样式(引入 ken-wxssV1.1.wxss即可 ，不使用colorUi的样式 
 需要class上加上"wx-xx-input"  其中xx部分是对应的控件名 如 wx-radio-input /wx-checkbox-input)
 
 
 
