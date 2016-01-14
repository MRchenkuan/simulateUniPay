var makeSignature = require('../tools/makeSignature.js');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.post('/', function(req, res, next) {
  console.log("请求提:");
  console.log(req.body);
  res.render('index', { title: 'Express' });
});

/* 获取TN的地址 */
router.all('/gateway/api/appTransReq.do', function(req, res) {
  var DataToPost = {
    accessType:"0",
    bizType:"000201",
    certId:"68759585097",
    encoding:"UTF-8",
    merId:req.body.merId,
    orderId:req.body.orderId,
    respCode:"00",
    respMsg:"成功[0000000]",
    signMethod:"01",
    tn:Date.now(),
    txnSubType:"01",
    txnTime:Date.now(),
    txnType:"01",
    version:"5.0.0"
  };

  res.send(JSON.stringify(makeSignature(DataToPost)));


  /**
  * 回调执行方法 */
  // 回调
  var acpBackUrl = function(){_acpBackUrl(req,res,makeSignature(DataToPost))};
  setTimeout(acpBackUrl,1000);
});

/* 执行回调的方法 */
function _acpBackUrl(_req,_res,postData){

  var http = require("http");
  var url = require("url");

  var querystring =require("querystring");
  postData = querystring.stringify(postData);
  var options = {
    hostname: "127.0.0.1",
    port: 8086,
    path: '/fdc/acp_back_url.do',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  var req = http.request(options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function(chunk){
    console.log(chunk)
  });
  res.on('end', function(){
    console.log('No more data in response.')
  })
  });

  req.on('error', function(e){
    console.log(e.message);
  });

  req.write(postData);
  req.end();
}

module.exports = router;
