Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        text: "首页",
        urlPath: "/index/index",
        icon: 'icon-homefill',
      },
      {
        text: "分类",
        urlPath: "/index/index2",
        icon: 'icon-similar',
        badge: 'New'
      },
      {
        text: "发布",//文本内容
        urlPath: "/index/index3",//跳转路径
        // badge: '99+',//colorUi里面的图标值 ---非必须项
        icon: 'icon-add',//colorUi里面的图标值
        action: true, //是否凸显  ---非必须项
        bgColor: 'green'//该部分背景颜色 ---非必须项
      },
      {
        text: "购物车",
        urlPath: "/index/index3",
        badge: '99+',
        icon: 'icon-cart'
      },
      {
        text: "我的",//文本内容
        urlPath: "/index/index3",//跳转路径
        badge: '99+',//colorUi里面的图标值
        icon: 'icon-my' //colorUi里面的图标值
      }
    ]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  tabChangeE: function(eve) {
    console.log(eve);
    console.log(eve.detail);

  }

})