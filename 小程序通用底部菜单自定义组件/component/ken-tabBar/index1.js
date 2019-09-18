Component({

  behaviors: [],

  properties: {
    selectInd: { // 当前选项
      type: Number,
      value: 0
    },
    zIndex: {//底部菜单层级设置
      type: Number,
      value: 9
    },
    list: {//底部菜单数据
      type: Array,
      value: []
    },
    textColorDefault: {//未选择字体颜色
      type: String,
      value: 'defalut'
    },
    textColorSelect: {//被选中的字体颜色
      type: String,
      value: 'selected'
    },
    bgColor: {//底部菜单背景颜色
      type: String
    },
    stopSkip: {//是否跳转url
      type: Boolean,
      value: false
    },
    badgeBg: {//徽章背景颜色
      type: String,
      value: 'red'
    },
    badgeCl: {//徽章文字颜色
      type: String,
      value: ''
    }
  },

  data: {
    selectInd: 0,
    zIndex: 9,
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {

    },
    hide: function () {

    },
    resize: function () {

    },
  },

  methods: {
    _switchTab(eve) {
      let ind = eve.currentTarget.dataset.index;
      let url = eve.currentTarget.dataset.url;

      if (ind === this.data.selectInd) {
        return;
      }
      this.setData({
        selectInd: ind
      })

      this.triggerEvent('change', { index: ind, item: this.data.list[ind] });
      console.log(url);
      //禁止跳转
      if (this.properties.stopSkip) {
        return;
      }
      wx.reLaunch({
        url: url,
      })
    }
  }

})
