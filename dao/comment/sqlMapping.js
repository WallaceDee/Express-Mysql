var sqlMapping = {
    add: 'INSERT INTO table_comment(content,parentId,authorId,articleId,createTime) VALUES(?,?,?,?,CURRENT_TIMESTAMP)',
    count: 'SELECT COUNT(*) FROM table_comment WHERE articleId =?',
    list: 'SELECT a.commentId,a.content,a.createTime,b.userNickName,b.userAvatar FROM table_comment a LEFT JOIN table_user b ON(a.authorId=b.userId)  WHERE articleId=? ORDER BY a.createTime  desc LIMIT ?,?'
}
module.exports = sqlMapping;