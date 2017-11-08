/**
 * Created by fujunou on 2015/3/6.
 */
var jwt = require('jsonwebtoken');
var fs = require("fs");
var cert = fs.readFileSync('config/private.key', 'utf-8'); // get private key
module.exports = {
    extend: function(target, source, flag) {
        for (var key in source) {
            if (source.hasOwnProperty(key))
                flag ?
                (target[key] = source[key]) :
                (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },
    print: function(res, ret) {
        if (typeof ret === 'undefined') {
            res.json({
                code: 0,
                msg: 'error'
            });
        } else {
            res.json(ret);
        }
    },
    checkToken: function(token, userName, res, callback) {
        jwt.verify(token, cert, function(err, decoded) {
            if (decoded !== undefined && decoded.userName === userName) {
                callback();
            } else {
                res.json({
                    code: 0,
                    info: "invalid token"
                });
            }
        });
    }
}