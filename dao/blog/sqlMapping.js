module.exports = {
  list: `SELECT blogId,title,cover,url,CAST(updateTime AS CHAR) as updateTime,createTime,authorUserId,type,content 
  FROM table_blog 
  WHERE categoryId={{categoryId}}
  ORDER BY updateTime 
  DESC LIMIT {{currentIndex}},{{rows}};
  SELECT COUNT(1) AS total
  FROM table_blog
  WHERE categoryId={{categoryId}};`,
  getDetailsById: `SELECT a.blogId,a.title,a.cover,a.url,a.updateTime,a.createTime,a.type,a.content,b.userNickName,b.userAvatar,b.userGender,b.userPhone,b.userBirthday,c.categoryName,c.categoryId 
  FROM table_blog a 
  LEFT JOIN table_user b 
  ON (a.authorUserId=b.userId) 
  LEFT JOIN table_category c 
  ON (a.categoryId=c.categoryId) 
  WHERE a.blogId={{blogId}}`,
  create: `INSERT INTO table_blog(type,title,content,cover,categoryId,authorUserId,createTime,updateTime) 
  VALUES({{type}},{{title}},{{content}},{{cover}},{{categoryId}},{{userId}},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`,
  update: `UPDATE table_blog 
  SET type={{type}},title={{title}},content={{content}},cover={{cover}},categoryId={{categoryId}},authorUserId={{userId}},updateTime=CURRENT_TIMESTAMP 
  WHERE blogId={{blogId}}`
}