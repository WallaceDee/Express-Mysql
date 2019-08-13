const {
    print,
    query,
    getSqlPageParmas
} = require('../../lib/util')
const $sql = require('./sqlMapping')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const cert = fs.readFileSync('config/private.key') // get private key
const crypto = require('crypto')

module.exports = {
    getUserAvailable: (req, res) => {
        query($sql.getUserByUserName, {username:req.body.username}).then(result => {
            if (result.length === 0) {
                print.success(res, {
                    message: '用户名可用'
                })
            } else {
                print.error(res, {
                    message: '用户名已存在'
                })
            }
        }).catch(error => {
            print.error(res, error)
        })
    },
    list: (req, res) => {
        const {
            keyword,
            page,
            rows
        } = Object.assign({
            page: 1,
            rows: 10,
            keyword: ''
        }, Object.assign(req.body, req.query))
        let params = {keyword, ...getSqlPageParmas(page, rows)}

        query($sql.list, params).then(result => {
            res.json({
                rows: result[0],
               ...result[1][0]
            })
        }).catch(error => {
            print.error(res, error)
        })
    },
    register: (req, res) => {
        let {password,username} = req.body
        //随机名字
        let name = ''
        for (let i = 0; i < 4; i++) {
            name += '\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16)
        }
        name = unescape(name.replace(/\\u/g, '%u'))
        let params = {username, name, password}
        query($sql.insert, params).then( result=>{
           print.success(res, {message: '注册成功'})
        }).catch(error => {
            print.error(res, error)
        })
    },
    delete: (req, res) => {
        query($sql.delete, {userId:req.body.userId}).then( result=> {
            print.success(res,{
                message: '删除成功'
            })
        }).catch(error => {
            print.error(res, error)
        })
    },
    update: (req, res) => {
        // update: 'UPDATE table_user SET userNickName=?,userAvatar=? ,userPhone=? ,userGender=?,updateTime=CURRENT_TIMESTAMP WHERE userId=?'
        let {userNickName,userAvatar,userPhone,userGender,userId} = req.body
        let params = {userNickName, userAvatar, userPhone, userGender, userId}
        query($sql.update, params).then( result=> {
            print.success(res, {
                message: '修改成功'
            })
        })
    },
    login: (req, res) => {
        let {
            password,
            username
        } = req.body
        query($sql.login, {username, password}).then(result => {
            if (result.length === 1) {
                let currentUser=result[0]
                let accessToken = jwt.sign({
                    userName: currentUser.userName,
                    userId: currentUser.userId
                }, cert, {
                    expiresIn: "2h",
                    algorithm: 'RS256'
                })
                currentUser['access_token'] = accessToken
                print.success(res, currentUser)
            } else {
                print.error(res, {
                    message: '用户名或密码错误'
                })
            }
        }).catch(error => {
            print.error(res, error)
        })
    },
    modify: function (req, res) {
        var query = req.body;
        var type = query.type;
        var params = [];
        $util.checkToken(query.token, query.userName, res, function () {
            switch (type) {
                case "userAvatar": {
                    //过滤data:URL
                    var base64Data = query.base64.replace(/^data:image\/\w+;base64,/, "");
                    var dataBuffer = new Buffer(base64Data, 'base64');
                    var path = "public/upload/user_avatar/" + uuid.v1() + ".png";
                    params = [path.replace("public/", ""), query.userName];
                    query($sql.updateAvatar, params, function (error, result) {
                        if (error) {
                            $util.print(res, {
                                error,
                                result
                            });
                        } else {
                            fs.writeFile(path, dataBuffer, function (err, res) {
                                if (err) {
                                    res.send(err);
                                } else {
                                    res = {
                                        code: 200,
                                        msg: '修改头像成功'
                                    };
                                    $util.print(res, {
                                        err,
                                        result: res
                                    });
                                }
                            });
                        }
                    });
                }
                break;
            case "userNickName": {
                params = [query.userNickName, query.userName];
                query($sql.updateNickName, params, function (error, result) {
                    if (result) {
                        result = {
                            code: 200,
                            msg: '修改昵称成功'
                        };
                    }
                    $util.print(res, {
                        error,
                        result
                    });
                });
            }
            break;
            case "userPhone": {
                params = [query.userPhone, query.userName];
                query($sql.updatePhone, params, function (error, result) {
                    if (result) {
                        result = {
                            code: 200,
                            msg: '修改手机成功'
                        };
                    }
                    $util.print(res, {
                        error,
                        result
                    });
                });
            }
            break;
            case "userGender": {
                params = [query.userGender, query.userName];
                query($sql.updateGender, params, function (error, result) {
                    if (result) {
                        result = {
                            code: 200,
                            msg: '修改性别成功'
                        };
                    }
                    $util.print(res, {
                        error,
                        result
                    });
                });
            }
            break;
            case "userBirthday": {
                params = [query.userBirthday, query.userName];
                query($sql.updateBirthday, params, function (error, result) {
                    console.log(err);
                    console.log(result);
                    if (result) {
                        result = {
                            code: 200,
                            msg: '修改生日成功'
                        };
                    }
                    $util.print(res, {
                        error,
                        result
                    });
                });
            }
            break;
            }
        });
    },
    getAdminUserInfo: (req, res) => {
        query($sql.getAdminUserInfo).then(  result=> {
           print.success(res, result[0])
        })
    }
}