// components/phMyPage/phMyPage.js

Component({

  data: {
    params : {
      loginPanel : {
        "imgValue": "/images/head@3x.png",
        "txtValue": "Login",
        "txtColor": "#000000",
        "tipValue": "Click to sign up/login",
        "tipColor": "#7c7c7c",
        "urlBeforeLogin": "/pages/my404/my404",
        "urlAfterLogin": "/pages/accountpage/accountpage"
      },
      labelGroup : [
        {
          "imgValue": "/images/seting@3x.png",
          "txtValue": "Settings",
          "txtColor": null,
          "urlValue": "/pages/settingpage/settingpage"
        },
        {
          "imgValue": "/images/more@3x.png",
          "txtValue": "More",
          "txtColor": null,
          "urlValue": "/pages/my404/my404"
        }
      ]
    }
  },

  attached: function () {
    console.log('[phMyPage] attached, this.dataset.params = ', this.dataset.params);
    this.setData({params : this.dataset.params});
  },

  methods: {

  }
})
