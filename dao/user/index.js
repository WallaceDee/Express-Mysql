// dao/userDao.js
// 实现与MySQL交互
let $db = require('../../config/db');
let $util = require('../../util/util');
let $sql = require('./sqlMapping');
let uuid = require('uuid');
let jwt = require('jsonwebtoken');
let fs = require("fs");
let cert = fs.readFileSync('config/private.key'); // get private key
const crypto = require("crypto");

module.exports = {
    getUserAvailable: (req, res) => {
        $db.executeSql($sql.getUserByUserName, [req.body.username], (error, result) => {
            if (result.length === 0) {
                $util.print(res, error, { message: '用户名可用' })
            } else {
                $util.print(res, { message: '用户名已存在' }, { message: '用户名已存在' })
            }
        })
    },
    list: (req, res) => {
        // 'SET @keyword=?;
        //SELECT userId,userName,userNickName,userAvatar,userBirthday,userPhone,userGender,createTime,updateTime FROM table_user WHERE userName LIKE CONCAT("%",@keyword,"%") OR userNickName LIKE CONCAT("%",@keyword,"%") OR userPhone LIKE CONCAT("%",@keyword,"%") LIMIT ?,?;
        //SELECT COUNT(*) FROM table_user WHERE userName LIKE CONCAT("%",@keyword,"%") OR userNickName LIKE CONCAT("%",@keyword,"%") OR userPhone LIKE CONCAT("%",@keyword,"%");',
        let query = $util.extend(req.body, {
                keyword: ''
            }),
            total = 0,
            rows = [],
            params = []
        params.push(query.keyword)
        params.push(query.rows * 1 * (query.page - 1))
        params.push(query.rows * 1)
        $db.executeSql($sql.list, params, (error, result) => {
            if (error) {
                res.json(error)
            } else {
                rows = result[1]
                total = result[2][0]['COUNT(*)']
                res.json({ total: total, rows: rows })
            }
        });
    },
    register: (req, res) => {
        //  insert: 'INSERT INTO table_user(userName,userPassword,createTime,updateTime) VALUES(?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
        let query = req.body
        let name = ''
        for (let i = 0; i < 4; i++) {
            name += '\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16)
        }
        name = unescape(name.replace(/\\u/g, '%u'))
        let md5 = crypto.createHash("md5")
        let password = md5.update(query.password).digest("hex")
        let params = [query.username, name, password]
        $db.executeSql($sql.insert, params, function(error, result) {
            $util.print(res, error, { message: '注册成功' })
        });
    },
    delete: (req, res) => {
        //  delete: 'DELETE FROM table_user WHERE userId=?',
        let params = [req.body.userId];
        $db.executeSql($sql.delete, params, function(error, result) {
            $util.print(res, error, { message: '删除成功' })
        });
    },
    update: (req, res) => {
        // update: 'UPDATE table_user SET userNickName=?,userAvatar=? ,userPhone=? ,userGender=?,updateTime=CURRENT_TIMESTAMP WHERE userId=?'
        let query = req.body;
        let params = [query.userNickName, query.userAvatar, query.userPhone, query.userGender, query.userId];
        $db.executeSql($sql.update, params, function(error, result) {
            console.log(error)
            console.log(result)
            $util.print(res, error, { message: '修改成功' })
        });
    },
    login: (req, res) => {
        console.log(111111)
        let query = req.body
        let md5 = crypto.createHash("md5")
        let password = md5.update(query.password).digest("hex")
        let params = [query.username, password]
        $db.executeSql($sql.login, params, function(error, result) {
            if (result.length === 1) {
                let access_token = jwt.sign({ userName: result[0].userName, userId: result[0].userId }, cert, { expiresIn: "2h", algorithm: 'RS256' })
                result[0].access_token = access_token
                $util.print(res, error, result[0])
            } else {
                $util.print(res, { message: '用户名或密码错误' }, { message: '用户名或密码错误' })
            }
        })
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