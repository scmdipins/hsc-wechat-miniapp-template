// pages/mypage.js

var mypageData = require("../../datas/mypage.data.js")
const app = getApp();
var xca = require('../../utils/x-ca-signature.js');

Page({

  data: {
    imgValue: mypageData.MyPageConsts.imgValue,
    txtValue: mypageData.MyPageConsts.txtValue,
    txtColor: mypageData.MyPageConsts.txtColor,
    tipValue: mypageData.MyPageConsts.tipValue,
    tipColor: mypageData.MyPageConsts.tipColor,
    urlBeforeLogin: mypageData.MyPageConsts.urlBeforeLogin,
    urlAfterLogin: mypageData.MyPageConsts.urlAfterLogin,
    labelGroup : mypageData.MyPageConsts.labelGroup
  },

  onShow: function(){
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  }, 
  
  onLoad: function () {
    this.setData({tipValue: getApp().globalData.phone});
  },

  fakeLogin: function() {
    let bLogin = app.globalData.isLogin;
    app.globalData.isLogin = !bLogin;
    console.log('fake login ', bLogin, ' -> ', app.globalData.isLogin);
  },

  testOSS: function() {
    this.setData({txtValue : 'Luna'});
    this.setData({tipValue: '1234567890'});
    // console.log('testOSS');
    var urlHost = "https://origin.dev.wechat.hsc.philips.com.cn";
    var urlPath = "/oss/presignedurl/skincubator-miniapp";
    var requestData = {
      'objectPath':'111111234.jpg',
      'action':'get'
    };
    var signDatas = new xca.SignDatas(urlPath, requestData);
    // console.log("signDatas", signDatas);
    var apiUrl = urlHost + urlPath;
    wx.request({
      url: apiUrl,
      method:'GET',
      data: requestData,
      header: {
        'Date': signDatas.date,
        'Content-MD5': signDatas.md5,
        'X-Ca-Nonce': signDatas.nonce,
        'X-Ca-Key': signDatas.appKey,
        'X-Ca-Signature': signDatas.signature,
        'X-Ca-SignatureMethod': signDatas.signatureMethod,
        'X-Ca-Signature-Headers': signDatas.signatureHeaders,
        'Content-Type': signDatas.contentType,
        'Accept': signDatas.accept
      },
      success(res) {
        // console.log('success res.data', res.data);
        var content = res.data['content'];
        if (content) {
          var url = content['url'];
          var imageUrl = content['imageUrl'];
          console.log('success url = ', url);
          console.log('success imageUrl = ', imageUrl);
        }
      },
      fail(res) {
        console.log('fail res', res.data);
      }
    });
  },

})
