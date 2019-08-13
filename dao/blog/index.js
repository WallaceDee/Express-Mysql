const {
    print,
    query,
    getSqlPageParmas
} = require('../../lib/util')
const $sql = require('./sqlMapping')

module.exports = {
    list: (req, res) => {
        const {
            page,
            rows,
            categoryId
        } = Object.assign({
            page: 1,
            rows: 10
        }, Object.assign(req.body, req.query))
        let params = {
            categoryId,
            ...getSqlPageParmas(page, rows)
        }

        query($sql.list, params).then(result => {
            res.json({
                rows: result[0], //sql语句1查询结果
                ...result[1][0] //sql语句2查询结果[{total:?}]
            })
        }).catch(error => {
            print.error(res, error)
        })
    },
    getDetails: (req, res) => {
        const {
            blogId
        } = Object.assign(req.body, req.query)
        query($sql.getDetailsById, {
            blogId
        }).then(result => {
            if (result && result.length) {
                print.success(res, result[0])
            } else {
                print.error(res, {
                    message: '未找到相关博文'
                })
            }
        }).catch(error => {
            print.error(res, error)
        })
    },
    publicBlog: (req, res) => {
        const {
            blogId,
            type,
            title,
            content,
            cover,
            categoryId
        } = req.body
        const {
            userId
        } = req.userInfo
        let params = {
            type,
            title,
            content,
            cover,
            categoryId,
            userId
        }
        if (blogId) {
            params.blogId = blogId
            query($sql.update, params).then(result => {
                print.success(res, {
                    message: '修改成功'
                })
            }).catch(error => {
                print.error(res, error)
            })
        } else {
            query($sql.create, params).then(result => {
                print.success(res, {
                    message: '发布成功'
                })
            }).catch(error => {
                print.error(res, error)
            })
        }
    }
}