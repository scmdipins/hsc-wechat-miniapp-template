// pages/healthUserAgree/healthUserAgree.js
var orderTabsData = require("../../datas/healthOrderTabs.data")
var userAgreeData = require("../../datas/healthUserAgree.data")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderTabsModal: null,
    userAgreeModal: null,
    inputAgreeValue: false,
    // signatureValue: false,

    index: null,
    finishOrder: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // debugger
    var content= JSON.parse(decodeURIComponent(options.content));
    console.log(content.orderTimeValue1)
    
    this.setData({
      index: options.index,
      orderTabsModal: orderTabsData.orderTabsData,
      userAgreeModal: userAgreeData.userAgreeData,
    })

    if (options.order) {
      var order = JSON.parse(decodeURIComponent(options.order))
      this.setData({
        finishOrder: order
      })
    }

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

  },

  checkAgree: function (e) {
    let inputValue = e.detail.value
    if (inputValue) {
      this.setData({
        inputAgreeValue: true,
      })
    } else
      this.setData({
        inputAgreeValue: false
      })
  },

  // checkSignature: function (e) {
  //   let inputValue = e.detail.value
  //   if (inputValue) {
  //     this.setData({
  //       signatureValue: true,
  //     })
  //   } else
  //     this.setData({
  //       signatureValue: false
  //     })
  // },

  jumpDonePage: function () {

    var order = this.data.finishOrder
    order.status = 'done'
    var index = this.data.index

    wx.navigateTo({
      url: '/pages/healthHome/healthHome?index=' + index + '&order=' + encodeURIComponent(JSON.stringify(order)),
    })
  },


  
})