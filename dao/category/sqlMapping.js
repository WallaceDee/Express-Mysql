var sqlMapping = {
    list: 'SELECT categoryId,categoryName as text,parentId,createTime,updateTime FROM table_category',
    createCategory: 'INSERT INTO table_category(categoryName,parentId,createTime,updateTime) VALUES(?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
    deleteCategory: 'DELETE FROM table_category WHERE categoryId = ?',
    getCategoryChildrenByParentId: 'SELECT categoryId,categoryName as text,parentId,createTime,updateTime FROM table_category WHERE parentId= ?',
    updateCategoryName: 'UPDATE table_category SET categoryName=?,updateTime=CURRENT_TIMESTAMP WHERE categoryId=?',
    updateCategoryParentId: 'UPDATE table_category SET parentId=?,updateTime=CURRENT_TIMESTAMP WHERE categoryId=?',
    updateCategoryUpdateTime: 'UPDATE table_category SET updateTime=CURRENT_TIMESTAMP WHERE categoryId=?'
}
module.exports = sqlMapping;