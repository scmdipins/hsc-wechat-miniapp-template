// pages/mypage.js

var mypageData = require("../../datas/mypage.data.js")
const app = getApp();
var xca = require('../../utils/x-ca-signature.js');

Page({

  data: {
    imgValue: mypageData.MyPageConsts.imgValue,
    txtValue: mypageData.MyPageConsts.txtValue,
    txtColor: mypageData.MyPageConsts.txtColor,
    tipValue: mypageData.MyPageConsts.tipValue,
    tipColor: mypageData.MyPageConsts.tipColor,
    urlBeforeLogin: mypageData.MyPageConsts.urlBeforeLogin,
    urlAfterLogin: mypageData.MyPageConsts.urlAfterLogin,
    labelGroup : mypageData.MyPageConsts.labelGroup
  },

  onShow: function(){
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  }, 
  
  onLoad: function () {
    this.setData({tipValue: getApp().globalData.phone});
    this.setData({txtValue: getApp().globalData.name ? getApp().globalData.name : '未登录'});
  },

  fakeLogin: function() {
    let bLogin = app.globalData.isLogin;
    app.globalData.isLogin = !bLogin;
    console.log('fake login ', bLogin, ' -> ', app.globalData.isLogin);
  },


})
