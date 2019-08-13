module.exports = {
  add: `INSERT INTO table_comment(content,articleId,authorId,parentId,createTime) 
  VALUES({{content}},{{articleId}},{{userId}},{{parentId}},CURRENT_TIMESTAMP)`,
  addAnonymous: `INSERT INTO table_comment (content,authorNickName,articleId,parentId,createTime) 
  VALUES({{content}},{{anonymousName}},{{articleId}},{{parentId}},CURRENT_TIMESTAMP)`,
  list: `SELECT a.commentId,a.content,a.authorNickName,a.createTime,b.userNickName,b.userAvatar 
  FROM table_comment a LEFT JOIN table_user b ON(a.authorId=b.userId)  
  WHERE articleId={{articleId}} ORDER BY a.createTime desc 
  LIMIT {{currentIndex}},{{rows}};
  SELECT COUNT(*) AS total FROM table_comment 
  WHERE articleId={{articleId}}`
}