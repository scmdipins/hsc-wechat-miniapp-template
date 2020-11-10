const registerData = require("../../datas/register.data")

// components/register/register.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    registerModal: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
      dataModal:registerData.registerModalData,
      // WhetherJumpPage:null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpUserAgreement: function (event) {
      wx.navigateTo({
        url: this.data.dataModal.userAgreementPath
      })

    },

    jumpPrivacyPolicy: function (event) {
      wx.navigateTo({
        url: this.data.dataModal.privacyPolicyPath
      })
      
    },

    getPhoneNumber: function (e) {
      if (e.detail.errMsg == 'getPhoneNumber:ok') {
       wx.switchTab({
         url: this.data.dataModal.agreeWechatLoginPath,
       })
      } else {
        console.log(e.detail.errMsg);
      }
      wx.switchTab({
        url: this.data.dataModal.refusedWechatLoginPath
      });
    },


    loginByPhoneNumber:function(){
      wx.navigateTo({
        url: this.data.dataModal.phoneLoginpath,
      })
    }


  }
  
})