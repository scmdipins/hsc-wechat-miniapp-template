// pages/accountsecurity/password/password.js
const hsc = getApp().hsc
Page({

  /**
   * Page initial data
   */
  data: {
    password:null,
    repassword:null,
    isvalid: true,
    isComplete: false
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
    // console.log(this.password);
    const _this = this;
    const value = e.detail.value;
    _this.validateData(value);
    if(_this.data.isvalid){
      _this.setData({ password:value});
    }
  },

  validateData: function(value) {
    if(value.length >= 6 && value.length <= 20){
      if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)){
        this.setData({isvalid: true});
      }else{
        this.setData({isvalid: false});
      }   
    }else{
      this.setData({isvalid: false});
    }
  },

  inputDataSec: function(e) {
    const _this = this;
    const value = e.detail.value;
    _this.validateData(value);
    if(_this.data.isvalid && value == _this.data.password){
      _this.setData({ repassword:value, isComplete: true});
    }
  },

  summitPassword: function() {
    const params = {
      password: this.data.password
    }
    const obj = {
      url: 'hsc/template/user/password',
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

  }
})