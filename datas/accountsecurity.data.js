const cardLines = [
  {
    "itemName":"手机号码",
    "itemStatus": "未设置",
    "naviPage": "/pages/accountsecurity/phone/phone"
  },
  {
    "itemName":"修改登录密码",
    "itemStatus":"未设置",
    "naviPage": "/pages/inputVerifyCode/inputVerifyCode?navigePage=/pages/accountsecurity/password/password",
    "sendSms": true
  },
  {
    "itemName":"修改邮箱",
    "itemStatus": "未设置",
    "naviPage": "/pages/inputVerifyCode/inputVerifyCode?navigePage=/pages/accountsecurity/mail/mail",
    "sendSms": true
  }
]
const cardLineSecs = [
  {
    "itemName":"注销账号",
    "naviPage": "/pages/accountsecurity/logoff/logoff"
  }
]

module.exports = {
  cardLines: cardLines,
  cardLineSecs: cardLineSecs
}