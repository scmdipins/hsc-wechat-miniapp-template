// components/phLoginPanel/phLoginPanel.js

const app = getApp();

Component({

  properties: {
    imgValue: {
      type: String,
      value: "/images/head@3x.png"
    },
    txtValue: {
      type: String,
      value: "Login"
    },
    txtColor: {
      type: String,
      value: null
    },
    tipValue: {
      type: String,
      value: "Click to sign up/login"
    },
    tipColor: {
      type: String,
      value: null
    },
    urlBeforeLogin: {
      type: String,
      value: "/pages/my404/my404"
    },
    urlAfterLogin: {
      type: String,
      value: "/pages/accountpage/accountpage"
    }
  },

  methods: {
    onTap : function () {
      console.log('[phLoginPanel] onTap, this.data = ', this.data);
      if (!app.globalData.isLogin) {
        if (this.data.urlBeforeLogin) {
          wx.navigateTo({
            url: this.data.urlBeforeLogin,
          })
        }
      } else {
        if (this.data.urlAfterLogin) {
          wx.navigateTo({
            url: this.data.urlAfterLogin,
          })
        }        
      }

    }
  }
})
