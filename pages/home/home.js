//index.js
//获取应用实例
const cardData = require("../../datas/home.data.js")
const hsc = getApp().hsc
const globalData = getApp().globalData

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cards: null
  },

  onLoad: function () {
    this.setData({cards: cardData.cards});
    const obj = {
      url: 'hsc/template/user/status',
      method: 'GET'
    }
    hsc.request(obj).then(res => {
      if(res.statusCode == 200){
        globalData.phone = res.data.phone;
        globalData.name = null;
        globalData.mail = null;
        globalData.isLogin = true;
      }
    }).catch(res => {
      console.log(res.errMsg)
    })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },

  onShow: function(){
      if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  }
})
