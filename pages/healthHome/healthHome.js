// pages/healthHome/healthHome.js
var healthTabsData = require("../../datas/healthTabs.data")
var healthItemsData = require("../../datas/healthItems.data")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    healthTabsModal:null,
    healthItemsModal:null,
    tabs:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      healthTabsModal:healthTabsData.healthTabsData,
      healthItemsModal:healthItemsData.healthItemsData,
      tabs:healthTabsData.healthTabsData.tabs
    })
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
    console.log(e)

     // 3 获取原数组,以下写法等价于 let tabs = this.data.tabs;
      // 最好的方法 let tabs = JSON.stringify(this.data.tabs);深拷贝
      
      let {tabs} =  this.data;
       //4 数组循环
        //  1 给每一个循环项 选中属性 改为false 
       //   2 就给当前索引的项 添加激活选中效果就可以了
      //4 数组循环 forEach 遍历数组时, 修改了 v 会导致源数组被修改
      tabs.forEach((v,i)=> i===index?v.isActive=true:v.isActive=false);
      this.setData({
        tabs:tabs
      });
  }

})