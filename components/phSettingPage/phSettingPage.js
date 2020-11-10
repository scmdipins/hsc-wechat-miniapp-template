// components/phSettingPage/phSettingPage.js

Component({

  data: {
    params : {
      labelGroup : [
        {
          "imgValue": null,
          "txtValue": "Privacy Policy",
          "txtColor": null,
          "urlValue": "/pages/privacypolicypage/privacypolicypage",
          "versionValue": "v0.01",
          "versionColor": null,
          "hasUrlMark": true
        },
        {
          "imgValue": null,
          "txtValue": "User Agreement",
          "txtColor": null,
          "urlValue": "/pages/useragreementpage/useragreementpage",
          "versionValue": "v0.01",
          "versionColor": null,
          "hasUrlMark": true
        },
        {
          "imgValue": null,
          "txtValue": "Version",
          "txtColor": null,
          "urlValue": null,
          "versionValue": "v0.01",
          "versionColor": null,
          "hasUrlMark": false
        }
      ],
      logoutButton : {
        "txtValue": "Log out",
        "txtColor": "#FFFFFF",
        "bgColor": "#5a9ada"
      }  
    }
  },

  attached: function () {
    console.log('[phSettingPage] attached, this.dataset.params = ', this.dataset.params);
    this.setData({params : this.dataset.params});
  },

  methods: {

  }
})
