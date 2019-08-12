var sqlMapping = {
    list: 'SET @categoryId=?;SELECT a.blogId,a.title,a.cover,a.url,CAST(a.updateTime AS CHAR) as updateTime,a.createTime,a.authorUserId,a.type,a.content FROM table_blog a WHERE @categoryId:=a.categoryId ORDER BY a.updateTime DESC LIMIT ?,?;SELECT COUNT(*) FROM table_blog a  WHERE @categoryId:=a.categoryId',
    getDetailsById: 'SELECT a.blogId,a.title,a.cover,a.url,a.updateTime,a.createTime,a.type,a.content,b.userNickName,b.userAvatar,b.userGender,b.userPhone,b.userBirthday,c.categoryName,c.categoryId FROM table_blog a LEFT JOIN table_user b ON (a.authorUserId=b.userId) LEFT JOIN table_category c ON (a.categoryId=c.categoryId) WHERE a.blogId=?',
    create: 'INSERT INTO table_blog(type,title,content,cover,categoryId,authorUserId,createTime,updateTime) VALUES(?,?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
    update: 'UPDATE table_blog SET type=?,title=?,content=?,cover=?,categoryId=?,authorUserId=?,updateTime=CURRENT_TIMESTAMP WHERE blogId=?',
}
module.exports = sqlMapping;