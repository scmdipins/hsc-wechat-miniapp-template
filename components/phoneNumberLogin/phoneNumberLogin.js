// components/phoneNumberLogin/phoneNumberLogin.js
const phoneLoginData = require("../../datas/phoneNumber.data")
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
    countingDown: false,
    inputVerifyCode: true,
    codeBtnDisabled: true,
    inputed: false,
    time: 60,
    checked: false,
    phoneValid: false,
    codeValid: false,
    plateNumber: [],
    btnUsability: false

  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputPhoneNum: function (e) {
      let phoneNum = e.detail.value
      this.checkValid(phoneNum)
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

      this.setData({
          inputVerifyCode: false,
          countingDown: true,
          time: 60
        }),
        this.startCount()

    },

    startCount() {
      var that = this
      let time = that.data.time
      countDownInterval = setInterval(function () {
        if (time <= 0) {
          clearInterval(countDownInterval)
          that.checkValid(that.data.phoneNum)
          that.setData({
            countingDown: false
          })
          that.inputPhoneNum()
        } else {
          time--
          that.setData({
            time: time
          })
        }
      }, 1000)
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

    loginRegister() {
      wx.switchTab({
        url: this.data.phoneLoginModal.loginSuccess,
      })
    }
  }
})