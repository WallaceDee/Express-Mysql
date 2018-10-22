var article = {
    getCategoryList: 'SELECT * FROM table_article_category',
    publicArticle: 'INSERT INTO table_article(title,content,categoryId,authorUserId,createTime,updateTime) VALUES(?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)'
}
module.exports = article;