var CryptoJS = require('../utils/crypto-js-4.0.0/crypto-js.js');

class SignDatas {

  appKey = '203859798';
  appSecret = 'Fbo9eLXpEePZC3I0jSatecjsx9tSvOwm';
  md5 = '';
  date;
  nonce;
  textToSign = '';
  accept = 'application/json';
  contentType = 'application/json';
  signatureMethod = 'HmacSHA356';
  signatureHeaders = 'x-ca-key,x-ca-nonce,x-ca-signaturemethod';
  signature = 'not calc';

  constructor(urlPath, requestData) {
    // console.log('urlPath', urlPath);
    // console.log('requestData', requestData);

    var dateObject = new Date();
    this.date = dateObject.toLocaleString();

    this.nonce = this.createUuid();
    this.textToSign += 'GET\n';
    this.textToSign += this.accept + '\n';
    this.textToSign += this.md5 + '\n';
    this.textToSign += this.contentType + '\n';
    this.textToSign += this.date + '\n';
    this.textToSign += 'x-ca-key:' + this.appKey + '\n';
    this.textToSign += 'x-ca-nonce:' + this.nonce + '\n';
    this.textToSign += 'x-ca-signaturemethod:' + this.signatureMethod + '\n';
    //this.textToSign += '/oss/presignedurl/skincubator-miniapp?action=get&objectPath=11111.jpg';
    this.textToSign += urlPath + this.requestDataToString(requestData); // '?action=get&objectPath=11111.jpg';
    console.log('textToSign\n' + this.textToSign.replace(/\n/g, '#'));  
    var hash = CryptoJS.HmacSHA256(this.textToSign, this.appSecret)
    this.signature = hash.toString(CryptoJS.enc.Base64)
  }

  createUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
  }

  requestDataToString(requestData) {
    var sRet = '';
    var params = new Map();
    for (let key in requestData) {
      params.set(key, requestData[key]);
    }    
    var sortedKeys = Array.from(params.keys());
    sortedKeys.sort();
    //console.log('sortedKeys', sortedKeys);
    for (let i in sortedKeys) {
      var sStr = sortedKeys[i] + '=' + params.get(sortedKeys[i]);
      //console.log(i, sStr);
      if (sRet == '') {
        sRet = '?' + sStr;
      } else {
        sRet = sRet + '&' + sStr;
      }
    }
    //console.log('sRet = ' + sRet);
    return sRet;
  }

}

module.exports = {
  SignDatas: SignDatas
}