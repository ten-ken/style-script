Component({
  data: {
    selectInd: 0,
  },
  attached() {},
  methods: {
    clickBar(eve) {
      let ind = eve.currentTarget.dataset.index;
      let url = eve.currentTarget.dataset.url;
      wx.reLaunch({
        url
      })
      this.setData({
        selectInd: parseInt(ind)
      })
    },
  }
})
