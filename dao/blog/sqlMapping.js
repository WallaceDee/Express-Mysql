var sqlMapping = {
    list: 'SELECT a.blogId,a.title,a.cover,a.url,CAST(a.updateTime AS CHAR) as updateTime,a.createTime,a.authorUserId,a.type,a.content FROM table_blog a WHERE a.categoryId=? ORDER BY a.updateTime DESC LIMIT ?,?',
    // list: 'SELECT a.blogId,a.title,a.cover,a.url,a.updateTime,a.createTime,a.authorUserId,b.userNickName,b.userAvatar,b.userGender,b.userPhone,b.userBirthday,c.categoryId,c.categoryName FROM table_blog a LEFT JOIN table_user b ON (a.authorUserId=b.userId) LEFT JOIN table_category c ON (a.categoryId=c.categoryId) WHERE (a.title LIKE CONCAT("%",?,"%") OR b.userNickName LIKE CONCAT("%",?,"%") OR c.categoryName LIKE CONCAT("%",?,"%")) AND a.categoryId=? LIMIT ?,?',
    // count: 'SELECT COUNT(*) FROM table_blog a LEFT JOIN table_user b ON (a.authorUserId=b.userId) LEFT JOIN table_category c ON (a.categoryId=c.categoryId) WHERE (a.title LIKE CONCAT("%",?,"%") OR b.userNickName LIKE CONCAT("%",?,"%") OR c.categoryName LIKE CONCAT("%",?,"%")) AND a.categoryId=?',
    count: 'SELECT COUNT(*) FROM table_blog a  WHERE a.categoryId=?',
    getDetailsById: 'SELECT a.blogId,a.title,a.cover,a.url,a.updateTime,a.createTime,a.type,a.content,b.userNickName,b.userAvatar,b.userGender,b.userPhone,b.userBirthday,c.categoryName,c.categoryId FROM table_blog a LEFT JOIN table_user b ON (a.authorUserId=b.userId) LEFT JOIN table_category c ON (a.categoryId=c.categoryId) WHERE a.blogId=?',
    create: 'INSERT INTO table_blog(type,title,content,cover,categoryId,authorUserId,createTime,updateTime) VALUES(?,?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
    // updateCategoryParentId: 'UPDATE table_category SET parentId=?,updateTime=CURRENT_TIMESTAMP WHERE categoryId=?',
    update: 'UPDATE table_blog SET type=?,title=?,content=?,cover=?,categoryId=?,authorUserId=?,updateTime=CURRENT_TIMESTAMP WHERE blogId=?',
}
module.exports = sqlMapping;