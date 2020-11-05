// components/kard/kard.js
Component({
  /**
   * Component properties
   */
  properties: {
    imagePath: {
      type: String,
      value: null
    },
    mainTitle: {
      type: String,
      value:null
    },
    subTitle: {
      type: String,
      value: null
    },
    desc: {
      type: String,
      value: null
    },
    navigatePage: {
      type: String,
      value: null
    }
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    toPage: function(event){
      var item = event.currentTarget.dataset.page;
      if(item){
        wx.navigateTo({
          url: item,
        })
      }
    }
  }
})
