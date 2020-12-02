var app = getApp();

function sendSms(data, object) {
  app.hsc.request({
    url: 'hsc/template/sms/send',
    method: 'POST',
    data: data
  }).then(function(res) {
    object.success(res)
  }).catch(function () {
    object.fail()
  })
}

module.exports = {
  sendSms: sendSms
}