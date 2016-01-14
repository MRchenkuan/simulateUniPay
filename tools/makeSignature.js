var crypto = require("crypto");
var rf=require("fs");

function makeSignature(data){

    // 遍历数据
    var _arr=[];
    for(var property in data){
        if(data.hasOwnProperty(property)){
            _arr.push(property+"="+data[property]);
        }
    }
    // 链接字段
    var content = _arr.join("&");
    //加密签名
    var RSA=rf.readFileSync("./tools/cert/server-key.pem");
    // 对待签名串使用SHA-1算法做摘要，并转成16进制
    var  sum =  crypto.createHash('sha1').update(new Buffer(content,"UTF-8")).digest("hex");
    // 再使用银联颁发给商户的商户RSA私钥证书对摘要做签名操作（签名时算法选择SHA-1）
    var sign = crypto.createSign("sha1").update(sum).sign(RSA,"base64");
    var _data = data;
    _data.signature = sign;
    return _data;
}

module.exports = makeSignature;