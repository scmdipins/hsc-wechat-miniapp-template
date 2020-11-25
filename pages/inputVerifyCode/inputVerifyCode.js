// pages/inputVerifyCode/inputVerifyCode.js
var verifyCodeData = require("../../datas/inputVerifyCode.data")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verifyModal: null,
    navigePage: null,
    verificationKey: null,
    apiUrl: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.navigePage){
      this.setData({ navigePage: options.navigePage });
    }
    if(options.key){
      this.setData({ verificationKey: options.key });
    }

    if(options.apiUrl){
      this.setData({ apiUrl: options.apiUrl });
    }

    this.setData({
      verifyModal: verifyCodeData.VerifyCOdeData
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})