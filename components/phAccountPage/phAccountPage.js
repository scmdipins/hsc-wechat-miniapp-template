// components/phAccountPage/phAccountPage.js
var arr = [];

Component({

  data: {
    params : {
      profilePhoto : {
        "txtValue": "Profile phote",
        "txtColor": null,
        "urlValue": "/pages/my404/my404",
        "photoValue": "/images/head@3x.png"
      },
      userName : {
        "txtValue": "User name",
        "txtColor": null,
        "urlValue": "/pages/my404/my404",
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
    if (jo.ProfilePhoto.photoValue == null) {
      jo.ProfilePhoto.photoValue = '/images/head@3x.png';
    }
    if (jo.UserName.maxLength == null) {
      jo.UserName.maxLength = 50;
    }    
    this.setData({params : jo});
  },

  methods: {  

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
        }
      })   
    },

    onProfilePhoto : function () {
      var that = this;
      wx.showActionSheet({
        itemList: ['Take a photo', 'Select from album'],
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
