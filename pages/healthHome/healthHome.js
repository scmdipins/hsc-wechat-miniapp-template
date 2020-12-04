// pages/healthHome/healthHome.js
var healthTabsData = require("../../datas/healthTabs.data")
var healthItemsData = require("../../datas/healthItems.data")
var healthItemsPendingData = require("../../datas/healthItemsPending.data")
var healthItemsDoneData = require("../../datas/healthItemsDone.data")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    healthTabsModal:null,
    tabs:[],
    healthItemsModal:null,
    healthItemsPendingModal:null,
    healthItemsDoneModal:null,
    itemList:[],
    itemListPending:[],
    itemListDone:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      healthTabsModal:healthTabsData.healthTabsData,
      tabs:healthTabsData.healthTabsData.tabs,
      healthItemsModal:healthItemsData.healthItemsData,
      healthItemsPendingModal:healthItemsPendingData.healthItemsPendingData,
      healthItemsDoneModal:healthItemsDoneData.healthItemsDoneData,
      itemList:healthItemsData.healthItemsData.itemList,
      itemListPending:healthItemsPendingData.healthItemsPendingData.itemList,
      itemListDone:healthItemsDoneData.healthItemsDoneData.itemList,
    })
    if (options.index) {
      this.setData({
        index:options.index
      })
      if (options.order) {
        var order = JSON.parse(decodeURIComponent(options.order))
        this.data.healthItemsModal.itemList.splice(this.data.index, 1)
        if ('pending' == order.status) {
         this.data.healthItemsPendingModal.itemList.push(order)
         // tabs
         let {tabs} =  this.data;
        tabs.forEach((v,i)=> i===1?v.isActive=true:v.isActive=false);
        this.setData({
          tabs:tabs
        });
         this.setData({
           itemList: this.data.healthItemsModal.itemList,
           itemListPending:this.data.healthItemsPendingModal.itemList
         })
         
        } else {
          this.setData({
            itemList: this.data.healthItemsModal.itemList
          })
        }

      }
    }
    

    console.log("---tabs:",this.data.tabs);
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

  
  handItemChange(e){
    
    // 接收传递过来的参数
    const {index} = e.detail;
      let {tabs} =  this.data;
       //数组循环
        //   给每一个循环项 选中属性 改为false 
       //    就给当前索引的项 添加激活选中效果就可以了
      // 数组循环 forEach 遍历数组时, 修改了 v 会导致源数组被修改
      tabs.forEach((v,i)=> i===index?v.isActive=true:v.isActive=false);
      this.setData({
        tabs:tabs
      });

  },

  viewWorkOrder:function(e){
    // debugger
      var index = e.detail.index
      var order = e.detail.obj
    wx.navigateTo({
      url: '/pages/healthWorkOrder/healthWorkOrder?index='+index+'&order='+encodeURIComponent(JSON.stringify(order))
    })
  }

})