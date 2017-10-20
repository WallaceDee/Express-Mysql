// dao/userDao.js
// 实现与MySQL交互
var $db = require('../config/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');
var fs = require("fs");
var uuid = require('uuid');

// 使用连接池，提升性能
var pool = $db.connect();


var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: 1,
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
}


module.exports = {
    list: function(req, res) {
        //  list: 'SELECT * FROM table_user  LIMIT ?,?',
        var param_list = req.query;
        var params = [parseInt(param_list.rows * (param_list.page - 1)), parseInt(param_list.rows)];
        var total = 0;
        var rows = [];
        $db.executeSql($sql.count, [], function(err, result) {
            total = parseInt(JSON.stringify(result[0]).match(/{"COUNT\(\*\)\":(\S*)}/)[1]);
            $db.executeSql($sql.list, params, function(err, result) {
                rows = result;
                jsonWrite(res, { total: total, rows: rows });
            }, pool);
        }, pool);
    },
    add: function(req, res) {
        // insert: 'INSERT INTO table_user(userName,userGender,userCreateTime) VALUES(?,?,CURRENT_TIMESTAMP)',
        var param_list = req.body;
        var params = [param_list.userName, param_list.userGender];
        $db.executeSql($sql.insert, params, function(err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '增加成功'
                };
            }
            jsonWrite(res, result);
        }, pool);
    },
    delete: function(req, res) {
        //  delete: 'DELETE FROM table_user WHERE userId=?',
        var param_list = req.body;
        var params = [param_list.userId];
        $db.executeSql($sql.delete, params, function(err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '删除成功'
                };
            }
            jsonWrite(res, result);
        }, pool);
    },
    update: function(req, res) {
        // update: 'UPDATE table_user SET userName=?,userAvatar=? ,userPhone=? ,userGender=?,updateTime=CURRENT_TIMESTAMP WHERE userId=?',
        var param_list = req.body;
        var params = [param_list.userName, param_list.userAvatar, param_list.userPhone, param_list.userGender, param_list.userId];
        $db.executeSql($sql.update, params, function(err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '修改成功'
                };
            }
            jsonWrite(res, result);
        }, pool);
    },
    updateAvatar: function(req, res) {
        var param_list = req.body;

        //过滤data:URL
        var base64Data = param_list.base64.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64Data, 'base64');
        var path = "public/upload/user_avatar/" + uuid.v1() + ".png";
        var params = [path.replace("public/",""), param_list.userId];
        $db.executeSql($sql.updateAvatar, params, function(err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '修改成功'
                };
            }
            jsonWrite(res, result);
        }, pool);

        fs.writeFile(path, dataBuffer, function(err, res) {
            if (err) {
                res.send(err);
            } else {

            }
        });
    }
}