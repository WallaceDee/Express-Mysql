// dao/userDao.js
// 实现与MySQL交互
let $db = require('../../config/db');
let $util = require('../../util/util');
let $sql = require('./sqlMapping');

module.exports = {
    list: (req, res) => {
        $db.executeSql($sql.list, [], (error, result) => {
            if (result && result.length) {
                $util.print(res, { error, result })
            } else {
                $util.print(res, { error, result: { message: '没有广告' } })
            }
        })
    }
}