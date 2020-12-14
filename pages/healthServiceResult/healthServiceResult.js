// pages/healthServiceResult/healthServiceResult.js
var orderTabsData = require("../../datas/healthOrderTabs.data")
var serviceResultData = require("../../datas/healthServiceResult.data")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderTabsModal: null,
    serviceResultModal: null,
    yjIndex: 1,
    showReason: false,

    checkRadio: true,
    reasonValue: false,
    newOrderNumber: false,
    // signatureValue: false,

    content3:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var content= JSON.parse(decodeURIComponent(options.content));
   
    this.setData({
      content3:content,
      index:options.index,
      order:options.order,
      orderTabsModal: orderTabsData.orderTabsData,
      serviceResultModal: serviceResultData.serviceResultData,
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

  radioChange: function (event) {
    let value = event.detail.value;
    if (value == 0) {
      this.setData({
        yjIndex: event.detail.value,
        checkRadio: false,
        showReason: true
      })
    } else
      this.setData({
        checkRadio: true,
        yjIndex: event.detail.value,
        showReason: false
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


  checkReason: function (e) {
    let inputValue = e.detail.value
    if (inputValue) {
      this.setData({
        reasonValue: true,
        checkRadio: this.data.newOrderNumber
      })
    } else
      this.setData({
        reasonValue: false,
        checkRadio: false
      })
  },


  checkOrderNumber: function (e) {
    let inputValue = e.detail.value
    if (inputValue) {
      this.setData({
        newOrderNumber: true,
        checkRadio:this.data.reasonValue
      })
    } else
      this.setData({
        newOrderNumber: false,
        checkRadio: false
      })
  },

  jumpUserAgree:function(){
    var index = this.data.index
    var order = this.data.order

    var content={
      orderServiceInput1:this.data.content3.orderServiceInput1,
      orderServiceInput2: this.data.content3.orderServiceInput2,
      orderServiceissue:this.data.content3.orderServiceissue,
      orderServicesolution:this.data.content3.orderServicesolution,

      orderTimeValue1:this.data.content3.orderTimeValue1,
      orderTimeDateValue:this.data.content3.orderTimeDateValue,
      orderTimeStartValue:this.data.content3.orderTimeStartValue,
      orderTimeEndValue:this.data.content3.orderTimeEndValue,
      orderTimechooseManHour:this.data.content3.orderTimechooseManHour,
      orderTimechooseDateService:this.data.content3.orderTimechooseDateService,
      orderTimechooseStart:this.data.content3.orderTimechooseStart,
      orderTimechooseEnd:this.data.content3.orderTimechooseEnd,

      resultyjIndex:this.data.yjIndex,
      resultshowReason:this.data.showReason,
      resultcheckRadio:this.data.checkRadio,
      resultreasonValue:this.data.reasonValue,
      resultnewOrderNumber:this.data.newOrderNumber,
    }

    wx.navigateTo({
      url: '/pages/healthUserAgree/healthUserAgree?index=' + index + '&order=' +order+'&content='+ encodeURIComponent(JSON.stringify(content)),
    })
  }

})