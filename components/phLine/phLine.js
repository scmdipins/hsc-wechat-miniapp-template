// components/phLine/phLine.js
Component({
  
  data: {
    heightValue : '1px',
    colorValue : '#e4e4e4',
  },

  attached: function () {
    console.log('[phLine] attached, this.dataset.params = ', this.dataset.params, typeof this.dataset.params);
    if (this.dataset.params) {
      if ("string" === typeof this.dataset.params) {
        var jo = JSON.parse(this.dataset.params);
      } else {
        var sTemp = JSON.stringify(this.dataset.params);        
        var jo = JSON.parse(sTemp);
      }      
      if (jo.heightValue) {
        this.setData({heightValue: jo.heightValue});
      }
      if (jo.colorValue) {
        this.setData({colorValue: jo.colorValue});
      }
    }
  },

  methods: {
    onTap : function () {
      console.log('[phLine] onTap, this.dataset = ', this.data);
    }
  }
})