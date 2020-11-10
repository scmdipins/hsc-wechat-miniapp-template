// components/phLabelItem/phLabelItem.js
Component({

  data: {
    params : {
      imgValue : null,
      txtValue : '<phLabelItem>',
      txtColor : null,
      urlValue : null
    }
  },

  attached: function () {
    console.log('[phLabelItem] attached, this.dataset.params = ', this.dataset.params);
    if (!this.dataset.params) {
      return;
    }        
    if ('string' === typeof this.dataset.params) {
      var jo = JSON.parse(this.dataset.params);
    } else {
      var sTemp = JSON.stringify(this.dataset.params);        
      var jo = JSON.parse(sTemp);
    }      
    if (jo.txtValue == null) {
      jo.txtValue = '<phLabelItem>';
    }
    this.setData({params : jo});
  },

  methods: {
    onTap : function () {
      console.log('[phLabelItem] onTap, this.data.params = ', this.data.params);
      if (this.data.params.urlValue) {
        wx.navigateTo({
          url: this.data.params.urlValue,
        })
      }
    }
  }
})