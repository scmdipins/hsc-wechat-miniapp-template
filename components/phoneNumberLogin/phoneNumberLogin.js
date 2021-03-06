// components/phoneNumberLogin/phoneNumberLogin.js
const phoneLoginData = require("../../datas/phoneNumber.data")
const hsc = getApp().hsc
var countDownInterval
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    phoneLoginModal: Object
  },



  /**
   * 组件的初始数据
   */
  data: {
    codeBtnDisabled: true,
    inputed: false,
    checked: false,
    phoneValid: false,
    codeValid: false,
    phoneNum: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputPhoneNum: function (e) {
      let phoneNum = e.detail.value
      this.checkValid(phoneNum)
      this.setData({phoneNum: phoneNum});
    },

    checkValid: function (phoneNum) {
      let checkedNum = false;
      if (phoneNum.length === 11) {
        checkedNum = this.checkPhoneNum(phoneNum)
        if (checkedNum) {
          this.setData({
            phoneNum: phoneNum,

            phoneValid: true,
            inputed: true
          })

        }
      } else {
        this.setData({
          phoneNum: '',
          // codeBtnDisabled: true,
          phoneValid: false,
          inputed: false
        })
      }
      this.setData({
        // true grey

        codeBtnDisabled: !checkedNum || !this.data.checked
      })
    },

    checkPhoneNum: function (phoneNum) {
      let str = /^1\d{10}$/
      if (str.test(phoneNum)) {
        return true
      } else {
        wx.showToast({
          title: '手机号不正确',
          icon: 'none',
          duration: 2000
        })
        return false
      }
    },
    getCode: function () {
        const phone = this.data.phoneNum;
        const phoneInfo= {
          phone: phone
        }
        const obj = {
          url: 'hsc/template/user',
          method: 'POST',
          data: phoneInfo
        }
        hsc.request(obj).then(res => {
          if(res.statusCode == 200){
            wx.navigateTo({
              url: this.data.phoneLoginModal.inputVerifyCodePath+'?key='+res.data.key + '&navigePage=/pages/mypage/mypage&apiUrl=hsc/template/user/activation&phone='+phone,
            })
          }
        }).catch(res => {
          console.log(res.errMsg)
        })
    },


    switchCheck: function () {
      this.setData({
        checked: !this.data.checked
      })
      let inputed = this.data.inputed
      if (inputed) {
        this.setData({
          codeBtnDisabled: !this.data.checked
        })
      }
    },



    jumpUserAgreement: function (event) {
      wx.navigateTo({
        url: this.data.phoneLoginModal.userAgreementPath
      })

    },

    jumpPrivacyPolicy: function (event) {
      wx.navigateTo({
        url: this.data.phoneLoginModal.privacyPolicyPath
      })
    },

    inputPlateNumber(e) {
      var tempV = new Array()
      var value = e.detail.value
      for (var i = 0; i < value.length; i++) {
        tempV[i] = value.substring(i, i + 1)
      }
      this.setData({
        plateNumber: tempV,
        btnUsability: tempV.length == 6
      })
    },


  }
})