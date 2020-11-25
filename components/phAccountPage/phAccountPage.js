// components/phAccountPage/phAccountPage.js
const app = getApp()
// const cameraService = require('../../utils/cameraService')


// require('jsbn');
// require('core-js');
// require('zlib');
// require('httpx');
// const Client = require('../../utils/aliyun-api-gateway/client');
// const client = new Client('203859798','Fbo9eLXpEePZC3I0jSatecjsx9tSvOwm');

// async function getByOssCredential() {
//   var result = await client.get('https://origin.dev.wechat.hsc.philips.com.cn/oss/presignedurl/skincubator-miniapp', {
//     query: {
//       'objectPath' : '11111.jpg',
//       'action' : 'get'
//     },
//     headers: {
//       accept: 'application/json'
//     }  
//   });
//   console.log(JSON.stringify(result));
// }

var arr = [];

Component({

  data: {
    params : {
      profilePhoto : {
        "txtValue": "Profile phote",
        "txtColor": null,
        //"urlValue": "/pages/my404/my404",
        "photoValue": "/images/head@3x.png"
      },
      userName : {
        "txtValue": "User name",
        "txtColor": null,
        //"urlValue": "/pages/my404/my404",
        "inputValue": "Luna",
        "maxLength": null
      },
      accountAndSecurity : {    
        "txtValue": "Account and security",
        "txtColor": null,
        "urlValue": "/pages/my404/my404"
      }
    }
  },

  attached: function () { 
    console.log('[phAccountPage] attached, this.dataset.params = ', this.dataset.params);
    if ('string' === typeof this.dataset.params) {
      var jo = JSON.parse(this.dataset.params);
    } else {
      var sTemp = JSON.stringify(this.dataset.params);        
      var jo = JSON.parse(sTemp);
    }      
    if (jo.profilePhoto.photoValue == null) {
      jo.profilePhoto.photoValue = '/images/head@3x.png';
    }
    if (jo.userName.maxLength == null) {
      jo.userName.maxLength = 50;
    }    
    this.setData({params : jo});
  },

  methods: {  

    uploadImg : function(tempFilePaths) {
      console.log('tempFilePaths', tempFilePaths);
      // getByOssCredential().catch(
      //   (err) => {
      //     console.error(err);
      //   }
      // );

      // cameraService.getReportId(tempFilePaths).then(res => {
      //   console.log('res = ', res);
      //   // preference.reportId = res
      //   // wx.redirectTo({
      //   //   url: '/pages/assessment/hydration/hydration?nextPreference=' + encodeURIComponent(JSON.stringify(preference))
      //   // })   
      // })
    },

    chooseImage : function(byCamera) {
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'], // ['original', 'compressed'],
        sourceType: byCamera ? ['camera'] : ['album'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
          var photoValue = 'params.profilePhoto.photoValue';
          that.setData({[photoValue]: tempFilePaths});
          // upload oss
          that.uploadImg(tempFilePaths);
        }
      })   
    },

    onProfilePhoto : function () {
      var that = this;
      wx.showActionSheet({
        itemList: ['拍照', '从手机相册选择'],
        success: function(res) {
          console.log(res.tapIndex);
          if (res.tapIndex == 0) {
            that.chooseImage(true);
          } else if (res.tapIndex == 1) {
            that.chooseImage(false);
          }
        },
        fail: function(res) {
          console.log(res.errMsg)
        }
      })
    },
    error(e) {
      console.log(e.detail)
    },    
    onTap : function () {
      console.log('[phAccountPage] onTap, this.data.params = ', this.data.params);
    },
    onUserNameFocus : function (e) {
      console.log('[phAccountPage] onUserNameFocus, e = ', e);
    },    
    onUserNameBlur : function (e) {
      console.log('[phAccountPage] onUserNameBlur, e = ', e);
    },     

  }  
})
