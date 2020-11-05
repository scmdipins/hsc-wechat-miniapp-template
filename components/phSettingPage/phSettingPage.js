// components/phSettingPage/phSettingPage.js

Component({

  data: {
    params : {
      privacyPolicy:null,
      userAgreement:null,
      version:null,
      logoutButton:null
    }
  },

  attached: function () {
    console.log('[phSettingPage] attached, this.dataset.params = ', this.dataset.params);
    this.setData({params : this.dataset.params});
  },

  methods: {

  }
})
