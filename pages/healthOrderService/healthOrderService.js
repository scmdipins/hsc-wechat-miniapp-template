var orderTabsData = require("../../datas/healthOrderTabs.data")
var orderServiceData = require("../../datas/healthOrderService.data")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderTabsModal: null,
    orderServiceModal: null,
    issue: false,
    solution: false,
    index: null,
    order: null,
    inputValue1: null,
    inputValue2: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      index: options.index,
      order: options.order,
      orderTabsModal: orderTabsData.orderTabsData,
      orderServiceModal: orderServiceData.orderServiceData,
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

  },

  checkIssue: function (e) {
    let inputIssueValue = e.detail.value
    // debugger

    if (inputIssueValue) {
      this.setData({
        issue: true,
        inputValue1: inputIssueValue,
      })
    } else
      this.setData({
        issue: false
      })
  },

  checkSolution: function (e) {
    let inputSolutionValue = e.detail.value
    if (inputSolutionValue) {
      this.setData({
        solution: true,
        inputValue2: inputSolutionValue,
      })
    } else
      this.setData({
        solution: false
      })
  },

  jumpOrderTime: function () {

    var index = this.data.index
    var order = this.data.order

    var content = {
      orderServiceInput1: this.data.inputValue1,
      orderServiceInput2: this.data.inputValue2,
      orderServiceissue:this.data.issue,
      orderServicesolution:this.data.solution,
    }
    wx.navigateTo({
      url: '/pages/healthOrderTime/healthOrderTime?index=' + index + '&order=' + order + '&content='+ encodeURIComponent(JSON.stringify(content)),
    })
  }
})