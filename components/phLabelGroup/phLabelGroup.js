// components/phLabelGroup/phLabelGroup.js
Component({

  data: {
    params: [
      {
        "imgValue": null,
        "txtValue": "<phLabelGroup1>",
        "urlValue": null
      },
      {
        "imgValue": null,
        "txtValue": "<phLabelGroup2>",
        "urlValue": null
      }
    ]
  },

  attached: function () { 
    this.setData({params: this.dataset.params});
  },

  methods: {
    onTap : function () {
      console.log('[phLabelGroup] onTap, this.data.params = ', this.data.params);
    }
  }  

})
