// pages/account/account.js

var accountConsts = require("../../datas/account.data.js")

Page({

  data: {
    AccountConsts: accountConsts.AccountConsts
  },

  onShow: function(){
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },  

})