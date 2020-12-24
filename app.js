//app.js
var hsc = require('utils/hsc-wx-sdk.js')
var track = require('utils/hsc-wx-sdk-user.js')
App({
  onLaunch: function () {
  
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    phone: null,
    name: null,
    email: null,
    image: null,
    isLogin: false,
    userInfo: null,
    passwordStatus: false,
    ossAssetsUrl: 'https://skincubator-miniapp-prod-public.oss-cn-shanghai.aliyuncs.com/assets/',
    ossHostUrl: 'https://origin.dev.wechat.hsc.philips.com.cn',
    ossPresignedUrl: '/oss/presignedurl/skincubator-miniapp',
  },
  hsc: hsc
})