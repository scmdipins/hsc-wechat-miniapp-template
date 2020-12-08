// pages/healthWorkOrder/healthWorkOrder.js
var healthItemsData = require("../../datas/healthItems.data")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    healthOrderModal: null,
    index:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      index:options.index
    })
    if (options.order) {
      var order = JSON.parse(decodeURIComponent(options.order))
      this.setData({
        healthOrderModal: order
      })
    }
    
    console.log(this.data.healthOrderModal)
    // debugger
    // console.log("itemIndex:",index)
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


  accpetGoing: function () {
    var order =  this.data.healthOrderModal
    order.status = 'pending'
    var index = this.data.index

    wx.navigateTo({
      url: '/pages/healthHome/healthHome?index=' + index + '&order=' + encodeURIComponent(JSON.stringify(order))
    })

  },

  reject: function () {
    var order =  this.data.healthOrderModal
    order.status = null
    var index = this.data.index

    wx.navigateTo({
      url: '/pages/healthHome/healthHome?index=' + index + '&order=' + encodeURIComponent(JSON.stringify(order))
    })

  }
})