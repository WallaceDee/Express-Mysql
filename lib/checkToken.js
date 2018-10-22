/*!
 * Moajs Middle
 * Copyright(c) 2015-2019 Alfred Sang <shiren1118@126.com>
 * MIT Licensed
 */

var jwt = require('jsonwebtoken'); //用来创建和确认用户信息摘要
let fs = require("fs");
let cert = fs.readFileSync('config/public.key'); // get private key

// 检查用户会话
module.exports = function(req, res, next) {
    console.log(cert);
    //检查post的信息或者url查询参数或者头信息
    var access_token = req.headers['access_token'];
    // 解析 token
    if (access_token) {
        // 确认token
        jwt.verify(access_token, cert, { algorithms: ['RS256'] }, function(err, decoded) {
            console.log(err)
            if (err) {
                return res.json({ success: false, message: 'invalid token.' });
            } else {
                // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
                req.api_user = decoded;
                console.dir(req.api_user);
                next();
            }
        });
    } else {
        // 如果没有token，则返回错误
        return res.status(403).send({
            success: false,
            message: '没有提供token！'
        });
    }
};