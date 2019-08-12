const {
    print,
    executeSql,
    setPageAndSize
} = require('../../lib/util')
const $sql = require('./sqlMapping');

module.exports = {
    addComment: (req, res) => {
        // add:'INSERT INTO table_comment(content,parentId,authorId,articleId,createTime) VALUES(?,?,?,?,CURRENT_TIMESTAMP)'
        let {
            content,
            parentId,
            articleId
        } = req.body
        let {
            userId
        } = req.userInfo
        let params = [content, parentId || 0, articleId, userId]
        executeSql($sql.add, params).then(result => {
            print.success(res, {
                message: '评论成功'
            })
        }).catch(error => {
            print.error(res, error)
        })
    },
    addCommentAnonymous: (req, res) => {
        // addAnonymous: 'INSERT INTO table_comment (content,parentId,authorNickName,articleId,createTime) VALUES(?,?,?,?,CURRENT_TIMESTAMP)',
        let {
            content,
            parentId,
            anonymousName,
            articleId
        } = req.body
        let params = [content, parentId || 0, anonymousName, articleId]
        executeSql($sql.addAnonymous, params).then(result => {
            print.success(res, {
                message: '评论成功'
            })
        }).catch(error => {
            print.error(res, error)
        })
    },
    getCommentListByArticleId: (req, res) => {
        const {
            articleId,
            page,
            rows
        } = Object.assign({
            page: 1,
            rows: 10
        }, Object.assign(req.body, req.query))
        let params = [articleId, ...setPageAndSize(page, rows)]
        executeSql($sql.list, params).then(result => {
            res.json({
                rows: result[1],
                total: result[2][0]['COUNT(*)']
            })
        }).catch(error => {
            print.error(res, error)
        })
    }
}