module.exports = {
  list: 'SELECT categoryId,categoryName as text,parentId,createTime,updateTime FROM table_category',
  createCategory: `INSERT INTO table_category(categoryName,parentId,createTime,updateTime) 
  VALUES({{categoryName}},{{parentId}},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`,
  deleteCategory: 'DELETE FROM table_category WHERE categoryId = {{categoryId}}',
  getCategoryChildrenByParentId: 'SELECT categoryId,categoryName as text,parentId,createTime,updateTime FROM table_category WHERE parentId={{categoryId}}',
  updateCategoryName: 'UPDATE table_category SET categoryName={{categoryName}},updateTime=CURRENT_TIMESTAMP WHERE categoryId={{categoryId}}',
  updateCategoryParentId: 'UPDATE table_category SET parentId={{parentId}},updateTime=CURRENT_TIMESTAMP WHERE categoryId={{categoryId}}',
  updateCategoryUpdateTime: 'UPDATE table_category SET updateTime=CURRENT_TIMESTAMP WHERE categoryId={{categoryId}}'
}