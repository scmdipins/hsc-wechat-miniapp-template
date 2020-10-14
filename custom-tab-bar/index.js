var tabData = require("../datas/custom-tab.data.js");
Component({
  data: tabData.tabBarData,
  attached() {
  },

  created: function(){
    const _this = this
    const navtitle = _this.data.list[_this.data.selected].naviTitle;
    wx.setNavigationBarTitle({ title: navtitle })
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      console.log(data.index);
      wx.switchTab({url});
      wx.setNavigationBarTitle({ title: data.nav });
      this.setData({
        selected: data.index
      })
    }
  }
})