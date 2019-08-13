const qs = require("querystring"),
  request = require("request"),
  API_PREFIX = "https://api.weibo.com",
  CONSUMER_KEY = "4197904860",
  CONSUMER_SECRET = "44d250f22cc7cf9930c57ad316ae4eeb",
  QQ_CONSUMER_KEY = "101716818",
  QQ_CONSUMER_SECRET = "e4c359b2c81cbf10db769f47e17b998a"
const { print, query } = require("./util.js")
const $sql = require("../dao/user/sqlMapping.js")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const cert = fs.readFileSync("config/private.key") // get private key

var sinaOAuth = (module.exports = function() {
  this.access_key = CONSUMER_KEY
  this.access_secret = CONSUMER_SECRET
})
sinaOAuth.prototype = {
  getAccessTokenWithWeibo: function(req, res) {
    request.post(
      {
        json: true,
        url: "https://api.weibo.com/oauth2/access_token",
        form: {
          client_id: CONSUMER_KEY,
          client_secret: CONSUMER_SECRET,
          grant_type: "authorization_code",
          code: req.body.code,
          redirect_uri: "http://www.chenguohua.com.cn"
        }
      },
      function(err, httpResponse, body) {
        // res.json(JSON.parse(body))
        res.json(body)
      }
    )
  },
  loginWithWeibo: function(req, res) {
    const { access_token, uid } = req.body
    request.get(
      {
        json: true,
        url: `https://api.weibo.com/2/users/show.json?access_token=${access_token}&uid=${uid}`
      },
      (requestRrror, httpResponse, data) => {
        // console.log(data)
        // data = JSON.parse(data)
        if (data["error_code"]) {
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
                { expiresIn: "2h", algorithm: "RS256" }
              )
              currentUser["access_token"] = accessToken
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
                  print.success(res, result[1])
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
  getAccessTokenWithQQ: function(req, res) {
    request.get(
      {
        json: true,
        url: `https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&redirect_uri=http://www.chenguohua.com.cn/index&code=${req.body.code}&client_id=${QQ_CONSUMER_KEY}&client_secret=${QQ_CONSUMER_SECRET}`
      },
      function(err, httpResponse, body) {
        body = qs.parse(body)
        res.json(body)
      }
    )
  },
  loginWithQQ: function(req, res) {
    const { access_token } = req.body
    request.get(
      {
        url: `https://graph.qq.com/oauth2.0/me?access_token=${access_token}`
      },
      (requestRrror, httpResponse, data) => {
        let { openid } = JSON.parse(data.match(/callback\( (\S*) \)/)[1])
        query($sql.checkIfExistByQQOpenid, { openid }).then(response => {
          if (response.length !== 0) {
            let currentUser = response[0]
            let accessToken = jwt.sign(
              { userName: currentUser.userName, userId: currentUser.userId },
              cert,
              { expiresIn: "2h", algorithm: "RS256" }
            )
            currentUser["access_token"] = accessToken
            print.success(res, currentUser)
          } else {
            request.get(
              {
                json: true,
                url: `https://graph.qq.com/user/get_user_info?access_token=${access_token}&openid=${openid}&oauth_consumer_key=${client_id}`
              },
              (rqr, hrs, info) => {
                // info = JSON.parse(info)
                let gender = "n"
                info.gender === "男" ? (gender = "m") : (gender = "f")
                let params = {
                  openid,
                  userNickName: info.nickname,
                  userAvatar: info.figureurl_qq_2,
                  userGender: gender
                }
                query($sql.signUpWithQQ, params).then(result => {
                  print.success(res, result[1])
                })
              }
            )
          }
        })
      }
    )
  }
}
