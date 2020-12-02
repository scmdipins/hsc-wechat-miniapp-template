// components/healthComponents/healthItems/healthItems.js
const healthItemsData = require("../../../datas/healthItems.data")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    healthItemsModal:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    
    viewWorkOrder:function(){
      wx.navigateTo({
        url: '/pages/healthWorkOrder/healthWorkOrder',
      })


    }


  }
})
