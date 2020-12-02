// components/phAccountPage/phAccountPage.js
const hsc = getApp().hsc;
const globalData = getApp().globalData;
const oss = require('../../utils/oss-credential.js');

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
    // change user name if setted
    if (globalData.name != null) {
      jo.userName.inputValue = globalData.name;
    }
    this.setData({params : jo});
    // change photo if needed
    if (globalData.image != null) {
      oss.getRealImageUrlFromOSS(globalData.image).then(url => {
        var photoValue = 'params.profilePhoto.photoValue';
        this.setData({[photoValue]: url});        
      }).catch(res => {
        console.log('Fail getRealImageUrlFromOSS = ' + res);
      })
    }
  },

  methods: {  

    saveImageToDB : function(imageUrl) {
      const obj = {
        url: 'hsc/template/user/image',
        method: 'POST',
        data: {image: imageUrl}
      }
      hsc.request(obj).then(res => {
        if(res.statusCode == 200){
          globalData.image = imageUrl;
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 1000,
            mask:true
          })
        //   wx.navigateTo({
        //     url: '/pages/accountsecurity/accountsecurity',
        //   })
        }
      }).catch(res => {
        console.log(res.errMsg)
      })
    },

    saveNameToDB : function(newName) {
      const obj = {
        url: 'hsc/template/user/name',
        method: 'POST',
        data: {name : newName}
      }
      hsc.request(obj).then(res => {
        if(res.statusCode == 200){
          globalData.name = newName;
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 1000,
            mask:true
          })
        }
      }).catch(res => {
        console.log(res.errMsg)
      })
    },

    chooseImage : function(byCamera) {
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'], // ['original', 'compressed'],
        sourceType: byCamera ? ['camera'] : ['album'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePath = res.tempFilePaths[0];
          var photoValue = 'params.profilePhoto.photoValue';
          that.setData({[photoValue]: tempFilePath}); // change immediately, but will use real url after success of upload
          oss.uploadImageFileToOSS(tempFilePath).then(res => {
            // var imageFile = res['imageFile'];
            // var url = res['url'];
            var imageUrl = res['imageUrl'];
            that.saveImageToDB(imageUrl);
          }).catch(res => {
            console.log('Fail uploadImageToOSSCredential = ' + res);
          })
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
      // console.log('[phAccountPage] onUserNameBlur, e = ', e);
      var oldName = globalData.name;
      var newName = e.detail.value;
      if ((newName != null) && (newName != oldName)) {
        console.log('[phAccountPage] change name', oldName, ' -> ', newName);
        this.saveNameToDB(newName);
      }
    },  

  }  
})
