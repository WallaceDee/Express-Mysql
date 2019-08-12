const {
    print,
    executeSql,
    setPageAndSize
} = require('../../lib/util')
const $sql = require('./sqlMapping');

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
        let params = [keyword, ...setPageAndSize(page, rows)]
        executeSql($sql.list, params).then(result => {
            res.json({
                rows: result[1],
                total: result[2][0]['COUNT(*)']
            })
        }).catch(error => {
            print.error(res, error)
        })
    },
    deleteArticle: (req, res) => {
        const {
            articleId
        } = req.body
        executeSql($sql.deleteArticle, [articleId]).then(result => {
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
        console.log(articleId)
        executeSql($sql.getArticleDetail, [articleId]).then(result => {
            print.success(res, result[0] || null)
        }).catch(error => {
            print.error(res, error)
        })
    }
}