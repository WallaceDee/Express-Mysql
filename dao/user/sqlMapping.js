var sqlMapping = {
    insert: 'INSERT INTO table_user(userName,userNickName,userPassword,createTime,updateTime) VALUES(?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
    delete: 'DELETE FROM table_user WHERE userId=?',
    update: 'UPDATE table_user SET userNickName=?,userAvatar=? ,userPhone=? ,userGender=?,updateTime=CURRENT_TIMESTAMP WHERE userId=?',
    list: 'SET @keyword=?;SELECT userId,qqOpenId,userName as userName_,weiboId,userName,userNickName,userAvatar,userBirthday,userPhone,userGender,createTime,updateTime FROM table_user WHERE userName LIKE CONCAT("%",@keyword,"%") OR userNickName LIKE CONCAT("%",@keyword,"%") OR userPhone LIKE CONCAT("%",@keyword,"%") LIMIT ?,?;SELECT COUNT(*) FROM table_user WHERE userName LIKE CONCAT("%",@keyword,"%") OR userNickName LIKE CONCAT("%",@keyword,"%") OR userPhone LIKE CONCAT("%",@keyword,"%");',
    login: 'SELECT userNickName,userAvatar,signature,userPhone,userBirthday,userGender,createTime FROM table_user WHERE userName=? AND userPassword =?',
    getAdminUserInfo: 'SELECT userNickName,userAvatar,job,signature,userPhone,userBirthday,userGender,createTime FROM table_user WHERE userId=1',
    updateAvatar: 'UPDATE table_user SET userAvatar=? ,updateTime=CURRENT_TIMESTAMP WHERE userName=?',
    updateNickName: 'UPDATE table_user SET userNickName=? ,updateTime=CURRENT_TIMESTAMP WHERE userName=?',
    updatePhone: 'UPDATE table_user SET userPhone=? ,updateTime=CURRENT_TIMESTAMP WHERE userName=?',
    updateGender: 'UPDATE table_user SET userGender=? ,updateTime=CURRENT_TIMESTAMP WHERE userName=?',
    updateBirthday: 'UPDATE table_user SET userBirthday=? ,updateTime=CURRENT_TIMESTAMP WHERE userName=?',
    checkIfExistByWeiboId: 'SELECT userId,userName,userNickName,userAvatar,userBirthday,userPhone,userGender,createTime FROM table_user WHERE weiboId=?',
    checkIfExistByQQOpenid: 'SELECT userId,userName,userNickName,userAvatar,userBirthday,userPhone,userGender,createTime FROM table_user WHERE qqOpenId=?',
    signUpWithWeibo: 'INSERT INTO table_user(weiboId,userNickName,userAvatar,userGender,createTime,updateTime) VALUES(?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
    signUpWithQQ: 'INSERT INTO table_user(qqOpenId,userNickName,userAvatar,userGender,createTime,updateTime) VALUES(?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);SELECT userId,userName,userNickName,userAvatar,userBirthday,userPhone,userGender,createTime FROM table_user WHERE qqOpenId=?',
    getUserByUserName: 'SELECT userName FROM table_user WHERE table_user.userName=?'
}
module.exports = sqlMapping;