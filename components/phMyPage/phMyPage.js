// components/phMyPage/phMyPage.js

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
      value: "#000000"
    },
    tipValue: {
      type: String,
      value: "Click to sign up/login"
    },
    tipColor: {
      type: String,
      value: "#7c7c7c"
    },
    urlBeforeLogin: {
      type: String,
      value: "/pages/my404/my404"
    },
    urlAfterLogin: {
      type: String,
      value: "/pages/accountpage/accountpage"
    },
    labelGroup: {
      type: Array,
      value: [
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

  methods: {

  }
})
