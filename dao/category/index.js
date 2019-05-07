// dao/userDao.js
// 实现与MySQL交互
let $db = require('../../config/db');
let $util = require('../../util/util');
let $sql = require('./sqlMapping');

module.exports = {
    list: (req, res) => {
        function descByUpdateTime(val1, val2) {
            return val2.updateTime - val1.updateTime;
        }

        function setTreeData(data) {
            let tree = data.filter((father) => { //循环所有项
                let branchArr = data.filter((child) => {
                    child.updateTime = new Date(child.updateTime).getTime()
                    return father.categoryId === child.parentId //返回每一项的子级数组
                });
                if (branchArr.length > 0) {
                    branchArr.sort(descByUpdateTime)
                    father.children = branchArr; //如果存在子级，则给父级添加一个children属性，并赋值
                }
                return father.parentId === 0; //返回第一层
            });
            return tree //返回树形数据
        }
        $db.executeSql($sql.list, [], function(err, result) {
            var data = setTreeData(result)
            data.sort(descByUpdateTime)
            data = [{ text: '根目录', categoryId: 0, children: data }]
            res.json(data)
        });
    },
    create: (req, res) => {
        var query = req.body
        $db.executeSql($sql.create, [query.categoryName, query.parentId], function(error, result) {
            $util.print(res, error, { message: '创建成功' })
        });
    },
    delete: (req, res) => {
        var query = req.body
        $db.executeSql($sql.getCategoryChildrenByParentId, [query.categoryId], function(error, result) {
            if (error) {
                $util.print(res, error, result)
            } else {
                if (result.length) {
                    $util.print(res, { message: '该节点下还有子节点，不能删除' }, {})
                } else {
                    console.log('这个节点可以删除啊' + query.categoryId)
                    $db.executeSql($sql.delete, [query.categoryId], function(err) {
                        console.log(err)
                        $util.print(res, err, { message: '删除成功' })
                    })
                }
            }
        });
    },
    updateCategoryName: (req, res) => {
        var query = req.body
        $db.executeSql($sql.updateCategoryName, [query.categoryName, query.categoryId], function(error, result) {
            $util.print(res, error, { message: '修改成功' })
        });
    },
    updateCategoryParentId: (req, res) => {
        var query = req.body
        $db.executeSql($sql.updateCategoryParentId, [query.parentId, query.categoryId], function(error, result) {
            $util.print(res, error, { message: '修改成功' })
        });
    },
    setCategoryToTop: (req, res) => {
        var query = req.body
        $db.executeSql($sql.updateCategoryUpdateTime, [query.categoryId], function(error, result) {
            $util.print(res, error, { message: '置顶成功' })
        });
    },
}