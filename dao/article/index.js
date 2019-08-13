const {
    print,
    query,
    getSqlPageParmas
} = require('../../lib/util')
const $sql = require('./sqlMapping')

module.exports = {
    list: (req, res) => {
        const {
            keyword,
            page,
            rows
        } = Object.assign({
            keyword: '',
            page: 1,
            rows: 10
        }, Object.assign(req.body, req.query))
        let params = {keyword, ...getSqlPageParmas(page, rows)}
        query($sql.list, params).then(result => {
            res.json({
                rows: result[0],
                ...result[1][0]
            })
        }).catch(error => {
            print.error(res, error)
        })
    },
    deleteArticle: (req, res) => {
        const {
            articleId
        } = req.body
        query($sql.deleteArticle, {articleId}).then(result => {
            print.success(res, {
                message: '删除成功'
            })
        }).catch(error => {
            print.error(res, error)
        })
    },
    getArticleDetail: (req, res) => {
        const {
            articleId
        } = Object.assign(req.body, req.query)
        query($sql.getArticleDetail, {articleId}).then(result => {
            print.success(res, result[0] || null)
        }).catch(error => {
            print.error(res, error)
        })
    }
}