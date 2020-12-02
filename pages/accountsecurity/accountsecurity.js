// pages/accountsecurity.js
const globalData = getApp().globalData
Page({

  /**
   * Page initial data
   */
  data: {
    cardLines:[
      {
        "itemName":"手机号码",
        "itemStatus": globalData.phone ? globalData.phone : "未设置",
        "naviPage": "/pages/accountsecurity/phone/phone"
      },
      {
        "itemName":"修改登录密码",
        "itemStatus":"未设置",
        "naviPage": "/pages/inputVerifyCode/inputVerifyCode?navigePage=/pages/accountsecurity/password/password",
        "sendSms": true
      },
      {
        "itemName":"修改邮箱",
        "itemStatus": globalData.email ? globalData.email: "未设置",
        "naviPage": "/pages/inputVerifyCode/inputVerifyCode?navigePage=/pages/accountsecurity/mail/mail",
        "sendSms": true
      }
    ],
    cardLinesTwo:[
      {
        "itemName":"注销账号",
        "naviPage": "/pages/accountsecurity/logoff/logoff"
      }
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const data = [
      {
        "itemName":"手机号码",
        "itemStatus": globalData.phone ? globalData.phone : "未设置",
        "naviPage": "/pages/accountsecurity/phone/phone"
      },
      {
        "itemName":"修改登录密码",
        "itemStatus":"未设置",
        "naviPage": "/pages/inputVerifyCode/inputVerifyCode?navigePage=/pages/accountsecurity/password/password",
        "sendSms": true
      },
      {
        "itemName":"修改邮箱",
        "itemStatus": globalData.email ? globalData.email: "未设置",
        "naviPage": "/pages/inputVerifyCode/inputVerifyCode?navigePage=/pages/accountsecurity/mail/mail",
        "sendSms": true
      }
    ]
    this.setData({cardLines: data});
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

  }
})