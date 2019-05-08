var sqlMapping = {
    list: 'SELECT a.blogId,a.title,a.cover,a.url,a.updateTime,a.createTime,a.authorUserId FROM table_blog a WHERE a.categoryId=? LIMIT ?,?',
    // list: 'SELECT a.blogId,a.title,a.cover,a.url,a.updateTime,a.createTime,a.authorUserId,b.userNickName,b.userAvatar,b.userGender,b.userPhone,b.userBirthday,c.categoryId,c.categoryName FROM table_blog a LEFT JOIN table_user b ON (a.authorUserId=b.userId) LEFT JOIN table_category c ON (a.categoryId=c.categoryId) WHERE (a.title LIKE CONCAT("%",?,"%") OR b.userNickName LIKE CONCAT("%",?,"%") OR c.categoryName LIKE CONCAT("%",?,"%")) AND a.categoryId=? LIMIT ?,?',
    // count: 'SELECT COUNT(*) FROM table_blog a LEFT JOIN table_user b ON (a.authorUserId=b.userId) LEFT JOIN table_category c ON (a.categoryId=c.categoryId) WHERE (a.title LIKE CONCAT("%",?,"%") OR b.userNickName LIKE CONCAT("%",?,"%") OR c.categoryName LIKE CONCAT("%",?,"%")) AND a.categoryId=?',
    count: 'SELECT COUNT(*) FROM table_blog a  WHERE a.categoryId=?',
    getDetailsById:'SELECT a.blogId,a.title,a.cover,a.url,a.updateTime,a.createTime,b.userNickName,b.userAvatar,b.userGender,b.userPhone,b.userBirthday,c.categoryName FROM table_blog a LEFT JOIN table_user b ON (a.authorUserId=b.userId) LEFT JOIN table_category c ON (a.categoryId=c.categoryId) WHERE a.blogId=?'
}
module.exports = sqlMapping;