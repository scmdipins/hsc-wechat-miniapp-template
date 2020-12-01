// components/phLine/phLine.js
Component({
  
  data: {
    params : {
      heightValue : '1px',
      colorValue : '#dddddd'
    }
  },

  attached: function () {
    if (!this.dataset.params) {
      return;
    }    
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
      jo.colorValue = '#dddddd';
    }
    this.setData({params : jo});
  },

  methods: {
    onTap : function () {
      console.log('[phLine] onTap, this.data.params = ', this.data.params);
    }
  }
})