// pages/root/root.js
var rootData = require("../../datas/root.data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

    selectedItem: null,
    tabBar: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({tabBar: rootData.tabBarData});
    if (options.index) {
      var index = options.index;
      this.selectItem(this.data.tabBar.list[index]);      
    } else {
      this.selectItem(this.data.tabBar.list[0]);      
    }
    // foodRecordStore.clearCachedRecords({});
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

  itemTaped: function (event) {
    var item = event.currentTarget.dataset.item;
    this.selectItem(item);
    console.log(event.index);
  },

  selectItem: function(object) {
    if (this.data.selectedItem == null || object.pagePath !== this.data.selectedItem.pagePath) {
      this.setData({ "selectedItem": object });
      wx.setNavigationBarTitle({ title: object.naviTitle });
    }
  }
});