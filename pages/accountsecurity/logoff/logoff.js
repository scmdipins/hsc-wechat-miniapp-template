// pages/accountsecurity/logoff/logoff.js
const logData = require("../../../datas/logoff.data.js")
const hsc = getApp().hsc
Page({

  /**
   * Page initial data
   */
  data: {
    // rights:[
    //   "您将无法再次使用该账户登录飞利浦之家，您的账户内所有历史记录信息无法再次找回，账户内所获得的任何优惠待遇和优惠券都将作废。",
    //   "线上系统将无法处理因历史交易产生的退换货、维保和与之相关的资金退回等。您需要联系飞利浦在当地的售后服务中心提供纸质的发票原件以享受退换货和维保。"
    // ],
    // conditions: [
    //   "该账户应当是您本人注册的飞利浦之家账户，且该账户处于正常状态。",
    //   "该账户处于正常状态，无未完成的交易、未处理完毕的投诉纠纷或售后服务请求，无未结清的退回资金或拖欠款项。"
    // ],
    // comment: [
    //   {
    //     "text":"注销前，请充份阅读并理解",
    //     "page":"",
    //     "color":""
    //   },
    //   {
    //     "text":"《飞利浦之家用户协议》",
    //     "page":"/pages/my404/my404",
    //     "color":"#5a9ada"
    //   },
    //   {
    //     "text":"和",
    //     "page":"",
    //     "color":""
    //   },
    //   {
    //     "text":"《飞利浦之家隐私政策》",
    //     "page":"/pages/my404/my404",
    //     "color":"#5a9ada"
    //   },      
    //   {
    //     "text":"中相关条款并符合其中规定的所有其他注销条件和条款。",
    //     "page":"",
    //     "color":""
    //   }
    // ]
    rights: logData.data.rights,
    conditions: logData.data.conditions,
    comment: logData.data.comment
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // this.setData({ rights: logData.rights,
    //                conditions: logData.conditions,
    //                comment: logData.comment});
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  logOff: function() {
    const obj = {
      url: 'hsc/template/user/logoff',
      method: 'POST'
    }
    hsc.request(obj).then(res => {
      if(res.statusCode == 200){
        getApp().globalData.isLogin = false;
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
    }).catch(res => {
      console.log(res.errMsg)
    })
  }
})