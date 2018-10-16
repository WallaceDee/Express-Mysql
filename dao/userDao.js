// dao/userDao.js
// 实现与MySQL交互
let $db = require('../config/db');
let $util = require('../util/util');
let $sql = require('./userSqlMapping');
let fs = require("fs");
let uuid = require('uuid');
let jwt = require('jsonwebtoken');

let cert = fs.readFileSync('config/private.key', 'utf-8'); // get private key
console.log(cert);
module.exports = {
    list: (req, res) => {
        //query: 'SELECT * FROM table_user WHERE userName LIKE "%?%" OR userPhone LIKE "%?%"',
        let query = $util.extend(req.query, {
            userName: "",
            userPhone: ""
        }); //get
        let params = [];
        params.push(query.userName)
        params.push(query.userPhone)
        params.push(query.rows * 1 * (query.page - 1))
        params.push(query.rows * 1)
        let total = 0
        let rows = []
        $db.executeSql($sql.count, params, (err, result) => {
            total = result[0]['COUNT(*)']
            $db.executeSql($sql.list, params, (err, result) => {
                rows = result
                $util.print(res, { total: total, rows: rows })
            });
        });
    },
    add: function(req, res) {
        //  insert: 'INSERT INTO table_user(userName,userPassword,createTime,updateTime) VALUES(?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
        var query = req.body;
        console.log(req.headers.token)
        var name = "";
        for (var i = 0; i < 4; i++) {
            name += '\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16);
        }
        name = unescape(name.replace(/\\u/g, '%u'));
        //随机四字中文名字
        console.log(name);

        var params = [query.userName, name, query.userPassword];
        $db.executeSql($sql.insert, params, function(err, result) {
            console.log(err);
            if (result) {
                result = {
                    code: 200,
                    msg: '注册成功'
                };
            }
            $util.print(res, result);
        });
    },
    delete: function(req, res) {
        //  delete: 'DELETE FROM table_user WHERE userId=?',
        var query = req.body;
        var params = [query.userId];
        $db.executeSql($sql.delete, params, function(err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '删除成功'
                };
            }
            $util.print(res, result);
        });
    },
    update: function(req, res) {
        // update: 'UPDATE table_user SET userName=?,userAvatar=? ,userPhone=? ,userGender=?,updateTime=CURRENT_TIMESTAMP WHERE userId=?',
        var query = req.body;
        var params = [query.userName, query.userAvatar, query.userPhone, query.userGender, query.userId];
        $db.executeSql($sql.update, params, function(err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '修改成功'
                };
            }
            $util.print(res, result);
        });
    },

    login: function(req, res) {
        var query = req.body;
        var params = [query.userName, query.userPassword];
        $db.executeSql($sql.login, params, function(err, result) {
            if (result.length === 0) {
                result = {
                    code: 0,
                    msg: '登录失败'
                };
            } else {
                var token = jwt.sign({ userName: result[0].userName }, cert, { expiresIn: "2h" });
                // result[0].token = token;
                result = {
                    code: 200,
                    msg: '登录成功',
                    info: result[0],
                    token: token
                };
            }
            $util.print(res, result);
        });
    },
    getUserInfo: function(req, res) {
        var query = req.body;
        var params = [query.token, query.userName];
        $util.checkToken(params[0], params[1], res, function() {
            $db.executeSql($sql.getUserInfo, params[1], function(err, result) {
                console.log(result);
                if (result) {
                    result = {
                        code: 200,
                        info: result[0]
                    };
                }
                $util.print(res, result);
            });
        });
    },
    modify: function(req, res) {
        var query = req.body;
        var type = query.type;
        var params = [];
        $util.checkToken(query.token, query.userName, res, function() {
            switch (type) {
                case "userAvatar":
                    {
                        //过滤data:URL
                        var base64Data = query.base64.replace(/^data:image\/\w+;base64,/, "");
                        var dataBuffer = new Buffer(base64Data, 'base64');
                        var path = "public/upload/user_avatar/" + uuid.v1() + ".png";
                        params = [path.replace("public/", ""), query.userName];
                        $db.executeSql($sql.updateAvatar, params, function(err, result) {
                            if (result) {
                                result = {
                                    code: 200,
                                    msg: '修改头像成功'
                                };
                            }
                            $util.print(res, result);
                        });

                        fs.writeFile(path, dataBuffer, function(err, res) {
                            console.log(err)
                            if (err) {
                                res.send(err);
                            } else {
                                console.log("修改头像失败");
                            }
                        });
                    }
                    break;
                case "userNickName":
                    {
                        params = [query.userNickName, query.userName];

                        $db.executeSql($sql.updateNickName, params, function(err, result) {
                            if (result) {
                                result = {
                                    code: 200,
                                    msg: '修改昵称成功'
                                };
                            }
                            $util.print(res, result);
                        });
                    }
                    break;
                case "userPhone":
                    {
                        params = [query.userPhone, query.userName];
                        $db.executeSql($sql.updatePhone, params, function(err, result) {
                            if (result) {
                                result = {
                                    code: 200,
                                    msg: '修改手机成功'
                                };
                            }
                            $util.print(res, result);
                        });
                    }
                    break;
                case "userGender":
                    {
                        params = [query.userGender, query.userName];
                        $db.executeSql($sql.updateGender, params, function(err, result) {
                            if (result) {
                                result = {
                                    code: 200,
                                    msg: '修改性别成功'
                                };
                            }
                            $util.print(res, result);
                        });
                    }
                    break;
                case "userBirthday":
                    {
                        params = [query.userBirthday, query.userName];
                        $db.executeSql($sql.updateBirthday, params, function(err, result) {
                            console.log(err);
                            console.log(result);
                            if (result) {
                                result = {
                                    code: 200,
                                    msg: '修改生日成功'
                                };
                            }
                            $util.print(res, result);
                        });
                    }
                    break;
            }
        });

    }
}