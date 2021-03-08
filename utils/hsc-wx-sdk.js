/**
 * login request data structure
 */
var loginData = {

}

/**
 * maybe need more usage data in the future
 */
var data = {

}

var baseUrl = 'https://api-stg.philips-healthsuitechina.com.cn'
// var baseUrl = 'https://origin.www.prod.wechat.hsc.philips.com.cn'

/**
 * globalData for urls or ....
 */
var globalData = {
  apiGateWayHost: baseUrl + "/v2/wechat",
  apiBussinessHost: baseUrl,
  registerTraditionalHost: baseUrl + '/wechat/crm',
  requestRetryFirstDelay: 1e3,
}

/**
 * keys may need to store in the storage
 */
var t, storageKeys = {
  appId: "hsc_appid",
  idToken: "hsc_idToken",
  key: "hsc_key",
  uuid: "hsc_uuid",
  userInfo: "hsc_user",
  shareCount: "hsc_scnt",
  idToken_expiration: "hsc_idToken_expiration",
  login_expiration: "hsc_login_expiration",
  isUnauthorized: "hsc_isUnauthorized"
}

function request(sendData, autoLogin) {
  autoLogin = (autoLogin === "" || autoLogin === undefined) ? true : (typeof (autoLogin) === 'boolean' ? autoLogin : true)
  return new Promise(function (resolve, reject) {
    var data = Object.assign({}, sendData)
    wxRequest(sendData)

    function wxRequest(sendData) {
      var idToken = getStorage(storageKeys.idToken);
      if (idToken) {
        var timestamp = Date.parse(new Date());
        var expiration = getStorage(storageKeys.idToken_expiration);
        if (expiration == "" || expiration == undefined || expiration < timestamp) {
          removeStorage(storageKeys.idToken);
        }
      }
      if (autoLogin && (idToken == "" || idToken == undefined)) {
        setUserInfo().then(function () {
          login().then(function () {
            wxRequest(sendData);
          }).catch(function (e) {
            reject(e)
          });
        });
      } else {
        data.url = globalData.apiBussinessHost + "/" + sendData.url
        data.header = Object.assign({
          'requestAppId': getStorage(storageKeys.appId)
        }, sendData.header);
        if (autoLogin) {
          data.header = Object.assign({
            'idToken': idToken
          }, data.header);
        }
        wx.request({
          url: data.url,
          data: data.data,
          header: Object.assign({
            "Content-Type": "application/json"
          }, data.header),
          method: data.method || "POST",
          dataType: data.dataType || "json",
          success: function (e) {
            if (autoLogin && e.statusCode == 401 || e.statusCode == 403) {
              console.log('statusCode:---401---')
              setStorage(storageKeys.isUnauthorized,true)
              removeStorage(storageKeys.idToken)
              setUserInfo().then(function () {
                login().then(function () {
                  wxRequest(sendData);
                });
              });
            } else if (e.statusCode == 200) {
              setStorage(storageKeys.isUnauthorized, false);
              resolve(e);
            } else {
              reject(e);
            }
          },
          fail: function (e) {
            console.error("request fail");
            console.error(e);
            reject(e);
          }
        })
      }
    }
  })

}

/**
 * 
 */
function n(r) {
  return (ifDataType(r, "Object") || ifDataType(r, "Array")) && Object.keys(r).forEach(function (e) {
    var t = r[e];
    ifDataType(t, "Object") || ifDataType(t, "Array") ? r[e] = n(t) : r[e] = "" + t
  }),
    r
}

/**
 * TODO
 */
function errorEvent(eventName, details) {
  //TODO
  console.error(eventName);
}

/**
 * get value by key from storage
 */
function getStorage(e) {
  try {
    return wx.getStorageSync(e)
  } catch (e) {
    errorEvent("getStorageSync", e)
  }
}

/**
 * set key-value to storage
 */
function setStorage(e, t) {
  try {
    wx.setStorageSync(e, t);
  } catch (e) {
    errorEvent("setStorageSync", e)
  }
}

/**
 * remove value from storage by key
 */
function removeStorage(key) {
  wx.removeStorage({
    key: key,
    success(res) {
      console.log(res.data)
    },
    fail(res) {
      errorEvent("removeStorageSync", res);
    }
  })
}

/**
 * if the data type of source is ["Object" dataType]
 */
function ifDataType(source, dataType) {
  return "[object " + dataType + "]" === {}.toString.call(source)
}

/**
 * validate the config if appkey is null
 */
function validateConfig() {
  var config;
  try {
    config = require("./hsc-wx-sdk.config")
  } catch (e) {
    throw '请把mtj-wx-sdk.config.js文件拷贝到utils目录中'
  }
  if (config && config.appKey) {
    data.key = config.appKey;
    setStorage(storageKeys.appId, data.key);
    console.log("mtj-wx-sdk.config.js文件中的appKey字段已经设置")
  } else {
    throw '请设置mtj-wx-sdk.config.js文件中的appKey字段'
  }
}

/**
 * userinfo and code ,maybe need more info in the future
 */
function setUserInfo() {
  console.log("setUserInfo");
  return Promise.all([new Promise(function (t) {
    var userInfo = getStorage(storageKeys.userInfo),
      n = ifDataType(userInfo, "Object") ? userInfo : {};
    wx.getSetting({
      success: function (res) {
        res.authSetting && res.authSetting["scope.userInfo"] ? wx.getUserInfo({
          success: function (e) {
            delete e.userInfo.errMsg,
              t(Object.assign(n, e.userInfo))
          },
          fail: function () {
            t(n)
          }
        }) : t(n)
      },
      fail: function () {
        t(n)
      }
    })
  }), new Promise(function (t) {
    wx.login({
      success: e => {
        console.log(e.code)
        delete e.errMsg,
          t(e.code)
      },
      fail: function () {
        t({})
      }
    })
  }), Promise.resolve()]).then(function (e) {
    if (loginData.user = n(e[0]), loginData.code = n(e[1]), loginData.debug) return new Promise(function () { })
  })
}

