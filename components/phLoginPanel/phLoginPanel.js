// components/phLoginPanel/phLoginPanel.js

const app = getApp();

Component({

  data: {
    params : {
      imgValue: "/images/head@3x.png",
      txtValue: "Login",
      txtColor: null,
      tipValue: "Click to sign up/login",
      tipColor: null,
      urlBeforeLogin: "/pages/my404/my404",
      urlAfterLogin: "/pages/mypage/mypage"      
    }
  },

  attached: function () {
    console.log('[phLoginPanel] attached, this.dataset.params = ', this.dataset.params);
    this.setData({params : this.dataset.params});
  },

  methods: {
    onTap : function () {
      console.log('[phLoginPanel] onTap, this.data.params = ', this.data.params);
      if (!app.globalData.isLogin) {
        if (this.data.params.urlBeforeLogin) {
          wx.navigateTo({
            url: this.data.params.urlBeforeLogin,
          })
        }
      } else {
        if (this.data.params.urlAfterLogin) {
          wx.navigateTo({
            url: this.data.params.urlAfterLogin,
          })
        }        
      }

    }
  }
})
