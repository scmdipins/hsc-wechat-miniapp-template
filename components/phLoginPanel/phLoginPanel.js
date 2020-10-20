// components/phLoginPanel/phLoginPanel.js
Component({

  data: {
    params : {
      imgValue: "/images/head@3x.png",
      txtValue: "Login",
      txtColor: null,
      urlValue: null,
      tipValue: "Click to sign up/login",
      tipColor: null
    }
  },

  attached: function () {
    console.log('[phLoginPanel] attached, this.dataset.params = ', this.dataset.params);
    this.setData({params : this.dataset.params});
  },

  methods: {
    onTap : function () {
      console.log('[phLoginPanel] onTap, this.data.params = ', this.data.params);
      if (this.data.params.urlValue) {
        wx.navigateTo({
          url: this.data.params.urlValue,
        })
      }
    }
  }
})
