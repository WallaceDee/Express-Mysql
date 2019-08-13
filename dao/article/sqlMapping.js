module.exports = {
  list: `SELECT a.articleId,a.title,a.content,a.updateTime,a.createTime,a.authorUserId,b.userNickName,b.userAvatar,b.userGender,b.userPhone,b.userBirthday,c.categoryId,c.categoryName 
  FROM table_article a LEFT JOIN table_user b ON (a.authorUserId=b.userId) LEFT JOIN table_category c ON (a.categoryId=c.categoryId) 
  WHERE a.title LIKE CONCAT("%",{{keyword}},"%") 
  OR b.userNickName LIKE CONCAT("%",{{keyword}},"%") 
  OR c.categoryName LIKE CONCAT("%",{{keyword}},"%") LIMIT {{currentIndex}},{{rows}};
  SELECT COUNT(1) AS total FROM table_article a LEFT JOIN table_user b ON (a.authorUserId=b.userId) LEFT JOIN table_category c ON (a.categoryId=c.categoryId) 
  WHERE a.title LIKE CONCAT("%",{{keyword}},"%") 
  OR b.userNickName LIKE CONCAT("%",{{keyword}},"%") 
  OR c.categoryName LIKE CONCAT("%",{{keyword}},"%")`,
  deleteArticle: 'DELETE FROM table_article WHERE articleId={{articleId}}',
  getArticleDetail:'SELECT * FROM table_article WHERE articleId={{articleId}}'
}