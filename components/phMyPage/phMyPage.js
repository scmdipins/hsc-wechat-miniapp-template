// components/phMyPage/phMyPage.js

Component({

  data: {
    params : {
      loginPanel:null,
      labelGroup:null
    }
  },

  attached: function () {
    console.log('[phMyPage] attached, this.dataset.params = ', this.dataset.params);
    this.setData({params : this.dataset.params});
  },

  methods: {

  }
})
