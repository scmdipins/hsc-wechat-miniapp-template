// components/phLoginPanel/phLoginPanel.js
Component({

  data: {
    imgValue: "/images/head@3x.png",
    txtValue: "Login",
    txtColor: null,
    urlValue: null,
    tipValue: "Click to sign up/login",
    tipColor: null
  },

  attached: function () {
    console.log('[phLoginPanel] attached, this.dataset.params = ', this.dataset.params, typeof this.dataset.params);
    if (this.dataset.params) {
      if ("string" === typeof this.dataset.params) {
        var jo = JSON.parse(this.dataset.params);
      } else {
        var sTemp = JSON.stringify(this.dataset.params);        
        var jo = JSON.parse(sTemp);
      }      
      if (jo.imgValue) {
        this.setData({imgValue: jo.imgValue});
      }
      if (jo.txtValue) {
        this.setData({txtValue: jo.txtValue});
      }
      if (jo.txtColor) {
        this.setData({txtColor: jo.txtColor});        
      }
      if (jo.urlValue) {
        this.setData({urlValue: jo.urlValue});
      }
      if (jo.tipValue) {
        this.setData({tipValue: jo.tipValue});
      }
      if (jo.tipColor) {
        this.setData({tipColor: jo.tipColor});        
      }
    }
  },

  methods: {
    onTap : function () {
      console.log('[phLoginPanel] onTap, this.dataset = ', this.data);
      if (this.data.urlValue) {
        wx.navigateTo({
          url: this.data.urlValue,
        })
      }
    }
  }
})
