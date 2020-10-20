// components/phAccountPage/phAccountPage.js
var arr = [];

Component({

  data: {
    params : {
      ProfilePhoto : {
        "txtValue": "Profile phote",
        "txtColor": null,
        "urlValue": "/pages/my404/my404",
        "photoValue": "/images/head@3x.png"
      },
      UserName : {
        "txtValue": "User name",
        "txtColor": null,
        "urlValue": "/pages/my404/my404",
        "inputValue": "Luna",
        "maxLength": null
      },
      AccountAndSecurity : {    
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
    if (jo.ProfilePhoto.photoValue == null) {
      jo.ProfilePhoto.photoValue = '/images/head@3x.png';
    }
    if (jo.UserName.maxLength == null) {
      jo.UserName.maxLength = 50;
    }    
    this.setData({params : jo});
  },

  methods: {
    takePhoto : function() {
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          this.setData({
            src: res.tempImagePath
          })
        }
      })
    },

    upLoad:function(){
      data: {
        src: ''
      }
  
      var self = this;
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;            
          arr = arr.concat(tempFilePaths); 
          //把获取到的图片的地址（数组），赋值给data中的src。    
          self.setData({ src: arr });
        }
      }) 
    },

    onProfilePhoto : function () {
      wx.showActionSheet({
        itemList: ['Take a photo', 'Select from album'],
        success: function(res) {
          console.log(res.tapIndex);
          if (res.tapIndex == 0) {
            takePhoto();
          } else if (res.tapIndex == 1) {
            upLoad();
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
