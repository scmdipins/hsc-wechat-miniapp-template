// components/healthComponents/healthItems/healthItems.js
const healthItemsData = require("../../../datas/healthItems.data")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    healthItemsModal: Object,
    healthItemsPendingModal: Object,
    healthItemsDoneModal: Object,
    itemList: {
      type: Array,
      value: []
    },
    itemListPending:{
      type:Array,
      value:[]
    },
    itemListDone:{
      type:Array,
      value:[]
    },


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
    viewInfo: function (e) {
      this.triggerEvent("clickItem", {
        index: e.currentTarget.dataset.index,
        obj:  e.currentTarget.dataset.obj
      });
    }
  },

})

