// components/phLine/phLine.js
Component({
  
  data: {
    params : {
      heightValue : '1px',
      colorValue : '#e4e4e4'
    }
  },

  attached: function () {
    console.log('[phLine] attached, this.dataset.params = ', this.dataset.params);
    if ('string' === typeof this.dataset.params) {
      var jo = JSON.parse(this.dataset.params);
    } else {
      var sTemp = JSON.stringify(this.dataset.params);        
      var jo = JSON.parse(sTemp);
    }      
    if (jo.heightValue == null) {
      jo.heightValue = '1px';
    }
    if (jo.colorValue == null) {
      jo.colorValue = '#000000';
    }
    this.setData({params : jo});
  },

  methods: {
    onTap : function () {
      console.log('[phLine] onTap, this.data.params = ', this.data.params);
    }
  }
})