// pages/mypage.js

var mypageData = require("../../datas/mypage.data.js")

Page({

  data: {
    MyPageConsts: mypageData.MyPageConsts
  },

  onShow: function(){
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },  

})