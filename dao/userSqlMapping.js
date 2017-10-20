var user = {
    insert: 'INSERT INTO table_user(userName,userGender,userCreateTime,updateTime) VALUES(?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
    update: 'UPDATE table_user SET userName=?,userAvatar=? ,userPhone=? ,userGender=?,updateTime=CURRENT_TIMESTAMP WHERE userId=?',
    delete: 'DELETE FROM table_user WHERE userId=?',
    queryAll: 'SELECT * FROM table_user',
    queryById: 'SELECT * FROM table_user WHERE userId=?',
    list: 'SELECT * FROM table_user  LIMIT ?,?',
    count: 'SELECT COUNT(*) FROM table_user;',
    updateAvatar: 'UPDATE table_user SET userAvatar=? ,updateTime=CURRENT_TIMESTAMP WHERE userId=?',
}
module.exports = user;