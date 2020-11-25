// components/phVerifyCode/phVerifyCode.js
const verifyCodeData = require("../../datas/inputVerifyCode.data")
const hsc = getApp().hsc
var countDownInterval
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    verifyModal: Object,
    navigePage: {
      type: String,
      value: null
    },
    verificationKey: {
      type: String,
      value: null
    },
    apiUrl: {
      type: String,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    countingDown: true,
    time: 60,
    plateNumber: [],
    btnUsability: false
  },


  ready: function () {
    this.setData({
      time: this.data.verifyModal.time
    })
    this.startCount()
  },



  /**
   * 组件的方法列表
   */
  methods: {
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
    startCount() {
      var that = this
      let time = that.data.time
      countDownInterval = setInterval(function () {
        if (time <= 0) {
          clearInterval(countDownInterval)
          that.setData({
            countingDown: false
          })
        } else {
          time--
          that.setData({
            time: time
          })
        }
      }, 1000)
    },

    reSendVerifyCode() {
      this.setData({plateNumber: []});
      this.setData({
        time: this.data.verifyModal.time,
        countingDown: true
      })

      this.startCount()

    },
    loginRegister(){
      const phoneInfo= {
        code: this.data.plateNumber.join(''),
        key: this.data.verificationKey
      }
      const obj = {
        url: this.data.apiUrl ? this.data.apiUrl : 'hsc/template/sms/verification',
        method: 'POST',
        data: phoneInfo
      }
      hsc.request(obj).then(res => {
        if(res.statusCode == 200){
          if(this.data.apiUrl == 'hsc/template/user/activation'){
            getApp().globalData.isLogin = true;
            getApp().globalData.phone = phone;
          }
          // this.triggerEvent('callBack')
          wx.navigateTo({
            url: this.data.navigePage.trim(),
          }).catch(
            wx.switchTab({
              url: this.data.navigePage.trim(),
            })
          )
        }
      }).catch(res => {
        console.log(res.errMsg)
      })
    }
  }
})