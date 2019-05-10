// dao/userDao.js
// 实现与MySQL交互
let $db = require('../../config/db');
let $util = require('../../util/util');
let $sql = require('./sqlMapping');

module.exports = {
    list: (req, res) => {
        //query: 'SELECT * FROM table_user WHERE userName LIKE "%?%" OR userPhone LIKE "%?%"',
        let query = $util.extend(req.body, {
            page: 1,
            rows: 10
        });
        let params = [];
        params.push(query.categoryId)
        params.push(query.rows * 1 * (query.page - 1))
        params.push(query.rows * 1)
        let total = 0
        let rows = []
        $db.executeSql($sql.count, params, (err, result) => {
            total = result[0]['COUNT(*)']
            $db.executeSql($sql.list, params, (err, result) => {
                rows = result
                res.json({ total: total, rows: rows })
            });
        });
    },
    getDetails: (req, res) => {
        let params = [req.body.blogId];
        $db.executeSql($sql.getDetailsById, params, (error, result) => {
            if (result && result.length) {
                $util.print(res, { error, result: result[0] })
            } else {
                $util.print(res, { error, result: { message: '没找到相关博文' } })
            }
        })
    },
    publicBlog: (req, res) => {
        // create: 'INSERT INTO table_blog(type,title,content,cover,url,categoryId,authorUserId,createTime,updateTime) VALUES(?,?,?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
        console.log(req.body)
        let params = [];
        params.push(req.body.type)
        params.push(req.body.title)
        params.push(req.body.content)
        params.push(req.body.cover)
        params.push(req.body.url)
        params.push(req.body.categoryId)
        params.push(req.userInfo.userId)
        console.log(req.userInfo)
        $db.executeSql($sql.create, params, (error, result) => {
            $util.print(res, { error, result: { message: '发布成功' } })
        })
    }
}