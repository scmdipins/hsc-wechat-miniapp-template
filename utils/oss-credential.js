const app = getApp();
const SignDatas = require('signature-ali.js').SignDatas;

function getRealImageUrlFromOSS(imageUrl) {
  // console.log('getRealImageUrlFromOSS.imageUrl = ' + imageUrl);
  if (imageUrl == null) {
    return;
  }   
  return new Promise(function (resolve, reject) {   
    var urlHost = app.globalData.ossHostUrl;
    var urlPath = app.globalData.ossPresignedUrl;
    var requestData = {
      'objectPath': imageUrl,
      'action':'get'
    };
    var signDatas = new SignDatas(urlPath, requestData);
    var apiUrl = urlHost + urlPath;
    wx.request({
      url: apiUrl,
      method:'GET',
      data: requestData,
      header: {
        'Date': signDatas.date,
        'Content-MD5': signDatas.md5,
        'X-Ca-Nonce': signDatas.nonce,
        'X-Ca-Key': signDatas.appKey,
        'X-Ca-Signature': signDatas.signature,
        'X-Ca-SignatureMethod': signDatas.signatureMethod,
        'X-Ca-Signature-Headers': signDatas.signatureHeaders,
        'Content-Type': signDatas.contentType,
        'Accept': signDatas.accept
      },
      success(res) {
        var content = res.data['content'];
        if (content) {
          var realImageUrl = content['url'];
          resolve(realImageUrl);
        } else {
          reject(res);
        }
      },
      fail(res) {
        reject(res);
      }
    })
  })
}

function uploadImageFileToOSS(imageFile) {
  // console.log('uploadImageFileToOSS.imageFile = ' + imageFile);
  if (imageFile == null) {
    return;
  }   
  return new Promise(function (resolve, reject) {   
    var objectPath = new SignDatas().createUuid();
    objectPath = objectPath + '.jpg';
    // console.log('objectPath = ', objectPath);
    var urlHost = app.globalData.ossHostUrl;
    var urlPath = app.globalData.ossPresignedUrl;
    var requestData = {
      'objectPath': objectPath,
      'action':'put'
    };
    var signDatas = new SignDatas(urlPath, requestData);
    var apiUrl = urlHost + urlPath;
    wx.request({
      url: apiUrl,
      method:'GET',
      data: requestData,
      header: {
        'Date': signDatas.date,
        'Content-MD5': signDatas.md5,
        'X-Ca-Nonce': signDatas.nonce,
        'X-Ca-Key': signDatas.appKey,
        'X-Ca-Signature': signDatas.signature,
        'X-Ca-SignatureMethod': signDatas.signatureMethod,
        'X-Ca-Signature-Headers': signDatas.signatureHeaders,
        'Content-Type': signDatas.contentType,
        'Accept': signDatas.accept
      },
      success(res) {
        var content = res.data['content'];
        if (content) {
          var url = content['url'];
          var imageUrl = content['imageUrl'];
          var ret = {
            'imageFile' : imageFile,
            'url' : url,
            'imageUrl' : imageUrl
          };
          // resolve(ret); 
          // upload imageFile to imageUrl
          var fs = wx.getFileSystemManager();
          fs.readFile({
            filePath: imageFile,
            success(res) {
              wx.request({
                url: url,
                method: 'PUT',
                header: {
                  'content-type': 'application/octet-stream'
                },
                data: res.data,
                success: (res) => {
                  resolve(ret);
                },
                fail: (res) => {
                  reject(res);
                }
              })
            },
            fail(res) {
              reject(res);
            }
          })          
        } else {
          reject(res);
        }
      },
      fail(res) {
        reject(res);
      }
    })
  })
}

module.exports = {
  getRealImageUrlFromOSS : getRealImageUrlFromOSS,
  uploadImageFileToOSS : uploadImageFileToOSS,
}