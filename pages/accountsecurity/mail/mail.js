// pages/accountsecurity/mail/mail.js
const hsc = getApp().hsc
Page({

  /**
   * Page initial data
   */
  data: {
    address:'11111111@qq.com',
    isvalid:true
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

  inputData: function(e){
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const value = e.detail.value;
    if(reg.test(value)){
      this.setData({address: value, isvalid: true});
    } else{
      this.setData({address: value, isvalid: false});
    }
  },

  saveTap: function(e){
    if(!this.data.isvalid){
      return
    }
    const params = {
      email: this.data.address
    }
    const obj = {
      url: 'hsc/template/user/email',
      method: 'POST',
      data: params
    }
    hsc.request(obj).then(res => {
      if(res.statusCode == 200){
        wx.navigateTo({
          url: '/pages/accountsecurity/accountsecurity',
        })
      }
    }).catch(res => {
      console.log(res.errMsg)
    })
  },

  skipTap: function(e){
    wx.navigateTo({
      url: '/pages/accountsecurity/accountsecurity',
    })
  }
})