// pages/healthOrderTime/healthOrderTime.js
var orderTabsData = require("../../datas/healthOrderTabs.data")
var orderTimeData = require("../../datas/healthOrderTime.data")
// var pullDownData = require("../../datas/pullDown.data")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: false,
    orderTabsModal: null,
    orderTimeModal: null,
    default1: '工时描述',
    dateValue: '服务日期',
    workHour: 0,
    workMin: 0,
    startValue: null,
    endValue: null,

    checkEndTime: true,
    picker1Value: 0,
    startTime: "开始时间",
    endTime: "结束时间",
    startTimeValue: 0,
    endTimeValue: 0,
    startMinValue: 0,
    endMinValue: 0,




    chooseManHour: false,
    chooseDateService: false,
    chooseStart: false,
    chooseEnd: false,

    index: null,
    order: null,

    content2:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   var content= JSON.parse(decodeURIComponent(options.content));

    // console.log(content.orderServiceInput1)
    this.setData({
      content2:content,
      index: options.index,
      order: options.order,
      orderTabsModal: orderTabsData.orderTabsData,
      orderTimeModal: orderTimeData.orderTimeData,
    })

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },



  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      default1: name,
      select: false,
      chooseManHour: true,
    })
  },



  normalPickerBindchange: function (e) {
    this.setData({
      picker1Value: e.detail.value
    })
  },
  timePickerBindchange: function (e) {
    console.log("starttime:", e.detail.value)

    let template = e.detail.value.substr(0, 2);
    let template2 = parseInt(template);

    let tempMin = e.detail.value.substr(3, 2);
    let tempMin2 = parseInt(tempMin);
    let hours = 0;
    let mins = 0;
    if (!this.data.checkEndTime) {
      hours = this.data.endTimeValue - template2;

      if(tempMin2>this.data.endMinValue){
        mins = this.data.endMinValue +60 - tempMin2;
        hours =hours-1;
      }else{
        mins = this.data.endMinValue - tempMin2;
      }
    }




    this.setData({
      checkEndTime: false,
      chooseStart: true,
      startTime: e.detail.value,
      startTimeValue: template2,
      startMinValue: tempMin2,
      workHour: hours,
      workMin: mins,
    })

  },
  endTimePickerBindchange: function (e) {
    console.log("endtime:", e.detail.value)
    let template = e.detail.value.substr(0, 2);
    let template2 = parseInt(template);
    let hours = template2 - this.data.startTimeValue;

    let tempMin = e.detail.value.substr(3, 2);
    let tempMin2 = parseInt(tempMin);

    let mins = 0;
    if (tempMin2 < this.data.startMinValue) {
      mins=tempMin2+60-this.data.startMinValue;
      hours= hours-1;
    } else {
       mins = tempMin2 - this.data.startMinValue;
    }

    // debugger


    this.setData({
      chooseEnd: true,
      endTime: e.detail.value,
      endTimeValue: template2,
      endMinValue: tempMin2,
      workHour: hours,
      workMin: mins,
    })
    // debugger
    // console.log("min:", this.data.workMin)
  },
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value,
      chooseDateService: true,
    })
  },
  jumpServiceResult: function () {
    var index = this.data.index
    var order = this.data.order

    var content={
      orderServiceInput1:this.data.content2.orderServiceInput1,
      orderServiceInput2: this.data.content2.orderServiceInput2,
      orderServiceissue:this.data.content2.issue,
      orderServicesolution:this.data.content2.solution,

      orderTimeValue1:this.data.default1,
      orderTimeDateValue:this.data.dateValue,
      orderTimeStartValue:this.data.startTime,
      orderTimeEndValue:this.data.endTime,

      orderTimechooseManHour:this.data.chooseManHour,
      orderTimechooseDateService:this.data.chooseDateService,
      orderTimechooseStart:this.data.chooseStart,
      orderTimechooseEnd:this.data.chooseEnd,

    }

    wx.navigateTo({
      url: '/pages/healthServiceResult/healthServiceResult?index=' + index + '&order=' + order+'&content='+ encodeURIComponent(JSON.stringify(content)),
    })
  }
})