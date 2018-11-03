// dao/userDao.js
// 实现与MySQL交互
let $db = require('../../config/db');
let $util = require('../../util/util');
let $sql = require('./sqlMapping');

module.exports = {
    addComment: (req, res) => {
        // add:'INSERT INTO table_comment(content,parentId,authorId,articleId,createTime) VALUES(?,?,?,?,CURRENT_TIMESTAMP)'
        let query = req.body
        let params = []
        params.push(query.content)
        params.push(query.parentId || 0)
        params.push(req.userInfo.userId)
        params.push(query.articleId)
        $db.executeSql($sql.add, params, function(error, result) {
            $util.print(res, error, { message: '评论成功' })
        });
    },
    getCommentListByArticleId: (req, res) => {
         let query = req.body
        let params = [];
        params.push(query.articleId)
        params.push(query.rows * 1 * (query.page - 1)||0)
        params.push(query.rows * 1||10)
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
    publicArticle: (req, res) => {
        // publicArticle: 'INSERT INTO table_article(title,content,categoryId,authorUserId,createTime,updateTime) VALUES(?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)'
        console.log(req.userInfo.userId)
        let query = req.body
        let params = [query.title, query.content, query.categoryId, req.userInfo.userId]
        console.log(params)
        $db.executeSql($sql.publicArticle, params, (error, result) => {
            $util.print(res, error, { message: '发布成功' })
        });
    }
}