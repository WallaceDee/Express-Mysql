var sqlMapping = {
    getCategoryList: 'SELECT categoryId,categoryName as text,parentId,createTime,updateTime FROM table_category',
    publicArticle: 'INSERT INTO table_article(title,content,categoryId,authorUserId,createTime,updateTime) VALUES(?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
    createCategory: 'INSERT INTO table_category(categoryName,parentId,createTime,updateTime) VALUES(?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
    deleteCategory: 'DELETE FROM table_category WHERE categoryId = ?',
    getCategoryChildrenByParentId: 'SELECT categoryId,categoryName as text,parentId,createTime,updateTime FROM table_category WHERE parentId= ?',
    updateCategoryName: 'UPDATE table_category SET categoryName=?,updateTime=CURRENT_TIMESTAMP WHERE categoryId=?',
    updateCategoryParentId: 'UPDATE table_category SET parentId=?,updateTime=CURRENT_TIMESTAMP WHERE categoryId=?',
    updateCategoryUpdateTime: 'UPDATE table_category SET updateTime=CURRENT_TIMESTAMP WHERE categoryId=?',
    list: 'SET @keyword=?;SELECT a.articleId,a.title,a.content,a.updateTime,a.createTime,a.authorUserId,b.userNickName,b.userAvatar,b.userGender,b.userPhone,b.userBirthday,c.categoryId,c.categoryName FROM table_article a LEFT JOIN table_user b ON (a.authorUserId=b.userId) LEFT JOIN table_category c ON (a.categoryId=c.categoryId) WHERE a.title LIKE CONCAT("%",@keyword,"%") OR b.userNickName LIKE CONCAT("%",@keyword,"%") OR c.categoryName LIKE CONCAT("%",@keyword,"%") LIMIT ?,?;SELECT COUNT(*) FROM table_article a LEFT JOIN table_user b ON (a.authorUserId=b.userId) LEFT JOIN table_category c ON (a.categoryId=c.categoryId) WHERE a.title LIKE CONCAT("%",@keyword,"%") OR b.userNickName LIKE CONCAT("%",@keyword,"%") OR c.categoryName LIKE CONCAT("%",@keyword,"%")',
    deleteArticle: 'DELETE FROM table_article WHERE articleId=?',
    getArticleByCategoryId: 'SELECT a.articleId,a.title,a.content,a.updateTime,a.createTime,a.authorUserId,b.userNickName,b.userAvatar,b.userGender,b.userPhone,b.userBirthday,c.categoryId,c.categoryName FROM table_article a LEFT JOIN table_user b ON (a.authorUserId=b.userId) LEFT JOIN table_category c ON (a.categoryId=c.categoryId) WHERE a.categoryId=? OR a.categoryId LIKE ? LIMIT ?,?',
    getArticleCountByCategoryId: 'SELECT COUNT(*)  FROM table_article a LEFT JOIN table_user b ON (a.authorUserId=b.userId) LEFT JOIN table_category c ON (a.categoryId=c.categoryId) WHERE a.categoryId=? OR a.categoryId LIKE ?',
    getArticleDetail:'SELECT * FROM table_article WHERE articleId=?'
}
module.exports = sqlMapping;