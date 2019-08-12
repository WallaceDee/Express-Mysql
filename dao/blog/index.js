const {
    print,
    executeSql,
    setPageAndSize
} = require('../../lib/util')
const $sql = require('./sqlMapping');

module.exports = {
    list: (req, res) => {
        //query: 'SELECT * FROM table_user WHERE userName LIKE "%?%" OR userPhone LIKE "%?%"',
        const {
            page,
            rows,
            categoryId
        } = Object.assign({
            page: 1,
            rows: 10
        }, Object.assign(req.body, req.query))
        let params = [categoryId, ...setPageAndSize(page, rows)]
        executeSql($sql.list, params).then(result => {
            res.json({
                rows: result[1],
                total: result[2][0]['COUNT(*)']
            })
        }).catch(error => {
            print.error(res, error)
        })
    },
    getDetails: (req, res) => {
        const {
            blogId
        } = Object.assign(req.body, req.query)
        executeSql($sql.getDetailsById, [blogId]).then(result => {
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
        // create: 'INSERT INTO table_blog(type,title,content,cover,url,categoryId,authorUserId,createTime,updateTime) VALUES(?,?,?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
        const {
            blogId,
            type,
            title,
            content,
            cover,
            categoryId
        } = req.body
        let params = [type, title, content, cover, categoryId, req.userInfo.userId]
        if (blogId !== undefined) {
            params.push(blogId)
            executeSql($sql.update, params).then(result => {
                print.success(res, {
                    message: '修改成功'
                })
            }).catch(error => {
                print.error(res, error)
            })
        } else {
            executeSql($sql.create, params).then(result => {
                print.success(res, {
                    message: '发布成功'
                })
            }).catch(error => {
                print.error(res, error)
            })
        }
    }
}