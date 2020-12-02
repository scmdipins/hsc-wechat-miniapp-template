
var tabBar = {
  selected: 0,
  color: "#c4c4c4",
  selectedColor: "#5a9ada",
  background: "white",
  list: [{
      "text": "首页",
      "naviTitle": "首页",
      "pagePath": "/pages/home/home",
      "iconPath": "/images/homehui.png",
      "selectedIconPath": "/images/home.png"
    },
    {
      "text": "我的",
      "naviTitle": "我的",
      "pagePath": "/pages/mypage/mypage",
      "iconPath": "/images/my.png",
      "selectedIconPath": "/images/myblue.png"
    }   
  ]
}
module.exports = {
  tabBarData: tabBar
}