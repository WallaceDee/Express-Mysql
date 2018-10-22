var qs = require('querystring'),
    request = require('request'),
    API_PREFIX = 'https://api.weibo.com',
    CONSUMER_KEY = '4197904860',
    CONSUMER_SECRET = '44d250f22cc7cf9930c57ad316ae4eeb';
let $db = require('../config/db');
let $sql = require('../dao/user/userSqlMapping');
let jwt = require('jsonwebtoken');
let fs = require("fs");
let cert = fs.readFileSync('config/private.key'); // get private key


var sinaOAuth = module.exports = function() {
    this.access_key = CONSUMER_KEY;
    this.access_secret = CONSUMER_SECRET;
};
sinaOAuth.prototype = {
    getAccessToken: function(req, res) {
        request.post({
            url: 'https://api.weibo.com/oauth2/access_token',
            form: {
                client_id: CONSUMER_KEY,
                client_secret: CONSUMER_SECRET,
                grant_type: 'authorization_code',
                code: req.body.code,
                redirect_uri: 'http://www.chenguohua.com.cn'
            }
        }, function(err, httpResponse, body) {
            res.json(JSON.parse(body))
        })
    },
    login: function(req, res) {
        request.get({
            url: 'https://api.weibo.com/2/users/show.json?access_token=' + req.body.access_token + '&uid=' + req.body.uid,
        }, (requestRrror, httpResponse, data) => {
            data = JSON.parse(data)
            if (data.error_code) {
                res.json({
                    status: 0,
                    data: data
                })
                return false
            }
            $db.executeSql($sql.checkIfExistByWeiboId, [data.id], (err, response) => {
                if (response.length !== 0) {
                    let access_token = jwt.sign({ userName: response[0].userName, userId: response[0].userId }, cert, { expiresIn: "2h", algorithm: 'RS256' });
                    response[0].access_token = access_token
                    res.json({
                        status: 1,
                        data: response[0]
                    })
                } else {
                    //  signUpWithWeibo: 'INSERT INTO table_user(weiboId,userNickName,userAvatar,userGender,createTime,updateTime) VALUES(?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)'
                    let params = []
                    params = [data.id, data.screen_name, data.avatar_large, data.gender]
                    $db.executeSql($sql.signUpWithWeibo, params, (e, r) => {
                        res.json({
                            status: 0,
                            msg: '注册成功'
                        })
                    })
                }
            })
        })
    }
}