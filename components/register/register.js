const registerData = require("../../datas/register.data")
const hsc = getApp().hsc
const globalData = getApp().globalData
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

    getPhoneNumber(e) {
      if(e.detail.iv && e.detail.encryptedData){
        var phoneInfo= {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        }
        var obj = {
          url: 'hsc/template/user',
          method: 'POST',
          data: phoneInfo
        }
        hsc.request(obj).then(res => {
          if(res.statusCode == 200){
            globalData.phone = res.data.phone;
            globalData.name = res.data.name;
            globalData.isLogin = true;
            wx.switchTab({
              url: '/pages/mypage/mypage',
              success: function (e) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            })
          }
        }).catch(res => {
          console.log(res.errMsg)
        })
      
      }
    },

    loginByPhoneNumber:function(){
      wx.navigateTo({
        url: this.data.dataModal.phoneLoginpath,
      })
    }


  }
  
})