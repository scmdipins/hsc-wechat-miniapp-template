// pages/mypage.js

var mypageData = require("../../datas/mypage.data.js")
const app = getApp();

Page({

  data: {
    MyPageConsts: mypageData.MyPageConsts
  },

  onShow: function(){
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  }, 
  
  fakeLogin: function() {
    let bLogin = app.globalData.isLogin;
    app.globalData.isLogin = !bLogin;
    console.log('fake login ', bLogin, ' -> ', app.globalData.isLogin);
  }

})