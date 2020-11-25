// components/cardLine/cardLine.js
const hsc = getApp().hsc
Component({
  /**
   * Component properties
   */
  properties: {
    itemName: {
      type: String,
      value: ""
    },
    itemStatus: {
      type: String,
      value: ""
    },
    naviPage: {
      type: String,
      value: ""
    },
    sendSms: {
      type:Boolean,
      value: false
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
    navigateTap: function(e) {
      const item = e.currentTarget.dataset.url;
      if(this.data.sendSms){
        const obj = {
          url: 'hsc/template/sms/send',
          method: 'POST',
          data: {}
        }
        hsc.request(obj).then(res => {
          if(res.statusCode == 200){
            if(item){
              wx.navigateTo({
                url: item +'&key='+res.data.key,
              })
            }
          }
        }).catch(res => {
          console.log(res.errMsg)
        })
      }else{
        if(item){
          wx.navigateTo({
            url: item,
          })
        }
      }   
    }
  }
})
