// pages/mypage.js

const mypageData = require("../../datas/mypage.data.js")
const globalData = getApp().globalData;
const oss = require('../../utils/oss-credential.js');
var lastImageurl;

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
    if ((globalData.name != null) && (globalData.name != this.data.txtValue)) {
      this.setData({txtValue : globalData.name});
    }    
    if ((globalData.phone != null) && (globalData.phone != this.data.tipValue)) {
      this.setData({tipValue: globalData.phone});
    }
    if ((globalData.image != null) && (globalData.image != lastImageurl)) {
      oss.getRealImageUrlFromOSS(globalData.image).then(res => {
        this.setData({imgValue: res});
        lastImageurl = res;
      }).catch(res => {
        console.log('Fail getRealImageUrlFromOSS = ' + res);
      });
    }
  }, 

})
