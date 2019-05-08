/**
 * Created by fujunou on 2015/3/6.
 */
var jwt = require('jsonwebtoken'); //用来创建和确认用户信息摘要
let fs = require("fs");
let cert = fs.readFileSync('config/public.key'); // get private key

module.exports = {
    ensureAuthorized: function(req, res, next) {
        //检查post的信息或者url查询参数或者头信息
        var access_token = req.headers['access_token'] || req.body['access_token'];
        // 解析 token
        if (access_token) {
            // 确认token
            jwt.verify(access_token, cert, { algorithms: ['RS256'] }, function(err, decoded) {
                console.log(err)
                if (err) {
                    return res.status(403).send({ status: 0, result: { message: 'invalid token.' } });
                } else {
                    // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
                    req.userInfo = decoded;
                    // console.dir(req.userInfo);
                    next();
                }
            });
        } else {
            // 如果没有token，则返回错误
            return res.status(403).send({
                status: 0,
                result: {
                    message: '没有提供token！'
                }
            });
        }
    },
    extend: function(target, source, flag) {
        for (var key in source) {
            if (source.hasOwnProperty(key))
                flag ?
                (target[key] = source[key]) :
                (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },
    print: (res, { error, result }) => {
        if (error) {
            res.json({
                status: 0,
                data: error
            });
        } else {
            res.json({
                status: 1,
                result
            });
        }
    }
}