// components/phLabelItem/phLabelItem.js
Component({

  // properties: { 
  //  },

  data: {
    imgValue : null,
    txtValue : '<phLabelItem>',
    txtColor : null,
    urlValue : null,
  },

  attached: function () {
    console.log('[phLabelItem] attached, this.dataset.params = ', this.dataset.params, typeof this.dataset.params);
    if (this.dataset.params) {
      if ("string" === typeof this.dataset.params) {
        var jo = JSON.parse(this.dataset.params);
      } else {
        var sTemp = JSON.stringify(this.dataset.params);        
        var jo = JSON.parse(sTemp);
      }      
      // console.log('[phLabelItem] attached, jo = ', jo, typeof jo);
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
    }
  },

  // observers: {
  //   '**': function(a) {
  //     console.log('[phLabelItem] setData', a)
  //   },
  // },

  methods: {
    // myMethod: function () {
    //   console.log('[phLabelItem] myMethod')
    // },
    onTap : function () {
      console.log('[phLabelItem] onTap, this.dataset = ', this.data);
      if (this.data.urlValue) {
        wx.navigateTo({
          url: this.data.urlValue,
        })
      }
    }
  }
})