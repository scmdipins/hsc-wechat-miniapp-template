// pages/accountsecurity/logoff/logoff.js
const logData = require("../../../datas/logoff.data.js")
const hsc = getApp().hsc
Page({

  /**
   * Page initial data
   */
  data: {
    buttonColor: logData.data.saveButtonColor,
    rights: logData.data.rights,
    conditions: logData.data.conditions,
    comment: logData.data.comment
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  logOff: function() {
    const obj = {
      url: 'hsc/template/user/logoff',
      method: 'POST'
    }
    hsc.request(obj).then(res => {
      if(res.statusCode == 200){
        getApp().globalData.isLogin = false;
        getApp().globalData.phone = null;
        getApp().globalData.name = null;
        getApp().globalData.mail = null;
        getApp().globalData.image = null;
        
        wx.switchTab({
          url: '/pages/mypage/mypage',
          success: function (e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          }
        })
      }
    }).catch(res => {
      console.log(res.errMsg)
    })
  }
})