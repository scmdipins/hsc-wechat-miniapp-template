const hsc = require('hsc-wx-sdk.js')
var mtjwxsdk = function(e) {
  "use strict";
  var o, t, g = {
      maxRequestRetryCount: 0,
      requestRetryFirstDelay: 1e3,
      requestRetryMultiple: 4,
      maxRequestDataLength: 204800,
      maxUint8: 255,
      maxUint32: 4294967295,
      enabledEvents: {
        app: ["onShow", "onHide", "onError"],
        page: ["onShow", "onHide", "onPullDownRefresh", "onUnload"]
      },

      isdebug: false,
      storageKeys: {
        uuid: "hsc_track_uuid",
        userInfo: "hsc_track_user",
        shareCount: "hsc_track_scnt",
        idToken: "hsc_idToken",
        appId: "hsc_appid",
      }
    },
    d = {
      type: 1
    },
    p = {
      aso: {}
    },
    _uniqueStr = function() {
      return Math.floor(Math.random() * g.maxUint32);
    },
    _isType = function(e, t) {
      return "[object " + t + "]" === {}.toString.call(e)
    },
    n = function n(r) {
      return (_isType(r, "Object") || _isType(r, "Array")) && Object.keys(r).forEach(function(e) {
          var t = r[e];
          _isType(t, "Object") || _isType(t, "Array") ? r[e] = n(t) : r[e] = "" + t
        }),
        r
    },
    _validTel = function(e) {
      return _isType(e, "String") && /^\d{11}$/.test(e)
    },
    _validOpenId = function(e) {
      return _isType(e, "String") && 28 === e.length
    },
    c = 0,
    _request = function(r) {
      if (g.isdebug == true) {
        return
      }
      return new Promise(function(t, n) {
        if (r.data = r.data || {}, r.data.v = "2.0.0", r.data.rqc = ++c, e = r.data, !(JSON.stringify(e).length <= g.maxRequestDataLength)) return c--,
          n(new Error("invalid data"));
        var e;
        r.success = function(e) {
            return t(e)
          },
          r.fail = function(e) {
            return n(e)
          },
          function t(n) {
            var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : g.requestRetryFirstDelay;
            return hsc.request({
              url: n.url,
              data: n.data,
              header: Object.assign({
                "content-type": "application/json",
                //'requestAppId': getStorageSync(g.storageKeys.appId),
                //"idToken": getStorageSync(g.storageKeys.idToken) ? getStorageSync(g.storageKeys.idToken) : ""
              }, n.header),
              method: n.method || "POST",
              dataType: n.dataType || "json",
              success: function(e) {
                if (e.statusCode == 401) {
                  //wx.removeStorageSync(g.storageKeys.idToken);
                  n.url = "wechat/userbehavior/v2/mini.gif2";
                  return t(n)
                }
                delete n.data.rtc,
                  n.success && n.success(e)
              },
              fail: function(e) {
                n.data.rtc = (n.data.rtc || 0) + 1,
                  n.data.rtc <= g.maxRequestRetryCount ? setTimeout(function() {
                    return t(n, r * g.requestRetryMultiple)
                  }, r) : (delete n.data.rtc, n.fail && n.fail(e))
              }
            })
          }(r)
      })
    },
    _failRequest = function(eventName, exception) {
      if (g.isdebug == true) {
        return
      }
      var n = _isType(exception, "Object") ? JSON.stringify(exception) : "" + exception;
      _request({
        url: "wechat/userbehavior/v2/mini.gif",
        dataType: "string",
        data: Object.assign({}, d, {
          et: "error",
          en: eventName,
          ep: {
            ex: n
          },
          rid: _uniqueStr()
        })
      })
    },
    _trackRequest = function(e) {
      e.rid = _uniqueStr(),
        e.aso = e.aso || {};
      var t = {
        url: "wechat/userbehavior/v2/mini.gif",
        dataType: "string",
        data: Object.assign({}, d, e)
      };
      if (g.isdebug == true) {
        return
      }
      _request(t).
      catch(function(e) {
        return _failRequest("sendRequest", e)
      })
    },
    getStorageSync = function(e) {
      try {
        return wx.getStorageSync(e)
      } catch (e) {
        _failRequest("getStorageSync", e)
      }
    },
    setStorageSync = function(e, t) {
      try {
        wx.setStorageSync(e, t)
      } catch (e) {
        _failRequest("setStorageSync", e)
      }
    },
    _getUUID = function() {
      return new Promise(function(e) {
        var uuid = getStorageSync(g.storageKeys.uuid);
        if (_isType(uuid, "String") && 32 === uuid.length) {
          return e(uuid);
        }
        uuid = ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, function(e) {
            return (e ^ ("undefined" != typeof crypto && crypto.getRandomValues ? crypto.getRandomValues(new Uint8Array(1))[0] : Math.floor(Math.random() * g.maxUint8)) & 15 >> e / 4).toString(16)
          }),
          setStorageSync(g.storageKeys.uuid, uuid),
          e(uuid)
      })
    },
    _getAllWXInfo = function() {
      return t || (d.sid = _uniqueStr(), d.rqc = 0, t = Promise.all([_getUUID(), new Promise(function(t) {
        var e = getStorageSync(g.storageKeys.userInfo),
          n = _isType(e, "Object") ? e : {};
        wx.getSetting({
          success: function(e) {
            e.authSetting && e.authSetting["scope.userInfo"] ? wx.getUserInfo({
              success: function(e) {
                delete e.userInfo.errMsg,
                  t(Object.assign(n, e.userInfo))
              },
              fail: function() {
                t(n)
              }
            }) : t(n)
          },
          fail: function() {
            t(n)
          }
        })
      }), new Promise(function(t) {
        wx.getSystemInfo({
          success: function(e) {
            delete e.errMsg,
              t(e)
          },
          fail: function() {
            t({})
          }
        })
      }), new Promise(function(t) {
        wx.getNetworkType({
          success: function(e) {
            delete e.errMsg,
              t(e)
          },
          fail: function() {
            t({})
          }
        })
      }), g.getLocation ? new Promise(function(t) {
        wx.getLocation({
          type: "wgs84",
          success: function(e) {
            delete e.errMsg,
              t(e)
          },
          fail: function() {
            t({})
          }
        })
      }) : Promise.resolve()]).then(function(e) {
        d.uuid = e[0],
          p.user = n(e[1]),
          p.system = n(e[2]),
          p.network = n(e[3]),
          e[4] && (p.location = n(e[4])),
          p.system.platform
      }))
    },
    appEvent = {
      onLaunch: function() {
        _trackRequest({
          et: "app",
          en: "launch"
        })
      },
      onShow: function() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        return p.aso.scene = "" + (t.scene || ""),
          t.referrerInfo && t.referrerInfo.appId ? p.aso.referrerInfo = t.referrerInfo : delete p.aso.referrerInfo,
          p.aso.path = t.path || "",
          p.aso.query = Object.keys(t.query || {}).map(function(e) {
            return {
              key: e,
              value: t.query[e]
            }
          }),
          _getAllWXInfo().then(function() {
            return e = t.shareTicket,
              new Promise(function(t) {
                if (!e) return t();
                wx.getShareInfo({
                  shareTicket: e,
                  success: function(e) {
                    delete e.errMsg,
                      t(e)
                  },
                  fail: function() {
                    t({})
                  }
                })
              });
            var e
          }).then(function(e) {
            e ? p.aso.shareInfo = e : delete p.aso.shareInfo,
              _trackRequest(Object.assign({
                et: "app",
                en: "show"
              }, p))
          }).
        catch(function(e) {
          _failRequest("app.onShow", e)
        })
      },
      onHide: function() {
        _trackRequest({
          et: "app",
          en: "hide"
        })
      },
      onError: function(e) {
        var t = _isType(e, "Object") ? JSON.stringify(n(e)) : "" + e;
        _trackRequest({
          et: "app",
          en: "error",
          ep: {
            ex: t
          }
        })
      }
    },
    pageRequest = function(e, t) {
      return _trackRequest({
        et: "page",
        en: e,
        ep: t
      })
    },
    pageEvent = {
      onLoad: function() {
        pageRequest("load")
      },
      onShow: function() {
        var e = getCurrentPages(),
          t = e[e.length - 1];
        return d.path = t.route,
          d.query = Object.keys(t.options).map(function(e) {
            return {
              key: e,
              value: t.options[e]
            }
          }).filter(function(e) {
            return "hsc_track_shuuid" !== e.key
          }), p.aso.query = Object.keys(t.options).map(function(e) {
            return {
              key: e,
              value: t.options[e]
            }
          }).filter(function(e) {
            return "sourceId" == e.key
          }),
          _getAllWXInfo().then(function() {
            _trackRequest(Object.assign({
              et: "page",
              en: "show"
            }, p))
          }).
        catch(function(e) {
          _failRequest("page.onShow", e)
        })
      },
      onReady: function() {
        pageRequest("ready")
      },
      onHide: function() {
        pageRequest("hide")
      },
      onUnload: function() {
        pageRequest("unload")
      },
      onPullDownRefresh: function() {
        pageRequest("pullDownRefresh")
      },
      onReachBottom: function() {
        pageRequest("reachBottom")
      },
      onPageScroll: function() {
        pageRequest("pageScroll")
      },
      onTabItemTap: function(e) {
        pageRequest("tabItemTap", e)
      },
      onShareAppMessage: function(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
          n = getStorageSync(g.storageKeys.shareCount);
        n = (Number.isInteger(n) ? n : 0) + 1,
          setStorageSync(g.storageKeys.shareCount, n);
        var r = {
          cnt: n,
          from: e.from,
          path: t.path
        };
        if (!r.path) {
          var o = d.query.map(function(e) {
            return e.key + "=" + e.value
          }).join("&");
          r.path = d.path + (o ? "?" + o : "")
        }
        t.title && (r.title = "" + t.title),
          e.target && (r.target = JSON.stringify(e.target)),
          _trackRequest(Object.assign({
            et: "share",
            en: "action",
            ep: r
          }, p));
        var a = p.aso.query.filter(function(e) {
            return "hsc_track_shuuid" === e.key
          }),
          i = a[0] ? a[0].value.split("_") : [];
        d.uuid !== i[i.length - 1] && i.push(d.uuid);
        var u, c, s, f, l = i.slice(Math.max(0, i.length - 3)).join("_");
        return t.path = (u = r.path, c = "hsc_track_shuuid", s = l, f = 0 < (u = u.replace(new RegExp(c + "=[^&]*", "g"), "").replace(/(\?|&)&/g, "$1").replace(/(\?|&)$/g, "")).indexOf("?") ? "&" : "?", u + f + c + "=" + encodeURIComponent(s)),
          t
      }
    },
    userEvent = {
      trackEvent: function(e) {
        var t, r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        if (!_isType(t = e, "String") || !/^[a-z][a-z0-9_]{0,31}$/.test(t)) return Promise.reject(new Error("事件名称不合法"));
        var n = Object.keys(r).filter(function(e) {
          return _isType(n = e, "String") && /^[a-z0-9_]{1,32}$/.test(n) && (t = r[e], _isType(t, "String") || _isType(t, "Number"));
          var t, n
        }).map(function(e) {
          return {
            key: "" + e,
            value: "" + r[e],
            type: _isType(r[e], "String") ? "string" : "number"
          }
        });
        return _getAllWXInfo().then(function() {
          _trackRequest(Object.assign({
            et: "event",
            en: "" + e,
            ep: {
              data: n
            }
          }, p))
        }).
        catch(function(e) {
          _failRequest("trackEvent", e)
        })
      },
      setUserInfo: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          n = e.tel,
          r = e.openId;
        return _getAllWXInfo().then(function() {
          var e = getStorageSync(g.storageKeys.userInfo),
            t = _isType(e, "Object") ? e : {};
          return _validTel(n) && (t.tel = p.user.tel = n.substr(n.length - 11)),
            _validOpenId(r) && (t.openId = p.user.openId = r),
            (t.tel || t.openId) && setStorageSync(g.storageKeys.userInfo, t),
            _isType(n, "Undefined") || _validTel(n) ? _isType(r, "Undefined") || _validOpenId(r) ? void 0 : Promise.reject(new Error("openid不合法")) : Promise.reject(new Error("手机号不合法"))
        }).
        catch(function(e) {
          _failRequest("setUserInfo", e)
        })
      }
    },
    I = App,
    k = Page,
    O = function(e, t, n) {
      var r = t[e];
      t[e] = function(e) {
        n.call(this, e),
          r && r.call(this, e)
      }
    },
    appObj = function(t) {
      g.enabledEvents.app.forEach(function(e) {
          O(e, t, appEvent[e])
        }),
        t.track = userEvent,
        I(t)
    },
    pageObj = function(a) {
      g.enabledEvents.page.forEach(function(e) {
          O(e, a, pageEvent[e])
        }), ["onShareAppMessage"].forEach(function(e) {
          var t, n, r, o;
          r = pageEvent[t = e],
            o = (n = a)[t],
            n[t] = function(e) {
              var t = o && o.call(this, e);
              return r.call(this, e, t)
            }
        }),
        k(a)
    },
    P = function() {
      console.log("---------------------------")
      var e, t;
      e = wx,
        o = e;
      try {
        t = require("./hsc-wx-sdk.config")
      } catch (e) {
        return void console.error("请把hsc-wx-sdk.config.js文件拷贝到utils目录中")
      }
      t && t.appKey ? (d.key = t.appKey, g.isdebug = t.isdebug || !1, t.hasPlugin ? module.exports = {
        App: appObj,
        Page: pageObj
      } : (App = appObj, Page = pageObj)) : console.error("请设置hsc-wx-sdk.config.js文件中的appKey字段")
    };
  return P(),
    e.init = P,
    e
}({});