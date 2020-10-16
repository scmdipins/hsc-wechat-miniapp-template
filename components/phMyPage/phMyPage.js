// components/phMyPage/phMyPage.js

Component({

  data: {
    LoginPanel:null,
    LabelGroup:null
  },

  attached: function () {
    console.log('[phMyPage] attached, this.dataset.params = ', this.dataset.params, typeof this.dataset.params);
    if (this.dataset.params) {
      if ("string" === typeof this.dataset.params) {
        var jo = JSON.parse(this.dataset.params);
      } else {
        var sTemp = JSON.stringify(this.dataset.params);        
        var jo = JSON.parse(sTemp);
      }      
      if (jo.LoginPanel) {
        this.setData({LoginPanel: jo.LoginPanel});
      }
      if (jo.LabelGroup) {
        this.setData({LabelGroup: jo.LabelGroup});
      }
    }
  },

  methods: {

  }
})
