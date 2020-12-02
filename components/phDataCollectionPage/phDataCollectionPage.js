// components/phDataCollectionPage/phDataCollectionPage.js

Component({

  data: {
    params : {
      labelGroup : [
        {
          "imgValue": null,
          "txtValue": "浏览历史",
          "txtColor": null,
          "urlValue": null
        },    
        {
          "imgValue": null,
          "txtValue": "使用历史",
          "txtColor": null,
          "urlValue": null
        }
      ] 
    }
  },

  attached: function () {
    console.log('[phDataCollectionPage] attached, this.dataset.params = ', this.dataset.params);
    this.setData({params : this.dataset.params});
  },

  methods: {

  }
})
