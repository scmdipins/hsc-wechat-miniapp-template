// components/phButton/phButton.js
Component({

  data: {
    params : {
      txtValue : '<phButton>',
      txtColor : null,
      bgColor : null
    }
  },

  attached: function () {
    console.log('[phButton] attached, this.dataset.params = ', this.dataset.params);
    if ('string' === typeof this.dataset.params) {
      var jo = JSON.parse(this.dataset.params);
    } else {
      var sTemp = JSON.stringify(this.dataset.params);        
      var jo = JSON.parse(sTemp);
    }      
    if (jo.txtValue == null) {
      jo.txtValue = '<phButton>';
    }
    this.setData({params : jo});
  },

  methods: {
    onTap : function () {
      console.log('[phButton] onTap, this.data.params = ', this.data.params);
      if (this.data.params.urlValue) {
        wx.navigateTo({
          url: this.data.params.urlValue,
        })
      }
    }
  }
})