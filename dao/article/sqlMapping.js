var sqlMapping = {
    // getCategoryListByParentId: 'SELECT a.catagoryId as id ,a.categoryName,a.createTime,a.updateTime FROM table_article_category a LEFT JOIN table_article_category b ON a.parentId = b.catagoryId WHERE a.parentId = ?',
    getCategoryList: 'SELECT categoryId,categoryName as text,parentId,createTime,updateTime FROM table_article_category',
    publicArticle: 'INSERT INTO table_article(title,content,categoryId,authorUserId,createTime,updateTime) VALUES(?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
    createCategory: 'INSERT INTO table_article_category(categoryName,parentId,createTime,updateTime) VALUES(?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
    deleteCategory: 'DELETE FROM table_article_category WHERE categoryId = ?',
    getCategoryChildrenByParentId: 'SELECT categoryId,categoryName as text,parentId,createTime,updateTime FROM table_article_category WHERE parentId= ?',
    updateCategoryName: 'UPDATE table_article_category SET categoryName=?,updateTime=CURRENT_TIMESTAMP WHERE categoryId=?',
    updateCategoryParentId: 'UPDATE table_article_category SET parentId=?,updateTime=CURRENT_TIMESTAMP WHERE categoryId=?',
    updateCategoryUpdateTime: 'UPDATE table_article_category SET updateTime=CURRENT_TIMESTAMP WHERE categoryId=?',
    list: 'SELECT a.articleId,a.title,a.content,a.updateTime,a.createTime,a.authorUserId,b.userNickName,b.userAvatar,b.userGender,b.userPhone,b.userBirthday,c.categoryId,c.categoryName FROM table_article a LEFT JOIN table_user b ON (a.authorUserId=b.userId) LEFT JOIN table_article_category c ON (a.categoryId=c.categoryId) WHERE a.title LIKE CONCAT("%",?,"%") OR b.userNickName LIKE CONCAT("%",?,"%") OR c.categoryName LIKE CONCAT("%",?,"%") LIMIT ?,?',
    count: 'SELECT COUNT(*) FROM table_article a LEFT JOIN table_user b ON (a.authorUserId=b.userId) LEFT JOIN table_article_category c ON (a.categoryId=c.categoryId) WHERE a.title LIKE CONCAT("%",?,"%") OR b.userNickName LIKE CONCAT("%",?,"%") OR c.categoryName LIKE CONCAT("%",?,"%")',
    deleteArticle: 'DELETE FROM table_article WHERE articleId=?',
    getArticleByCategoryId: 'SELECT a.articleId,a.title,a.content,a.updateTime,a.createTime,a.authorUserId,b.userNickName,b.userAvatar,b.userGender,b.userPhone,b.userBirthday,c.categoryId,c.categoryName FROM table_article a LEFT JOIN table_user b ON (a.authorUserId=b.userId) LEFT JOIN table_article_category c ON (a.categoryId=c.categoryId) WHERE a.categoryId=? OR a.categoryId LIKE ? LIMIT ?,?',
    getArticleCountByCategoryId: 'SELECT COUNT(*)  FROM table_article a LEFT JOIN table_user b ON (a.authorUserId=b.userId) LEFT JOIN table_article_category c ON (a.categoryId=c.categoryId) WHERE a.categoryId=? OR a.categoryId LIKE ?',
    getArticleDetail:'SELECT * FROM table_article WHERE articleId=?'
}
module.exports = sqlMapping;