/**
 * encapsulation of we.request
 */
function sdkRequest(n) {
  if (!getStorage(storageKeys.appId)) {
    validateConfig();
  }
  return new Promise(function (resolve, reject) {
    wx.request({
      url: n.url,
      data: n.data,
      header: Object.assign({
        'Content-Type': 'application/json',
        'requestAppId': getStorage(storageKeys.appId)
      }, n.header),
      method: n.method || "POST",
      dataType: n.dataType || "json",
      success: function (e) {
        console.log("request success");
        return resolve(e);
      },
      fail: function (e) {
        console.error("request fail");
        console.error(e);
        return resolve(e);
      }
    })
  })
}

/**
 * this request for login and get idToken
 */
function login() {
  var that = this;
  return new Promise(function (resolve, reject) {
    var idToken = getStorage(storageKeys.idToken);
    var isUnauthorized = getStorage(storageKeys.isUnauthorized);
    if (idToken) {
      return resolve(idToken);
    }
    var timestamp = Date.parse(new Date());
    var loginExpiration = getStorage(storageKeys.login_expiration);
    if (loginExpiration && timestamp < loginExpiration) {
      if (isUnauthorized === false || isUnauthorized === "") {
        return resolve({});
      }
      
    } else {
      var timestamp = Date.parse(new Date());
      var expiration = timestamp + 5 * 60 * 1000;
      setStorage(storageKeys.login_expiration, expiration);
    }
    var t = {
      url: globalData.apiGateWayHost + "/login",
      dataType: "string",
      data: Object.assign({}, loginData)
    };
    console.log(loginData)
    sdkRequest(t).
      catch(function (e) {
        throw '获取idToken失败，检查api gateway service';
        return reject(e);
      }).then(function (e) {
        if (e && e.data) {
          var jsonData = JSON.parse(e.data);
          if (jsonData.idToken) {
            setStorage(storageKeys.idToken, jsonData.idToken);
            var timestamp = Date.parse(new Date());
            var expiration = timestamp + 7200000; //7200秒（2hour）
            setStorage(storageKeys.idToken_expiration, expiration);
            console.log("获取idToken成功，并存入缓存");
            console.log(jsonData.idToken);
            return resolve(jsonData);
          } else {
            return reject(e);
          }
        } else {
          throw '获取idToken失败，检查api gateway service';
        }
      }).catch(function (e) {
        throw '获取idToken失败，检查api gateway service';
        return reject(e);
      })
  })
}

/**
 * replace wx.request for sdk
 */

function traditionalLogin({
  url = globalData.registerTraditionalHost + '/oauth/auth_native_traditional',
  data = {},
  method = 'POST',
  header = {
    'content-type': 'application/json',
  }
}) {
  return new Promise((resolve, reject) => {
    _jarainLogin(url, resolve, reject, data, method, header)
  })
}

function traditionalRegister({
  url = globalData.registerTraditionalHost + '/oauth/register_native_traditional',
  data = {},
  method = 'POST',
  header = {
    'content-type': 'application/json',
  }
}) {
  return new Promise((resolve, reject) => {
    _jarainRegister(url, resolve, reject, data, method, header)
  })
}


function useVerificationCode({
  url = globalData.registerTraditionalHost + '/access/useVerificationCode',
  data = {},
  method = 'POST',
  header = {
    'content-type': 'application/x-www-form-urlencoded',
  }
}) {
  return new Promise((resolve, reject) => {
    if (data && data.verification_code) {
      data.verification_code = data.verification_code + getStorage(storageKeys.jarain_uuid)
      url = url + '?verification_code=' + data.verification_code
    } else {
      reject({})
    }
    _jarainLogin(url, resolve, reject, data, method, header)
  })
}

function _jarainLogin(url, resolve, reject, data = {}, method = 'POST', header) {
  var idToken = getStorage(storageKeys.idToken);
  wx.request({
    url: url,
    method: method,
    data: data,
    header: Object.assign({
      'content-type': 'application/json',
      'requestAppId': getStorage(storageKeys.appId),
      'idToken': idToken
    }, header ? header : {}),
    success: (res) => {
      const code = res.statusCode.toString()
      if (code.startsWith('2')) { // 一般情况下正确的请求结果是以2开头的（200）
        resolve(res.data)
      } else {
        reject()
        const error_code = res.data.error_code
        _show_error(error_code)
      }
    },
    fail: (err) => {
      reject()
      _show_error(1)
    }
  })
}

function _jarainRegister(url, resolve, reject, data = {}, method = 'POST', header) {
  var idToken = getStorage(storageKeys.idToken);
  wx.request({
    url: url,
    method: method,
    data: data,
    header: Object.assign({
      'content-type': 'application/json',
      'requestAppId': getStorage(storageKeys.appId),
      'idToken': idToken
    }, header ? header : {}),
    success: (res) => {
      var data = JSON.parse(res.data.value);
      if (data.stat == 'ok') {
        setStorage(storageKeys.jarain_uuid, data.capture_user.uuid);
      }
    },
    fail: (err) => {
      reject()
      _show_error(1)
    }
  })
}

validateConfig();

module.exports = {
  login: login,
  request: request,
  traditionalRegister: traditionalRegister,
  useVerificationCode: useVerificationCode,
  traditionalLogin: traditionalLogin
};