const {
    print,
    executeSql,
    generateTreeData
} = require('../../lib/util')
const $sql = require('./sqlMapping')

module.exports = {
    list: (req, res) => {
        executeSql($sql.list).then(result => {
            let data = generateTreeData(result, ['parentId', 'categoryId'], (child) => {
                child.updateTime = new Date(child.updateTime).getTime()
            }, (val1, val2) => {
                return val1.updateTime > val2.updateTime
            })
            data = [{
                text: '根目录',
                categoryId: 0,
                children: data
            }]
            print.success(res, data)
        }).catch(error => {
            print.error(res, error)
        })
    },
    create: (req, res) => {
        const {
            categoryName,
            parentId
        } = req.body
        executeSql($sql.createCategory, [categoryName, parentId]).then(result => {
            print.success(res, result)
        }).catch(error => {
            print.error(res, error)
        })
    },
    delete: (req, res) => {
        const {
            categoryId
        } = req.body
        executeSql($sql.getCategoryChildrenByParentId, [categoryId]).then(result => {
            if (result.length) {
                print.error(res, {
                    message: '该节点下还有子节点，不能删除'
                })
            } else {
                executeSql($sql.deleteCategory, [categoryId]).then(() => {
                    print.success(res, {
                        message: '删除成功'
                    })
                }).catch(error => {
                    print.error(res, error)
                })
            }
        }).catch(error => {
            print.error(res, error)
        })
    },
    updateCategoryName: (req, res) => {
        const {categoryName,categoryId} = req.body
        executeSql($sql.updateCategoryName, [categoryName,categoryId]).then(result=> {
            print.success(res, { message: '修改成功'})
        }).catch(error=>{
            print.error(res, error)
        })
    },
    updateCategoryParentId: (req, res) => {
        const {parentId,categoryId} = req.body
        executeSql($sql.updateCategoryParentId, [parentId,categoryId]).then( result=> {
            print.success(res,{
                message: '修改成功'
            })
        }).catch(error=>{
            print.error(res, error)
        })
    },
    setCategoryToTop: (req, res) => {
        const {categoryId} = req.body
        executeSql($sql.updateCategoryUpdateTime, [categoryId]).then(result=> {
            print.success(res, {
                message: '置顶成功'
            })
        }).catch(error=>{
            print.error(res, error)
        })
    },
}