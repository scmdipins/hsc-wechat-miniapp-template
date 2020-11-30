// components/phAccountPage/phAccountPage.js
const app = getApp()
const hsc = getApp().hsc
var SignDatas = require('../../utils/signature-ali.js').SignDatas;

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

    uploadImageToOSSCredential : function(tempFilePaths, url) {
      console.log('uploadImageToOSSCredential tempFilePaths', tempFilePaths);
      console.log('uploadImageToOSSCredential url', url);
      var fs = wx.getFileSystemManager();
      fs.readFile({
        filePath: tempFilePaths,
        success(res) {
          console.log('readFile success res', res);
          wx.request({
            url: url,
            method: 'PUT',
            header: {
              'content-type': 'application/octet-stream'
            },
            data: res.data,
            success: (res) => {
              console.log('uploadImageToOSSCredential success : ', res);
            },
            fail: (res) => {
              console.log('uploadImageToOSSCredential fail : ', res);
            }
          })
        },
        fail(res) {
          console.log('readFile fail res', res);
        }
      })
    },

    uploadImg : function(tempFilePaths) {
      console.log('tempFilePaths', tempFilePaths);
      var that = this;
      var urlHost = app.globalData.ossHostUrl;
      var urlPath = app.globalData.ossPresignedUrl;
      var requestData = {
        'objectPath':'11111.jpg',
        'action':'put'
      };
      var signDatas = new SignDatas(urlPath, requestData);
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
          console.log('uploadImg success res.data', res.data);
          var content = res.data['content'];
          if (content) {
            var url = content['url'];
            that.uploadImageToOSSCredential(tempFilePaths, url);
          }
        },
        fail(res) {
          console.log('uploadImg fail res', res.data);
        }
      });
    },

    chooseImage : function(byCamera) {
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'], // ['original', 'compressed'],
        sourceType: byCamera ? ['camera'] : ['album'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths[0];
          var photoValue = 'params.profilePhoto.photoValue';
          that.setData({[photoValue]: tempFilePaths});
          // upload to oss
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
      console.log(e.detail.value);
      console.log('[phAccountPage] onUserNameBlur, e = ', e);
      const params = {
        name: e.detail.value
      }
      const obj = {
        url: 'hsc/template/user/name',
        method: 'POST',
        data: params
      }
      hsc.request(obj).then(res => {
        if(res.statusCode == 200){
          getApp().globalData.name= res.data.name;
          wx.switchTab({
            url: '/pages/mypage/mypage',
          })
        }
      }).catch(res => {
        console.log(res.errMsg)
      })
    },     

  }  
})
