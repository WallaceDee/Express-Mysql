const {HOMEPAGE_PREFIX ,
    WEIBO_CONSUMER_KEY ,
    WEIBO_CONSUMER_SECRET,
    QQ_CONSUMER_KEY ,
    QQ_CONSUMER_SECRET } =require('../config/config.js')
const qs = require('querystring')
const  request = require('request')
const { print, query } = require('./util.js')
const $sql = require('../dao/user/sqlMapping.js')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const cert = fs.readFileSync('config/private.key') // get private key

let OAuth2 = (module.exports = function () {
    this.HOMEPAGE_PREFIX=HOMEPAGE_PREFIX
    this.WEIBO_CONSUMER_KEY = WEIBO_CONSUMER_KEY
    this.WEIBO_CONSUMER_SECRET = WEIBO_CONSUMER_SECRET
    this.QQ_CONSUMER_KEY=QQ_CONSUMER_KEY
    this.QQ_CONSUMER_SECRET=QQ_CONSUMER_SECRET
})
OAuth2.prototype = {
    getAccessTokenWithWeibo: function (req, res) {
        request.post(
            {
                json: true,
                url: 'https://api.weibo.com/oauth2/access_token',
                form: {
                    client_id: WEIBO_CONSUMER_KEY,
                    client_secret: WEIBO_CONSUMER_SECRET,
                    grant_type: 'authorization_code',
                    code: req.body.code,
                    redirect_uri: HOMEPAGE_PREFIX
                }
            },
            function (err, httpResponse, data) {
                console.log(data)
                // res.json(JSON.parse(data))
                res.json(data)
            }
        )
    },
    loginWithWeibo: function (req, res) {
        const { access_token, uid } = req.body
        request.get(
            {
                json: true,
                url: `https://api.weibo.com/2/users/show.json?access_token=${access_token}&uid=${uid}`
            },
            (requestRrror, httpResponse, data) => {
                console.log(data)
                // data = JSON.parse(data)
                if (data['error_code']) {
                    print.error(res, data)
                    return false
                }
                query($sql.checkIfExistByWeiboId, { weiboId: data.id })
                    .then(response => {
                        if (response.length !== 0) {
                            let currentUser = response[0]
                            let accessToken = jwt.sign(
                                { userName: currentUser.userName, userId: currentUser.userId },
                                cert,
                                { expiresIn: '2h', algorithm: 'RS256' }
                            )
                            currentUser['access_token'] = accessToken
                            print.success(res, currentUser)
                        } else {
                            let params = {
                                weiboId: data.id,
                                userNickName: data.screen_name,
                                userAvatar: data.avatar_large,
                                userGender: data.gender
                            }
                            query($sql.signUpWithWeibo, params)
                                .then(result => {
                                    print.success(res, result[1][0])
                                })
                                .catch(error => {
                                    print.error(res, error)
                                })
                        }
                    })
                    .catch(error => {
                        print.error(res, error)
                    })
            }
        )
    },
    getAccessTokenWithQQ: function (req, res) {
        request.get(
            {
                json: true,
                url: `https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&redirect_uri=${HOMEPAGE_PREFIX}/index&code=${req.body.code}&client_id=${QQ_CONSUMER_KEY}&client_secret=${QQ_CONSUMER_SECRET}`
            },
            function (err, httpResponse, data) {
                console.log(data)
                data = qs.parse(data)
                console.log(data)
                res.json(data)
            }
        )
    },
    loginWithQQ: function (req, res) {
        const { access_token } = req.body
        request.get(
            {
                url: `https://graph.qq.com/oauth2.0/me?access_token=${access_token}`
            },
            (requestRrror, httpResponse, data) => {
                let { openid ,client_id} = JSON.parse(data.match(/callback\( (\S*) \)/)[1])
                query($sql.checkIfExistByQQOpenid, { openid }).then(response => {
                    if (response.length !== 0) {
                        let currentUser = response[0]
                        let accessToken = jwt.sign(
                            { userName: currentUser.userName, userId: currentUser.userId },
                            cert,
                            { expiresIn: '2h', algorithm: 'RS256' }
                        )
                        currentUser['access_token'] = accessToken
                        print.success(res, currentUser)
                    } else {
                        request.get(
                            {
                                json: true,
                                url: `https://graph.qq.com/user/get_user_info?access_token=${access_token}&openid=${openid}&oauth_consumer_key=${client_id}`
                            },
                            (rqr, hrs, info) => {
                                console.log(info)
                                // info = JSON.parse(info)
                                let gender = 'n'
                                info.gender === '男' ? (gender = 'm') : (gender = 'f')
                                let params = {
                                    openid,
                                    userNickName: info.nickname,
                                    userAvatar: info.figureurl_qq_2,
                                    userGender: gender
                                }
                                query($sql.signUpWithQQ, params).then(result => {
                                    print.success(res, result[1][0])
                                })
                            }
                        )
                    }
                })
            }
        )
    }
}
