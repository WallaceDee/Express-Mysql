// dao/userDao.js
// 实现与MySQL交互
let $db = require('../../config/db');
let $util = require('../../util/util');
let $sql = require('./articleSqlMapping');

module.exports = {
    getCategoryList: (req, res) => {
        $db.executeSql($sql.getCategoryList, [], (err, result) => {
            $util.print(res, err, result)
        });
    },
    publicArticle: (req, res) => {
        // publicArticle: 'INSERT INTO table_article(title,content,categoryId,authorUserId,createTime,updateTime) VALUES(?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)'
        console.log(req.userInfo.userId)
        let query = req.body
        let params = [query.title, query.content, query.categoryId, req.userInfo.userId]
        console.log(params)
        $db.executeSql($sql.publicArticle, params, (err, result) => {
            $util.print(res, err, {msg:'发布成功'})
        });
    }
}