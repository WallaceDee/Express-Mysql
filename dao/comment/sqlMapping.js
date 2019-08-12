var sqlMapping = {
    add: 'INSERT INTO table_comment(content,parentId,articleId,authorId,createTime) VALUES(?,?,?,?,CURRENT_TIMESTAMP)',
    addAnonymous: 'INSERT INTO table_comment (content,parentId,authorNickName,articleId,createTime) VALUES(?,?,?,?,CURRENT_TIMESTAMP)',
    count: '',
    list: 'SET @articleId=?;SELECT a.commentId,a.content,a.authorNickName,a.createTime,b.userNickName,b.userAvatar FROM table_comment a LEFT JOIN table_user b ON(a.authorId=b.userId)  WHERE @articleId:=articleId ORDER BY a.createTime  desc LIMIT ?,?;SELECT COUNT(*) FROM table_comment WHERE @articleId:=articleId'
}
module.exports = sqlMapping;