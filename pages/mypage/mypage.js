// pages/mypage.js

const mypageData = require("../../datas/mypage.data.js")
const globalData = getApp().globalData;
const oss = require('../../utils/oss-credential.js');

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
    this.onLoad();
  }, 

  onLoad: function () {
    this.setData({txtValue: globalData.name ? globalData.name : mypageData.MyPageConsts.txtValue});
    this.setData({tipValue: globalData.phone ? globalData.phone : mypageData.MyPageConsts.tipValue});
    if (!globalData.image) {
      this.setData({imgValue : mypageData.MyPageConsts.imgValue});
    } else {
      oss.getRealImageUrlFromOSS(globalData.image).then(res => {
        this.setData({imgValue: res});
      }).catch(res => {
        console.log('Fail getRealImageUrlFromOSS = ' + res);
      });
    }
  }  

})
