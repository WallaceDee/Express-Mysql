// dao/userDao.js
// 实现与MySQL交互
var $db = require('../config/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');
var fs = require("fs");
var uuid = require('uuid');
var jwt = require('jsonwebtoken');
// 使用连接池，提升性能
var pool = $db.connect();
var cert = fs.readFileSync('config/private.key', 'utf-8'); // get private key
console.log(cert);
module.exports = {
    list: function(req, res) {
        //query: 'SELECT * FROM table_user WHERE userName LIKE "%?%" OR userPhone LIKE "%?%"',
        var param_list = $util.extend(req.query, {
            userName: "",
            userPhone: ""
        }); //get
        var params = [param_list.userName, param_list.userPhone, parseInt(param_list.rows * (param_list.page - 1)), parseInt(param_list.rows)];
        var total = 0;
        var rows = [];
        $db.executeSql($sql.count, params, pool, function(err, result) {
            total = parseInt(JSON.stringify(result[0]).match(/{"COUNT\(\*\)\":(\S*)}/)[1]);
            console.log(total);
            $db.executeSql($sql.list, params, pool, function(err, result) {
                rows = result;
                $util.print(res, { total: total, rows: rows });
            });
        });
    },
    add: function(req, res) {
        //  insert: 'INSERT INTO table_user(userName,userPassword,createTime,updateTime) VALUES(?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
        var param_list = req.body;


        var name = "";
        for (var i = 0; i < 4; i++) {
            name += '\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16);
        }
        name = unescape(name.replace(/\\u/g, '%u'));
        //随机四字中文名字
        console.log(name);

        var params = [param_list.userName, name, param_list.userPassword];
        $db.executeSql($sql.insert, params, pool, function(err, result) {
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
        var param_list = req.body;
        var params = [param_list.userId];
        $db.executeSql($sql.delete, params, pool, function(err, result) {
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
        var param_list = req.body;
        var params = [param_list.userName, param_list.userAvatar, param_list.userPhone, param_list.userGender, param_list.userId];
        $db.executeSql($sql.update, params, pool, function(err, result) {
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
        var param_list = req.body;
        var params = [param_list.userName, param_list.userPassword];
        $db.executeSql($sql.login, params, pool, function(err, result) {
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
        var param_list = req.body;
        var params = [param_list.token, param_list.userName];
        $util.checkToken(params[0], params[1], res, function() {
            $db.executeSql($sql.getUserInfo, params[1], pool, function(err, result) {
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
        var param_list = req.body;
        var type = param_list.type;
        var params = [];
        $util.checkToken(param_list.token, param_list.userName, res, function() {
            switch (type) {
                case "userAvatar":
                    {
                        //过滤data:URL
                        var base64Data = param_list.base64.replace(/^data:image\/\w+;base64,/, "");
                        var dataBuffer = new Buffer(base64Data, 'base64');
                        var path = "public/upload/user_avatar/" + uuid.v1() + ".png";
                        params = [path.replace("public/", ""), param_list.userName];
                        $db.executeSql($sql.updateAvatar, params, pool, function(err, result) {
                            if (result) {
                                result = {
                                    code: 200,
                                    msg: '修改头像成功'
                                };
                            }
                            $util.print(res, result);
                        });
                        fs.writeFile(path, dataBuffer, function(err, res) {
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
                        params = [param_list.userNickName, param_list.userName];

                        $db.executeSql($sql.updateNickName, params, pool, function(err, result) {
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
                        params = [param_list.userPhone, param_list.userName];
                        $db.executeSql($sql.updatePhone, params, pool, function(err, result) {
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
                        params = [param_list.userGender, param_list.userName];
                        $db.executeSql($sql.updateGender, params, pool, function(err, result) {
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
                        params = [param_list.userBirthday, param_list.userName];
                        $db.executeSql($sql.updateBirthday, params, pool, function(err, result) {
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