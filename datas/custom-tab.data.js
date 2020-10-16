
var tabBar = {
  selected: 0,
  color: "#c4c4c4",
  selectedColor: "#5a9ada",
  list: [{
      "text": "Home",
      "naviTitle": "Home",
      "pagePath": "/pages/home/home",
      "iconPath": "/images/homehui.png",
      "selectedIconPath": "/images/home.png"
    },
    {
      "text": "My",
      "naviTitle": "My",
      "pagePath": "/pages/myselfInfo/myselfInfo",
      "iconPath": "/images/my.png",
      "selectedIconPath": "/images/myblue.png"
    },
    {
      "text": "My2",
      "naviTitle": "My2",
      "pagePath": "/pages/mypage/mypage",
      "iconPath": "/images/my.png",
      "selectedIconPath": "/images/myblue.png"
    },
    {
      "text": "Account",
      "naviTitle": "Account",
      "pagePath": "/pages/account/account",
      "iconPath": "/images/my.png",
      "selectedIconPath": "/images/myblue.png"
    }        
  ]
}
module.exports = {
  tabBarData: tabBar
}