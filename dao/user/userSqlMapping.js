var user = {
    insert: 'INSERT INTO table_user(userName,userNickName,userPassword,createTime,updateTime) VALUES(?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
    delete: 'DELETE FROM table_user WHERE userId=?',
    update: 'UPDATE table_user SET userName=?,userAvatar=? ,userPhone=? ,userGender=?,updateTime=CURRENT_TIMESTAMP WHERE userId=?',
    list: 'SELECT * FROM table_user WHERE userName LIKE CONCAT("%",?,"%") AND userPhone LIKE CONCAT("%",?,"%") LIMIT ?,?',
    count: 'SELECT COUNT(*) FROM table_user WHERE userName LIKE CONCAT("%",?,"%") AND userPhone LIKE CONCAT("%",?,"%")',
    login: 'SELECT * FROM table_user WHERE userName=? AND userPassword =?',
    getUserInfo: 'SELECT * FROM table_user WHERE userName=?',
    updateAvatar: 'UPDATE table_user SET userAvatar=? ,updateTime=CURRENT_TIMESTAMP WHERE userName=?',
    updateNickName: 'UPDATE table_user SET userNickName=? ,updateTime=CURRENT_TIMESTAMP WHERE userName=?',
    updatePhone: 'UPDATE table_user SET userPhone=? ,updateTime=CURRENT_TIMESTAMP WHERE userName=?',
    updateGender: 'UPDATE table_user SET userGender=? ,updateTime=CURRENT_TIMESTAMP WHERE userName=?',
    updateBirthday: 'UPDATE table_user SET userBirthday=? ,updateTime=CURRENT_TIMESTAMP WHERE userName=?',
    checkIfExistByWeiboId: 'SELECT userId,userName,userNickName,userAvatar,userBirthday,userPhone,userGender,createTime FROM table_user WHERE weiboId=?',
    signUpWithWeibo: 'INSERT INTO table_user(weiboId,userNickName,userAvatar,userGender,createTime,updateTime) VALUES(?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)'
}
module.exports = user;