// pages/accountsecurity/phone/phone.js
const smsService = require('../../../services/smsService.js');
const hsc = getApp().hsc

Page({

  /**
   * Page initial data
   */
  data: {
    phoneNum:null,
    isvalid: false
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

  inputData: function(e) {
    const value = e.detail.value;
    if(/^1[3|4|5|7|8|9]\d{9}$/.test(value)){
      this.setData({phoneNum: value, isvalid: true});
    } else{
      this.setData({phoneNum: value, isvalid: false});
    }
  },

  getVerificationCode: function(e) {
   
    const phone = this.data.phoneNum;
    const data = {
      'phone': phone
    }
    const obj = {
      url: 'hsc/template/sms/send',
      method: 'POST',
      data: data
    }
    hsc.request(obj).then(res => {
      if(res.statusCode == 200){
        wx.navigateTo({
          url: '/pages/inputVerifyCode/inputVerifyCode?key='+ res.data.key+ '&navigePage=/pages/mypage/mypage&apiUrl=hsc/template/user/phone&phone='+phone,
        })
      }
    }).catch(res => {
      console.log(res.errMsg)
    })

  }

})