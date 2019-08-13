const {
    print,
    query,
    getSqlPageParmas
} = require('../../lib/util')
const $sql = require('./sqlMapping')

module.exports = {
    addComment: (req, res) => {
        let {
            content,
            parentId,
            articleId
        } = req.body
        let {
            userId
        } = req.userInfo
        let params = {content, parentId, articleId, userId}
        query($sql.add, params).then(result => {
            print.success(res, {
                message: '评论成功'
            })
        }).catch(error => {
            print.error(res, error)
        })
    },
    addCommentAnonymous: (req, res) => {
        let {
            content,
            parentId,
            anonymousName,
            articleId
        } = req.body
        let params = {content, parentId, anonymousName, articleId}
        query($sql.addAnonymous, params).then(result => {
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
        let params = {articleId, ...getSqlPageParmas(page, rows)}
        query($sql.list, params).then(result => {
            res.json({
                rows: result[0],
                ...result[1][0]
            })
        }).catch(error => {
            print.error(res, error)
        })
    }
}